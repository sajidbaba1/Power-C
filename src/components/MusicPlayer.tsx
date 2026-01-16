'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, Volume2, VolumeX, SkipForward } from 'lucide-react';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

import { EffectType } from './BackgroundEffects';

export interface Song {
    id: string;
    url: string;
    title: string;
    effect: EffectType;
}

// Fixed playlist with Cloudinary URLs for high-quality slowed & reverb versions
const LOCAL_SONGS: Song[] = [
    {
        id: "l1",
        title: "Saiyaara Reprise",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599601/Saiyaara_Reprise_Female_Slowed_Reverb_Shreya_Ghoshal_SR_Lofi_hm61dp.mp3",
        effect: "snow"
    },
    {
        id: "l2",
        title: "Oh Oh Jane Jaana",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599606/Oh_Oh_Jane_Jaana_Slowed_Reverbed_ay5adk.mp3",
        effect: "stars"
    },
    {
        id: "l3",
        title: "Na Rasta Maloom",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599602/na_rasta_maloom_na_tere_naam_pata_maloom_na_rasta_maloom_na_rasta_maloom_lofi_1_pt1g0d.mp3",
        effect: "rain"
    },
    {
        id: "l4",
        title: "Sun Meri Shehzadi",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599602/Sun_meri_shehzadi_-_Slowed_Down_Reverb_Saaton_Janam_Mein_Tere_Night_Song_uhegyf.mp3",
        effect: "hearts"
    },
    {
        id: "l5",
        title: "Tujhe Sochta Hoon",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599607/Tujhe_Sochta_Hoon_Slowed_Reverb_Rain_K.K_Wormono_lofi_wxjw1b.mp3",
        effect: "sparkles"
    }
];

interface MusicPlayerProps {
    activeChat: string;
    pusherClient: any;
    currentEffect: EffectType;
    onEffectChange: (effect: EffectType) => void;
    onPlayingChange?: (isPlaying: boolean) => void;
    userRole?: string;
}

export default function MusicPlayer({ activeChat, pusherClient, currentEffect, onEffectChange, onPlayingChange, userRole }: MusicPlayerProps) {
    const [playlist, setPlaylist] = useState<Song[]>(LOCAL_SONGS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [manualEffect, setManualEffect] = useState<EffectType | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Shuffle playlist on mount
    useEffect(() => {
        setPlaylist([...LOCAL_SONGS].sort(() => Math.random() - 0.5));
    }, []);

    // Report state changes to parent (fixes slideshow bug)
    useEffect(() => {
        if (onPlayingChange) onPlayingChange(isPlaying);
    }, [isPlaying, onPlayingChange]);

    // Sync via Pusher
    useEffect(() => {
        if (!pusherClient || !activeChat) return;

        let chatKey = activeChat;
        if (activeChat.includes("nasywa") || activeChat.includes("sajid")) {
            const sorted = ["sajid", "nasywa"].sort();
            chatKey = `${sorted[0]}-${sorted[1]}`;
        }

        const channel = pusherClient.subscribe(chatKey);
        channel.bind("music-update", (data: any) => {
            console.log("🎵 Remote Music Update:", data);
            if (data.index !== undefined) {
                setCurrentIndex(data.index);
                // Reset manual effect on remote song change?
                // No, let admin keep control until they explicitly change it.
            }
            if (data.isPlaying !== undefined) {
                setIsPlaying(data.isPlaying);
                if (data.isPlaying) setHasInteracted(true);
            }
            if (data.effect !== undefined) {
                if (data.effect === 'auto') {
                    setManualEffect(null);
                } else {
                    setManualEffect(data.effect as EffectType);
                    onEffectChange(data.effect as EffectType);
                }
            }

            // Handle individual volume control from Admin
            if (userRole === 'sajid' && data.sajidVolume !== undefined) setVolume(data.sajidVolume);
            if (userRole === 'nasywa' && data.nasywaVolume !== undefined) setVolume(data.nasywaVolume);
        });

        return () => channel.unbind("music-update");
    }, [pusherClient, activeChat, onEffectChange, userRole]);

    // Apply Effect when song changes - ONLY if no manual override
    useEffect(() => {
        const song = playlist[currentIndex];
        if (song && isPlaying && !manualEffect) {
            onEffectChange(song.effect);
        }
    }, [currentIndex, isPlaying, playlist, onEffectChange, manualEffect]);

    const broadcastState = async (updates: Partial<{ index: number, isPlaying: boolean, effect?: string }>) => {
        if (updates.index !== undefined) {
            setCurrentIndex(updates.index);
            // When user manually skip, we reset manual effect to the new song's effect
            setManualEffect(null);
        }
        if (updates.isPlaying !== undefined) setIsPlaying(updates.isPlaying);

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = sorted.join('-');

        await fetch("/api/chat/music", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chatKey,
                index: updates.index !== undefined ? updates.index : currentIndex,
                isPlaying: updates.isPlaying !== undefined ? updates.isPlaying : isPlaying,
                effect: updates.effect || (updates.index !== undefined ? playlist[updates.index].effect : undefined),
                playlist: []
            })
        });
    };

    const handleStart = () => {
        setHasInteracted(true);
        broadcastState({ isPlaying: true });
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % playlist.length;
        broadcastState({ index: nextIndex });
    };

    const audioRef = useRef<HTMLAudioElement>(null);

    // Handle Native Audio Playback
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying && hasInteracted) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error: any) => {
                    console.error("Playback failed:", error);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, hasInteracted, currentIndex, playlist]);

    // Update volume based on mute and current volume set by admin
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [isMuted, volume]);

    if (!mounted) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentIndex]?.url}
                onEnded={handleNext}
                onPlay={() => console.log("🎵 Native Playback Started")}
                onError={(e) => console.error("🎵 Native Audio Error:", e)}
                preload="auto"
                style={{ display: 'none' }}
            />

            <div className="fixed bottom-24 left-4 z-[9999]">
                {!isPlaying ? (
                    // Only Admin can "Start Vibes" from scratch
                    userRole === 'admin' ? (
                        <button
                            onClick={handleStart}
                            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce flex items-center gap-2 transition-all"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            Start Vibes 🎵
                        </button>
                    ) : null
                ) : (
                    <div className="flex items-center gap-2 bg-zinc-900/90 border border-pink-500/30 backdrop-blur-md p-2 rounded-full shadow-2xl hover:scale-105 transition-all">
                        <div className="px-2 max-w-[150px] truncate text-xs text-white font-medium">
                            {playlist[currentIndex]?.title}
                        </div>
                        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-white/80 hover:text-white">
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        {/* Only Admin or owner can skip? Keeping skip for now as it's useful */}
                        <button onClick={handleNext} className="p-2 text-white/80 hover:text-white">
                            <SkipForward className="w-4 h-4 fill-current" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
