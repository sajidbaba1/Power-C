'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, Volume2, VolumeX, SkipForward } from 'lucide-react';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

export type EffectType = "snow" | "hearts" | "rain" | "none";

export interface Song {
    id: string;
    url: string;
    title: string;
    effect: EffectType;
}

// Fixed local playlist with simplified filenames
const LOCAL_SONGS: Song[] = [
    {
        id: "l1",
        title: "Saiyaara Reprise",
        url: "/songs/saiyaara.mp3",
        effect: "snow"
    },
    {
        id: "l2",
        title: "Oh Oh Jane Jaana",
        url: "/songs/jane_jaana.mp3",
        effect: "hearts"
    },
    {
        id: "l3",
        title: "Na Rasta Maloom",
        url: "/songs/na_rasta.mp3",
        effect: "rain"
    },
    {
        id: "l4",
        title: "Mere Mehboob Qayamat Hogi",
        url: "/songs/mere_mehboob.mp3",
        effect: "hearts"
    },
    {
        id: "l5",
        title: "Tujhe Sochta Hoon",
        url: "/songs/tujhe_sochta.mp3",
        effect: "rain"
    }
];

interface MusicPlayerProps {
    activeChat: string;
    pusherClient: any;
    currentEffect: EffectType;
    onEffectChange: (effect: EffectType) => void;
    onPlayingChange?: (isPlaying: boolean) => void;
}

export default function MusicPlayer({ activeChat, pusherClient, currentEffect, onEffectChange, onPlayingChange }: MusicPlayerProps) {
    const [playlist, setPlaylist] = useState<Song[]>(LOCAL_SONGS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Shuffle playlist on mount
    useEffect(() => {
        setPlaylist([...LOCAL_SONGS].sort(() => Math.random() - 0.5));
    }, []);

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
            if (data.index !== undefined) setCurrentIndex(data.index);
            if (data.isPlaying !== undefined) setIsPlaying(data.isPlaying);
            // We ignore playlist updates from remote to force local files for stability
        });

        // Also broadcast initial generic "I am here" to sync state? 
        // No, keep it simple.

        return () => channel.unbind("music-update");
    }, [pusherClient, activeChat]);

    // Apply Effect when song changes
    useEffect(() => {
        const song = playlist[currentIndex];
        if (song && isPlaying) {
            onEffectChange(song.effect);
        }
    }, [currentIndex, isPlaying, playlist, onEffectChange]);

    const broadcastState = async (updates: Partial<{ index: number, isPlaying: boolean }>) => {
        if (updates.index !== undefined) setCurrentIndex(updates.index);
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
                playlist: [] // Don't send the full playlist to save bandwidth/conflicts
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

    if (!mounted) return null;

    return (
        <>
            {/* Invisible Player */}
            <div className="fixed bottom-0 right-0 w-px h-px overflow-hidden opacity-0 pointer-events-none">
                <ReactPlayer
                    url={playlist[currentIndex]?.url}
                    playing={isPlaying && hasInteracted}
                    volume={isMuted ? 0 : 0.8}
                    muted={false}
                    onEnded={handleNext}
                    width="1px"
                    height="1px"
                    playsinline={true}
                    onError={(e: any) => console.log("Audio Error:", e)}
                    config={{ file: { forceAudio: true } }}
                />
            </div>

            {/* UI: Simple "Start" Button or Minimal Controls */}
            <div className="fixed bottom-4 left-4 z-[50]">
                {!hasInteracted || !isPlaying ? (
                    <button
                        onClick={handleStart}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce flex items-center gap-2 transition-all"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        Start Vibes 🎵
                    </button>
                ) : (
                    // Minimal controls when playing
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-black/60 transition-colors">
                        <div className="px-2 max-w-[150px] truncate text-xs text-white font-medium">
                            {playlist[currentIndex]?.title}
                        </div>
                        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-white/80 hover:text-white">
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <button onClick={handleNext} className="p-2 text-white/80 hover:text-white">
                            <SkipForward className="w-4 h-4 fill-current" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
