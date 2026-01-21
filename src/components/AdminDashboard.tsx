"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LOCAL_SONGS } from "@/lib/songs";
import { getPusherClient } from "@/lib/pusher";
import MusicPlayer from './MusicPlayer';
import BackgroundEffects, { EffectType } from './BackgroundEffects';
import {
    LogOut,
    Users,
    MessageSquare,
    Settings as SettingsIcon,
    Plus,
    Trash2,
    RotateCcw,
    Shield,
    Activity,
    Database,
    Image as ImageIcon,
    Menu,
    X,
    Clock,
    Play,
    Volume2,
    Heart,
    Sparkles,
    CloudSnow,
    CloudRain,
    Zap,
    Music,
    Send
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AdminDashboardProps {
    user: { name: string; role: string };
    onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
    const pusher = getPusherClient();
    const [activeTab, setActiveTab] = useState("overview");
    const [keys, setKeys] = useState<any[]>([]);
    const [newKey, setNewKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [loginHistory, setLoginHistory] = useState<any[]>([]);
    const [backgroundEffect, setBackgroundEffect] = useState<EffectType>("none");
    const [vibeSettings, setVibeSettings] = useState({
        isPlaying: false,
        effect: "auto",
        sajidVolume: 100,
        nasywaVolume: 100,
        currentIndex: 0
    });
    const [isStopEffectsEnabled, setIsStopEffectsEnabled] = useState(false);
    const [activeAdminChat, setActiveAdminChat] = useState<"sajid" | "nasywa" | null>(null);
    const [adminMessages, setAdminMessages] = useState<Record<string, any[]>>({ sajid: [], nasywa: [] });
    const [adminInputValue, setAdminInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [dynamicSongs, setDynamicSongs] = useState<any[]>([]);
    const [isUploadingSong, setIsUploadingSong] = useState(false);
    const [songUploadData, setSongUploadData] = useState({ title: "", effect: "none" as EffectType });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const allSongs = [...LOCAL_SONGS, ...dynamicSongs];

    // Memoized callback to prevent infinite loops in MusicPlayer
    const handlePlayingChange = useCallback((isPlaying: boolean) => {
        setVibeSettings(prev => ({ ...prev, isPlaying }));
    }, []);

    useEffect(() => {
        fetchKeys();
        fetchLoginHistory();
        fetchGlobalSettings();
        fetchSongs();
        const savedTheme = localStorage.getItem('power-couple-theme');
        if (savedTheme) {
            // Palette logic if needed
        }

        // Pusher listeners for admin chat
        const channels = ["admin-sajid", "admin-nasywa"];
        channels.forEach(channelName => {
            const channel = pusher.subscribe(channelName);
            channel.bind("new-message", (msg: any) => {
                const user = channelName.split("-")[1];
                setAdminMessages(prev => ({
                    ...prev,
                    [user]: [...(prev[user] || []), msg]
                }));
                scrollToBottom();
            });
        });

        return () => {
            channels.forEach(ch => pusher.unsubscribe(ch));
        };
    }, []);

    useEffect(() => {
        if (activeAdminChat) {
            fetchAdminMessages(activeAdminChat);
        }
    }, [activeAdminChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchAdminMessages = async (user: string) => {
        try {
            const res = await fetch(`/api/messages?user1=admin&user2=${user}`);
            const data = await res.json();
            setAdminMessages(prev => ({ ...prev, [user]: data }));
            setTimeout(scrollToBottom, 100);
        } catch (e) {
            console.error("Failed to fetch messages", e);
        }
    };

    const handleAdminSend = async () => {
        if (!adminInputValue.trim() || !activeAdminChat) return;

        const msgId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newMessage = {
            id: msgId,
            text: adminInputValue,
            sender: "admin",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        };

        setAdminMessages(prev => ({
            ...prev,
            [activeAdminChat]: [...(prev[activeAdminChat] || []), newMessage]
        }));
        setAdminInputValue("");
        setTimeout(scrollToBottom, 100);

        try {
            await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user1: "admin",
                    user2: activeAdminChat,
                    message: newMessage
                })
            });
        } catch (e) {
            console.error("Failed to send message", e);
        }
    };

    const fetchGlobalSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data && typeof data.stopEffects === "boolean") {
                setIsStopEffectsEnabled(data.stopEffects);
            }
        } catch (e) {
            console.error("Failed to fetch global settings", e);
        }
    };

    const toggleGlobalEffects = async () => {
        const newValue = !isStopEffectsEnabled;
        setIsStopEffectsEnabled(newValue);
        try {
            await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stopEffects: newValue, updatedBy: "admin" })
            });
        } catch (e) {
            console.error("Failed to update global settings", e);
        }
    };

    const fetchLoginHistory = async () => {
        try {
            const res = await fetch("/api/admin/login-history");
            const data = await res.json();
            setLoginHistory(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch login history", e);
        }
    };

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/admin/keys");
            const data = await res.json();
            setKeys(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch keys", e);
        }
    };

    const handleAddKey = async () => {
        if (!newKey.trim()) {
            alert("Please enter a valid API key");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/keys", {
                method: "POST",
                body: JSON.stringify({ key: newKey.trim() }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                alert("API Key added successfully!");
                setNewKey("");
                fetchKeys();
            } else {
                const data = await res.json();
                alert(`Error: ${data.error || "Failed to add key"}`);
            }
        } catch (e) {
            console.error(e);
            alert("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteKey = async (id: string) => {
        if (!confirm("Delete this API key?")) return;
        try {
            const res = await fetch("/api/admin/keys", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                alert("API Key deleted");
                fetchKeys();
            } else {
                alert("Failed to delete key");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting key");
        }
    };

    const fetchSongs = async () => {
        try {
            const res = await fetch("/api/admin/songs");
            const data = await res.json();
            setDynamicSongs(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Failed to fetch songs", e);
        }
    };

    const handleUploadSong = async (e: React.FormEvent) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (!file || !songUploadData.title) {
            alert("Please provide a title and select an MP3 file");
            return;
        }

        setIsUploadingSong(true);

        try {
            // 1. Get signature from our backend
            const signRes = await fetch("/api/admin/songs/sign", { method: "POST" });
            const { signature, timestamp, cloudName, apiKey } = await signRes.json();

            // 2. Upload directly to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);
            formData.append("api_key", apiKey);
            formData.append("folder", "power-couple/songs");

            const cloudinaryRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const cloudinaryData = await cloudinaryRes.json();

            if (!cloudinaryRes.ok) {
                throw new Error(cloudinaryData.error?.message || "Cloudinary upload failed");
            }

            // 3. Save URL to our database
            const res = await fetch("/api/admin/songs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: cloudinaryData.secure_url,
                    title: songUploadData.title,
                    effect: songUploadData.effect,
                }),
            });

            if (res.ok) {
                alert("Song uploaded successfully!");
                setSongUploadData({ title: "", effect: "none" });
                if (fileInputRef.current) fileInputRef.current.value = "";
                fetchSongs();
            } else {
                const data = await res.json();
                alert(`Database save failed: ${data.error}`);
            }
        } catch (e: any) {
            console.error(e);
            alert(`Error uploading song: ${e.message}`);
        } finally {
            setIsUploadingSong(false);
        }
    };

    const handleDeleteSong = async (id: string) => {
        if (!confirm("Delete this song?")) return;
        try {
            const res = await fetch("/api/admin/songs", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                fetchSongs();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const broadcastMusic = async (updates: any) => {
        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = sorted.join('-');

        const fullData = {
            ...vibeSettings,
            ...updates,
            chatKey,
            // Convert 0-100 to 0-1 for the player
            sajidVolume: (updates.sajidVolume !== undefined ? updates.sajidVolume : vibeSettings.sajidVolume) / 100,
            nasywaVolume: (updates.nasywaVolume !== undefined ? updates.nasywaVolume : vibeSettings.nasywaVolume) / 100,
            // If effect is auto, we tell the player to follow the song
            effect: (updates.effect !== undefined ? updates.effect : vibeSettings.effect),
            index: (updates.currentIndex !== undefined ? updates.currentIndex : vibeSettings.currentIndex)
        };

        await fetch("/api/chat/music", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fullData)
        });
    };

    const handleStartVibes = () => {
        broadcastMusic({ isPlaying: true });
        setVibeSettings(prev => ({ ...prev, isPlaying: true }));
    };

    const handleStopVibes = () => {
        broadcastMusic({ isPlaying: false });
        setVibeSettings(prev => ({ ...prev, isPlaying: false }));
    };

    const handleSetEffect = (effect: string) => {
        broadcastMusic({ effect });
        setVibeSettings(prev => ({ ...prev, effect }));
    };

    const handleSetVolume = (target: 'sajid' | 'nasywa', volume: number) => {
        broadcastMusic({ [`${target}Volume`]: volume });
        setVibeSettings(prev => ({ ...prev, [`${target}Volume`]: volume }));
    };

    const handleSetSong = (index: number) => {
        broadcastMusic({ currentIndex: index, isPlaying: true });
        setVibeSettings(prev => ({ ...prev, currentIndex: index, isPlaying: true }));
    };

    const palettes = [
        { name: "Indigo Neon", primary: "263.4 70% 50.4%", accent: "indigo" },
        { name: "Emerald Forest", primary: "142.1 76.2% 36.3%", accent: "emerald" },
        { name: "Rose Quartz", primary: "346.8 77.2% 49.8%", accent: "rose" },
        { name: "Amber Glow", primary: "37.9 92.1% 50.2%", accent: "amber" },
    ];

    const setPalette = (hsl: string) => {
        // Apply to both html and body to be sure
        document.documentElement.style.setProperty('--primary', hsl);
        document.documentElement.style.setProperty('--ring', hsl);
        document.body.style.setProperty('--primary', hsl);
        document.body.style.setProperty('--ring', hsl);

        // Also update any specific theme-provider wrappers if needed
        const wrappers = document.querySelectorAll('[data-theme]');
        wrappers.forEach(el => (el as HTMLElement).style.setProperty('--primary', hsl));

        localStorage.setItem('power-couple-theme', hsl);
        console.log("Theme updated and saved:", hsl);
    };

    const stats = [
        { label: "Total Users", value: "2", icon: Users, color: "from-blue-500 to-cyan-500" },
        { label: "Messages Today", value: "0", icon: MessageSquare, color: "from-purple-500 to-indigo-500" },
        { label: "Active API Keys", value: keys.filter(k => k.status === "active").length.toString(), icon: Activity, color: "from-green-500 to-emerald-500" },
        { label: "System Status", value: "Online", icon: Database, color: "from-pink-500 to-rose-500" },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            <BackgroundEffects effect={isStopEffectsEnabled ? "none" : backgroundEffect} />



            {/* Mobile Overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:relative inset-y-0 left-0 z-50 w-72 lg:w-80 border-r border-border bg-card/95 backdrop-blur-xl flex flex-col transition-transform duration-300",
                showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-4 lg:p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-sm lg:text-base">{user.name}</h2>
                                <p className="text-xs text-muted-foreground">Administrator</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                            <button
                                onClick={onLogout}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 lg:p-4">
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-3 px-2">Menu</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                setActiveTab("overview");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "overview"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <Activity className="w-5 h-5" />
                            <span className="font-semibold text-sm">Overview</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("api-keys");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "api-keys"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <SettingsIcon className="w-5 h-5" />
                            <span className="font-semibold text-sm">API Keys</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("users");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "users"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <Users className="w-5 h-5" />
                            <span className="font-semibold text-sm">Users</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("media");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "media"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <ImageIcon className="w-5 h-5" />
                            <span className="font-semibold text-sm">Media Gallery</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("login-history");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "login-history"
                                    ? "bg-primary/10 border-2 border-primary"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold text-sm">Login History</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("vibe-controller");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "vibe-controller"
                                    ? "bg-pink-500/10 border-2 border-pink-500"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <Zap className="w-5 h-5 text-pink-500" />
                            <span className="font-semibold text-sm">Vibe Controller</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("chat");
                                setShowSidebar(false);
                            }}
                            className={cn(
                                "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                activeTab === "chat"
                                    ? "bg-blue-500/10 border-2 border-blue-500"
                                    : "glass border border-white/5 hover:border-white/20"
                            )}
                        >
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold text-sm">Support Chat</span>
                        </button>
                    </div>

                    <div className="mt-auto p-4 border-t border-white/5">
                        <MusicPlayer
                            activeChat="sajid-nasywa"
                            pusherClient={pusher}
                            currentEffect={backgroundEffect}
                            onEffectChange={setBackgroundEffect}
                            onPlayingChange={handlePlayingChange}
                            userRole="admin"
                            inline={true}
                        />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-12">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setShowSidebar(true)}
                    className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-card border border-border rounded-xl shadow-lg hover:bg-muted transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {activeTab === "overview" && (
                    <div className="space-y-6 lg:space-y-8">
                        <div className="pt-16 lg:pt-0">
                            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Admin Dashboard</h1>
                            <p className="text-muted-foreground text-sm lg:text-base">Monitor and manage your Power Couple system</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-2xl glass border border-white/5 hover:border-primary/20 transition-all"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Database className="w-5 h-5 text-indigo-500" />
                                    Database Status
                                </h2>
                                <DbDiagnostic />
                            </div>

                            <div className="p-8 rounded-3xl bg-pink-500/5 border border-pink-500/10">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-rose-500" />
                                    System Performance
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-2xl glass border border-white/5">
                                        <div>
                                            <p className="font-bold text-sm">Kill Background Effects</p>
                                            <p className="text-xs text-muted-foreground">Instantly stop rain, snow, and hearts</p>
                                        </div>
                                        <button
                                            onClick={toggleGlobalEffects}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-xs font-black transition-all",
                                                isStopEffectsEnabled
                                                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                                                    : "bg-white/10 hover:bg-white/20 text-muted-foreground"
                                            )}
                                        >
                                            {isStopEffectsEnabled ? "EFFECTS: OFF" : "EFFECTS: ON"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 col-span-1 md:col-span-2">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-blue-500" />
                                    Translation Test (AI Checker)
                                </h2>
                                <AITester />
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl glass border border-white/5">
                            <h2 className="text-xl font-semibold mb-6">Theme Palette</h2>
                            <div className="flex flex-wrap gap-4">
                                {palettes.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => setPalette(p.primary)}
                                        className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-white/5 hover:border-primary/50 transition-all"
                                    >
                                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `hsl(${p.primary})` }} />
                                        <span className="text-sm font-medium">{p.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "api-keys" && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">API Keys</h1>
                                <p className="text-muted-foreground">Manage your Gemini API keys for translation</p>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Paste AIzaSy... key"
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                    className="px-4 py-2 bg-muted/50 border border-border rounded-xl text-sm w-64 outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    onClick={handleAddKey}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {keys.map((k) => (
                                <div key={k.id} className="p-6 rounded-2xl glass border border-white/5 hover:border-indigo-500/20 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={cn(
                                            "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                            k.status === "active" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                        )}>
                                            {k.status}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const res = await fetch("/api/translate", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                text: "Hello",
                                                                targetLang: "hi",
                                                                apiKey: k.key
                                                            })
                                                        });
                                                        const data = await res.json();
                                                        if (data.translation || data.hindiTranslation) {
                                                            alert(`✅ API Key Working!\nTest: "Hello" → "${data.translation || data.hindiTranslation}"`);
                                                        } else {
                                                            alert("❌ API Key Failed: " + (data.error || "Unknown error"));
                                                        }
                                                    } catch (e: any) {
                                                        alert("❌ Test Failed: " + e.message);
                                                    }
                                                }}
                                                className="p-1.5 hover:bg-green-500/10 rounded-lg transition-colors group"
                                                title="Test API Key"
                                            >
                                                <Activity className="w-4 h-4 text-green-500" />
                                            </button>
                                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteKey(k.id)}
                                                className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="font-mono text-sm mb-4 truncate">{k.key}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">Total Calls</span>
                                            <span>{k.usage}</span>
                                        </div>
                                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${Math.min(k.usage / 10, 100)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {keys.length === 0 && (
                                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                                    No API keys yet. Add your first key above to get started.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">User Management</h1>
                            <p className="text-muted-foreground">View and manage system users</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: "Sajid", role: "User", color: "from-blue-500 to-cyan-500", status: "Active", id: "sajid" },
                                { name: "Nasywa", role: "User", color: "from-pink-500 to-rose-500", status: "Active", id: "nasywa" }
                            ].map((user) => (
                                <div key={user.name} className="p-6 rounded-2xl glass border border-white/5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center`}>
                                            <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{user.name}</h3>
                                            <p className="text-sm text-muted-foreground">{user.role}</p>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-bold">
                                            {user.status}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Messages</p>
                                            <p className="font-semibold">{adminMessages[user.id]?.length || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Last Active</p>
                                            <p className="font-semibold text-sm">Just now</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === "media" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Media Gallery</h1>
                            <p className="text-muted-foreground">Monitor images and drawings exchanged between users</p>
                        </div>

                        <MediaGallery />
                    </div>
                )}
                {activeTab === "chat" && (
                    <div className="h-[calc(100vh-200px)] flex flex-col gap-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Support Chat</h1>
                                <p className="text-muted-foreground">Interact with system users in real-time</p>
                            </div>
                            <div className="flex gap-2 bg-muted/50 p-1 rounded-2xl border border-border self-start">
                                {["sajid", "nasywa"].map((u) => (
                                    <button
                                        key={u}
                                        onClick={() => setActiveAdminChat(u as any)}
                                        className={cn(
                                            "px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all",
                                            activeAdminChat === u ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted"
                                        )}
                                    >
                                        {u}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {!activeAdminChat ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 border-2 border-dashed border-border rounded-[2.5rem]">
                                <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                                <p className="text-lg font-medium">Select a user to start chatting</p>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl min-h-0">
                                <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3 shrink-0">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full animate-pulse",
                                        activeAdminChat === "sajid" ? "bg-blue-500" : "bg-pink-500"
                                    )} />
                                    <h2 className="font-bold capitalize">Chat with {activeAdminChat}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                                    {adminMessages[activeAdminChat]?.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex flex-col gap-1 max-w-[80%]",
                                                msg.sender === "admin" ? "ml-auto items-end" : "mr-auto items-start"
                                            )}
                                        >
                                            {msg.parentId && (
                                                <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1">
                                                    <RotateCcw className="w-2.5 h-2.5" />
                                                    Replied to: {adminMessages[activeAdminChat].find(m => m.id === msg.parentId)?.text?.substring(0, 20)}...
                                                </div>
                                            )}
                                            <div className={cn(
                                                "p-4 rounded-2xl text-sm lg:text-base",
                                                msg.sender === "admin"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "glass border border-white/10 rounded-tl-none"
                                            )}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-muted-foreground px-2">{msg.timestamp}</span>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="p-6 bg-white/5 border-t border-white/5 flex gap-4 shrink-0">
                                    <input
                                        type="text"
                                        value={adminInputValue}
                                        onChange={(e) => setAdminInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAdminSend()}
                                        placeholder={`Message ${activeAdminChat}...`}
                                        className="flex-1 bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-sm lg:text-base"
                                    />
                                    <button
                                        onClick={handleAdminSend}
                                        className="bg-primary text-primary-foreground p-4 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                                    >
                                        <Send className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "login-history" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Login History</h1>
                            <p className="text-muted-foreground">Monitor when Sajid and Nasywa log in</p>
                        </div>

                        <div className="glass border border-white/5 rounded-3xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10 text-xs font-black uppercase tracking-widest text-muted-foreground">
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Time (12h)</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Relative Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loginHistory.map((login) => {
                                        const date = new Date(login.timestamp);
                                        const time12 = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                                        const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

                                        // Simple time ago
                                        const diff = Date.now() - date.getTime();
                                        const mins = Math.floor(diff / 60000);
                                        const hrs = Math.floor(mins / 60);
                                        const days = Math.floor(hrs / 24);

                                        let timeAgo = "";
                                        if (days > 0) timeAgo = `${days}d ago`;
                                        else if (hrs > 0) timeAgo = `${hrs}hr ago`;
                                        else if (mins > 0) timeAgo = `${mins}m ago`;
                                        else timeAgo = "Just now";

                                        return (
                                            <tr key={login.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            login.role === "sajid" ? "bg-blue-500" : "bg-pink-500"
                                                        )} />
                                                        <span className="font-semibold capitalize">{login.role}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium">{time12}</td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">{dateStr}</td>
                                                <td className="px-6 py-4 text-sm text-right font-black text-indigo-400">{timeAgo}</td>
                                            </tr>
                                        );
                                    })}
                                    {loginHistory.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">No login records found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "vibe-controller" && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-8 rounded-[2.5rem] border border-pink-500/20 shadow-2xl shadow-pink-500/10"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                                <div>
                                    <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                                        <Zap className="w-8 h-8 text-pink-500 fill-current" />
                                        Vibe Master
                                    </h1>
                                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Synchronize the magic across the world</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleStartVibes}
                                        className="px-8 py-4 bg-pink-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-500/40 flex items-center gap-2"
                                    >
                                        <Play className="w-5 h-5 fill-current" /> Start Vibing
                                    </button>
                                    <button
                                        onClick={handleStopVibes}
                                        className="px-8 py-4 bg-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-700 transition-all border border-white/10"
                                    >
                                        Stop All
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left: Effects */}
                                <div className="space-y-6">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-yellow-500" />
                                        Atmospheric Effects
                                    </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: "auto", label: "Default Vibes", icon: Music },
                                            { id: "none", label: "Clear Sky", icon: X },
                                            { id: "hearts", label: "Love Rain", icon: Heart },
                                            { id: "snow", label: "Winter Magic", icon: CloudSnow },
                                            { id: "rain", label: "Midnight Rain", icon: CloudRain },
                                            { id: "stars", label: "Starlight", icon: Zap },
                                            { id: "butterflies", label: "Magic Flutter", icon: Sparkles }
                                        ].map((eff) => (
                                            <button
                                                key={eff.id}
                                                onClick={() => handleSetEffect(eff.id)}
                                                className={cn(
                                                    "p-4 rounded-xl flex items-center gap-3 transition-all font-bold text-sm",
                                                    vibeSettings.effect === eff.id
                                                        ? "bg-white text-black scale-105 shadow-xl"
                                                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                                                )}
                                            >
                                                <eff.icon className="w-4 h-4" />
                                                {eff.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Individual Volume */}
                                <div className="space-y-6">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <Volume2 className="w-5 h-5 text-blue-500" />
                                        Individual Presence
                                    </h2>
                                    <div className="space-y-6">
                                        {['sajid', 'nasywa'].map((u) => (
                                            <div key={u} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="font-black uppercase tracking-widest text-sm capitalize">{u}</span>
                                                    <span className="text-xs font-bold text-muted-foreground">{(vibeSettings as any)[`${u}Volume`]}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={(vibeSettings as any)[`${u}Volume`]}
                                                    onChange={(e) => handleSetVolume(u as any, parseInt(e.target.value))}
                                                    className="w-full accent-pink-500 bg-white/10 rounded-lg h-2 cursor-pointer"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Song Selection */}
                            <div className="pt-8 border-t border-white/10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <Music className="w-5 h-5 text-indigo-400" />
                                        Song Master
                                    </h2>

                                    {/* Upload Form Inline */}
                                    <form onSubmit={handleUploadSong} className="flex flex-wrap gap-2 items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase px-1">Title</p>
                                            <input
                                                type="text"
                                                placeholder="Song Title"
                                                value={songUploadData.title}
                                                onChange={e => setSongUploadData(prev => ({ ...prev, title: e.target.value }))}
                                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-pink-500 w-32"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase px-1">Effect</p>
                                            <select
                                                value={songUploadData.effect}
                                                onChange={e => setSongUploadData(prev => ({ ...prev, effect: e.target.value as EffectType }))}
                                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-pink-500 w-32"
                                            >
                                                <option value="none">None</option>
                                                <option value="snow">Snow</option>
                                                <option value="hearts">Hearts</option>
                                                <option value="rain">Rain</option>
                                                <option value="stars">Stars</option>
                                                <option value="sparkles">Sparkles</option>
                                                <option value="butterflies">Butterflies</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase px-1">MP3 File</p>
                                            <input
                                                type="file"
                                                accept="audio/mp3,audio/mpeg"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={() => { }} // Just to trigger state if needed
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-white/10 transition-all font-medium"
                                            >
                                                <Plus className="w-3 h-3" /> Select File
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isUploadingSong}
                                            className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-600 transition-all disabled:opacity-50"
                                        >
                                            {isUploadingSong ? "Uploading..." : "Upload Song"}
                                        </button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {allSongs.map((song, idx) => (
                                        <div key={song.id} className="relative group">
                                            <button
                                                onClick={() => handleSetSong(idx)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl flex flex-col items-start gap-1 transition-all border text-left",
                                                    vibeSettings.currentIndex === idx && vibeSettings.isPlaying
                                                        ? "bg-indigo-500/20 border-indigo-500 shadow-lg shadow-indigo-500/10"
                                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                                )}
                                            >
                                                <span className="font-bold text-sm truncate w-full">{song.title}</span>
                                                <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">{song.effect} Effect</span>
                                            </button>

                                            {/* Delete button for dynamic songs only */}
                                            {idx >= LOCAL_SONGS.length && (
                                                <button
                                                    onClick={() => handleDeleteSong(song.id)}
                                                    className="absolute top-2 right-2 p-1.5 bg-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3 text-white" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main >
        </div >
    );
}

function DbDiagnostic() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkDb = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/debug/db");
            const data = await res.json();
            setStatus(data);
        } catch (e: any) {
            setStatus({ status: "failed", error: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={checkDb}
                disabled={loading}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50"
            >
                {loading ? "Checking..." : "Verify DB Connection"}
            </button>
            {status && (
                <div className={cn(
                    "p-4 rounded-xl text-xs font-mono break-all",
                    status.status === "connected" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
                )}>
                    <p>Status: {status.status}</p>
                    {status.messageCount !== undefined && <p>Total Messages: {status.messageCount}</p>}
                    {status.error && <p className="mt-2">Error: {status.error}</p>}
                    {!status.hasDbUrl && <p className="mt-2 text-yellow-500">Warning: No DATABASE_URL found in Environment!</p>}
                </div>
            )}
        </div>
    );
}

function AITester() {
    const [testInput, setTestInput] = useState("Hello, how are you?");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testTranslation = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: testInput,
                    sourceLang: "English",
                    targetLang: "Indonesian"
                })
            });
            const data = await res.json();

            // Check for graceful failure reported by our lib
            if (data.hindiTranslation === "Gemini Error" || data.translation === testInput && data.wordBreakdown?.some((w: any) => w.word === "Error")) {
                const errorMsg = data.wordBreakdown?.find((w: any) => w.word === "Error")?.meaning || "Unknown AI Error";
                setResult({ error: errorMsg });
            } else {
                setResult(data);
            }
        } catch (e: any) {
            setResult({ error: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter text to test..."
                />
                <button
                    onClick={testTranslation}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? "Testing..." : "Test AI Translation"}
                </button>
            </div>
            {result && (
                <div className={cn(
                    "p-4 rounded-xl text-xs font-mono break-all",
                    result.error ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                )}>
                    {result.error ? (
                        <div className="space-y-1">
                            <p className="font-bold text-rose-500">❌ Translation Failed</p>
                            <p>Error: {result.error}</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="font-bold text-green-500 mb-2">✅ Translation Successful</p>
                            <div className="grid grid-cols-1 gap-2 border-t border-white/10 pt-2">
                                <p><span className="text-muted-foreground">Original:</span> {testInput}</p>
                                <p><span className="text-muted-foreground">Indonesian:</span> {result.translation}</p>
                                {result.hindiTranslation && <p><span className="text-muted-foreground">Hindi:</span> {result.hindiTranslation}</p>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function MediaGallery() {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/images")
            .then(res => res.json())
            .then(data => setImages(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/10">
                    <img src={img.url} alt="Shared" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="text-xs font-bold text-white uppercase">{img.sender} → {img.receiver}</p>
                        <p className="text-[10px] text-white/70">{new Date(img.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))}
            {images.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                    No images shared yet.
                </div>
            )}
        </div>
    );
}
