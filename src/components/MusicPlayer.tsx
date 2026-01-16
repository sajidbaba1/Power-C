'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Music, Play, Pause, SkipForward, Trash2, Volume2, Minimize2, Search, PlusCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

export type EffectType = "snow" | "hearts" | "rain" | "none";

export interface Song {
    id: string;
    url: string;
    title: string;
    effect: EffectType;
}

interface MusicPlayerProps {
    activeChat: string;
    pusherClient: any;
    currentEffect: EffectType;
    onEffectChange: (effect: EffectType) => void;
}

export default function MusicPlayer({ activeChat, pusherClient, currentEffect, onEffectChange }: MusicPlayerProps) {
    const [playlist, setPlaylist] = useState<Song[]>([
        { id: "1", url: "https://youtu.be/xq01EtpC1jc", title: "Night Changes", effect: "snow" },
        { id: "2", url: "https://youtu.be/_uxvtB7iLlA", title: "Perfect", effect: "hearts" },
        { id: "3", url: "https://youtu.be/6fUMMBjLkQw", title: "Dandelions", effect: "rain" },
        { id: "4", url: "https://youtu.be/cYzy0e0rPPQ", title: "Until I Found You", effect: "hearts" },
        { id: "5", url: "https://youtu.be/PA5-dSV32YM", title: "At My Worst", effect: "snow" },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newUrl, setNewUrl] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newEffect, setNewEffect] = useState<EffectType>("none");
    const [volume, setVolume] = useState(0.5);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Interaction Listener for Safe Autoplay
    useEffect(() => {
        const handleInteraction = () => setHasInteracted(true);
        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    // Sync state via Pusher & Fetch Data
    useEffect(() => {
        if (!pusherClient || !activeChat) return;

        let chatKey = "";
        if (activeChat.includes("nasywa") || activeChat.includes("sajid")) {
            const sorted = ["sajid", "nasywa"].sort();
            chatKey = `${sorted[0]}-${sorted[1]}`;
        } else {
            chatKey = activeChat;
        }

        // Fetch persisted playlist
        fetch(`/api/chat/music?chatKey=${chatKey}`)
            .then(res => res.json())
            .then(data => {
                if (data.playlist && data.playlist.length > 0) {
                    setPlaylist(data.playlist);
                }
            })
            .catch(e => console.error("Failed to load playlist", e));

        const channel = pusherClient.subscribe(chatKey);

        channel.bind("music-update", (data: any) => {
            if (data.playlist !== undefined) setPlaylist(data.playlist);
            if (data.index !== undefined && data.index !== currentIndex) setCurrentIndex(data.index);
            if (data.isPlaying !== undefined && data.isPlaying !== isPlaying) setIsPlaying(data.isPlaying);
        });

        return () => channel.unbind("music-update");
    }, [pusherClient, activeChat, currentIndex, isPlaying]);

    // Update effect when song changes or plays
    useEffect(() => {
        const song = playlist[currentIndex];
        if (song && isPlaying) {
            if (currentEffect !== song.effect) {
                onEffectChange(song.effect);
            }
        }
    }, [currentIndex, isPlaying, playlist, onEffectChange, currentEffect]);

    const broadcastState = async (updates: Partial<{ playlist: Song[], index: number, isPlaying: boolean }>) => {
        if (updates.playlist !== undefined) setPlaylist(updates.playlist);
        if (updates.index !== undefined) setCurrentIndex(updates.index);
        if (updates.isPlaying !== undefined) setIsPlaying(updates.isPlaying);

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        await fetch("/api/chat/music", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chatKey,
                playlist: updates.playlist !== undefined ? updates.playlist : playlist,
                index: updates.index !== undefined ? updates.index : currentIndex,
                isPlaying: updates.isPlaying !== undefined ? updates.isPlaying : isPlaying
            })
        });
    };

    const handlePlayPause = () => {
        broadcastState({ isPlaying: !isPlaying });
    };

    const handleNext = () => {
        if (playlist.length === 0) return;
        const nextIndex = (currentIndex + 1) % playlist.length;
        broadcastState({ index: nextIndex });
    };

    const handleDelete = (id: string) => {
        const newPlaylist = playlist.filter(s => s.id !== id);
        broadcastState({ playlist: newPlaylist });
    };

    const handleSearchOrAdd = async () => {
        if (!newUrl) return;
        setIsSearching(true);
        setSearchResults([]);

        // URL Detection
        if (newUrl.includes("youtube.com") || newUrl.includes("youtu.be")) {
            let title = `Song ${playlist.length + 1}`;

            // Try fetching title
            try {
                let videoId = "";
                if (newUrl.includes("v=")) videoId = newUrl.split("v=")[1].split("&")[0].split("?")[0];
                else if (newUrl.includes("youtu.be/")) videoId = newUrl.split("youtu.be/")[1].split("?")[0];

                if (videoId) {
                    const res = await fetch(`/api/youtube?videoId=${videoId}`);
                    const data = await res.json();
                    if (data.title) title = data.title;
                }
            } catch (e) { console.error(e); }

            const song: Song = {
                id: Date.now().toString(),
                url: newUrl,
                title,
                effect: newEffect
            };

            const newPlaylist = [...playlist, song];
            setNewUrl("");
            broadcastState({ playlist: newPlaylist });
            setIsSearching(false);
            return;
        }

        // Search
        try {
            const res = await fetch(`/api/youtube?query=${encodeURIComponent(newUrl)}`);
            const data = await res.json();
            if (data.items) {
                setSearchResults(data.items);
            }
        } catch (e) {
            console.error("Search failed", e);
        }
        setIsSearching(false);
    };

    const addSearchResult = (video: any) => {
        const song: Song = {
            id: Date.now().toString(),
            url: video.url,
            title: video.title,
            effect: newEffect
        };
        const newPlaylist = [...playlist, song];
        setNewUrl("");
        setSearchResults([]);
        broadcastState({ playlist: newPlaylist });
    };

    if (!mounted) return null;

    return (
        <>
            <div className="fixed bottom-4 left-4 z-[300]">
                {/* Minimized Player Button */}
                {!isExpanded && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className={`p-3 rounded-full shadow-xl transition-all ${isPlaying ? 'bg-pink-500 animate-pulse' : 'bg-white/10 glass border border-white/20'}`}
                    >
                        <Music className={`w-6 h-6 ${isPlaying ? 'text-white' : 'text-pink-400'}`} />
                    </button>
                )}

                {/* Hidden React Player (Technically visible 1px to bypass browser checks) */}
                <div className="fixed bottom-0 right-0 w-px h-px overflow-hidden z-[9999]">
                    <ReactPlayer
                        url={playlist[currentIndex]?.url}
                        playing={isPlaying && hasInteracted}
                        volume={volume}
                        muted={false}
                        onEnded={handleNext}
                        onReady={() => console.log("Player Ready")}
                        onStart={() => console.log("Player Started")}
                        onPlay={() => console.log("Player Playing")}
                        onError={(e: any) => console.log("Player Status:", e.target?.error || "Error")}
                        width="1px"
                        height="1px"
                        playsinline={true}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0, controls: 0, disablekb: 1, origin: typeof window !== 'undefined' ? window.location.origin : undefined }
                            }
                        }}
                    />
                </div>

                {/* Audio Blocked Prompt */}
                {isPlaying && !hasInteracted && (
                    <div className="fixed bottom-20 left-4 z-[300] bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce cursor-pointer flex items-center gap-2 font-bold text-xs" onClick={() => setHasInteracted(true)}>
                        <Play className="w-3 h-3 fill-current" /> Tap to Join Music 🎵
                    </div>
                )}


                {/* Expanded Player Interface */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            className="bg-black/80 glass border border-white/10 backdrop-blur-xl rounded-3xl p-4 w-[350px] shadow-2xl relative"
                        >
                            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                                <div className="flex items-center gap-2">
                                    <Music className="w-5 h-5 text-pink-400" />
                                    <span className="font-bold text-white text-sm">Vibe Player</span>
                                </div>
                                <button onClick={() => setIsExpanded(false)}>
                                    <Minimize2 className="w-4 h-4 text-white/50 hover:text-white" />
                                </button>
                            </div>

                            {/* Current Song Display */}
                            {playlist.length > 0 ? (
                                <div className="mb-4 text-center">
                                    <div className="text-white font-bold truncate">{playlist[currentIndex]?.title}</div>
                                    <div className="text-xs text-pink-400 capitalize">Vibe: {playlist[currentIndex]?.effect || 'None'}</div>

                                    <div className="flex items-center justify-center gap-4 mt-3">
                                        <button onClick={handlePlayPause} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                                            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                                        </button>
                                        <button onClick={handleNext} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                                            <SkipForward className="w-5 h-5 text-white" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3">
                                        <Volume2 className="w-4 h-4 text-white/50" />
                                        <input
                                            type="range"
                                            min="0" max="1" step="0.1"
                                            value={volume}
                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                            className="w-full accent-pink-500 h-1"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-white/50 text-center py-4 text-sm">No songs in playlist</div>
                            )}

                            {/* Search / Add Section */}
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-2 relative">
                                <div className="flex gap-2">
                                    <input
                                        placeholder="Link or Search Song..."
                                        value={newUrl}
                                        onChange={(e) => setNewUrl(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchOrAdd()}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-pink-500"
                                    />
                                </div>

                                {/* Search Results Overlay */}
                                {searchResults.length > 0 && (
                                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-[250px] overflow-y-auto">
                                        <div className="flex items-center justify-between p-2 bg-black/50 border-b border-white/5">
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Results</span>
                                            <button onClick={() => setSearchResults([])}><X className="w-3 h-3 text-white/50 hover:text-white" /></button>
                                        </div>
                                        {searchResults.map((video) => (
                                            <div
                                                key={video.id}
                                                onClick={() => addSearchResult(video)}
                                                className="flex items-center gap-2 p-2 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0"
                                            >
                                                <img src={video.thumbnails?.default?.url} className="w-10 h-8 object-cover rounded" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-white font-medium truncate">{video.title}</div>
                                                </div>
                                                <PlusCircle className="w-4 h-4 text-pink-500" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <select
                                        value={newEffect}
                                        onChange={(e) => setNewEffect(e.target.value as EffectType)}
                                        className="bg-black/50 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                                    >
                                        <option value="none">No Vibe</option>
                                        <option value="snow">❄️ Snow (Cozy)</option>
                                        <option value="hearts">❤️ Hearts (Romantic)</option>
                                        <option value="rain">🌧️ Rain (Calm)</option>
                                    </select>
                                    <button
                                        onClick={handleSearchOrAdd}
                                        disabled={isSearching}
                                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-1.5 text-xs font-bold disabled:opacity-50"
                                    >
                                        {isSearching ? '...' : (newUrl.includes('http') ? 'Add' : 'Search')}
                                    </button>
                                </div>
                            </div>

                            {/* Playlist Mini View */}
                            <div className="mt-4 max-h-[100px] overflow-y-auto space-y-1">
                                {playlist.map((s, i) => (
                                    <div key={s.id} className={`flex items-center justify-between text-xs p-1.5 rounded ${i === currentIndex ? 'bg-pink-500/20 text-pink-300' : 'text-white/70 hover:bg-white/5'}`}>
                                        <div onClick={() => { setCurrentIndex(i); broadcastState({ index: i }); }} className="cursor-pointer truncate max-w-[200px]">
                                            {s.title}
                                        </div>
                                        <button onClick={() => handleDelete(s.id)}>
                                            <Trash2 className="w-3 h-3 hover:text-red-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
