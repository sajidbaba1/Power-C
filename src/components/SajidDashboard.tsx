"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, LogOut, User, Menu, BookOpen, X, Mail, Mic, Image as ImageIcon, Heart, Trash2, Palette, Smile, Settings, Upload, Rocket, Check, CheckCheck, Ghost, Flame, Coffee, HeartOff, MapPin, Calendar, Lock, Unlock, Play, Pause, Music, Stars, Layout, Plus } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import confetti from "canvas-confetti";
import { getPusherClient } from "@/lib/pusher";
import InteractiveMap from "@/components/InteractiveMap";
import StreakOverlay from "@/components/StreakOverlay";
import MusicPlayer from './MusicPlayer';
import BackgroundEffects, { EffectType } from './BackgroundEffects';
import SlideshowBackground from './SlideshowBackground';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SajidDashboardProps {
    user: { name: string; role: string };
    onLogout: () => void;
}

export default function SajidDashboard({ user, onLogout }: SajidDashboardProps) {
    const pusher = getPusherClient();
    const [activeChat, setActiveChat] = useState<"nasywa" | "admin">("nasywa");
    const [messages, setMessages] = useState<Record<string, any[]>>({
        nasywa: [],
        admin: []
    });
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [learnedWords, setLearnedWords] = useState<any[]>([]);
    const [userEmail, setUserEmail] = useState("");
    const [showEmailSettings, setShowEmailSettings] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showWordBucket, setShowWordBucket] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [showStickers, setShowStickers] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showLoveWall, setShowLoveWall] = useState(false);
    const [showMilestones, setShowMilestones] = useState(false);
    const [loveNotes, setLoveNotes] = useState<any[]>([]);
    const [milestones, setMilestones] = useState<any[]>([]);
    const [currentHug, setCurrentHug] = useState<boolean>(false);
    const [currentKiss, setCurrentKiss] = useState<boolean>(false);
    const [currentMumma, setCurrentMumma] = useState<boolean>(false);
    const [currentBabyGirl, setCurrentBabyGirl] = useState<boolean>(false);
    const [currentBabyBoy, setCurrentBabyBoy] = useState<boolean>(false);
    const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
    const [backgroundEffect, setBackgroundEffect] = useState<EffectType>("none");
    const [unlockTimer, setUnlockTimer] = useState<Record<string, string>>({});
    const [isSecretMode, setIsSecretMode] = useState(false);
    const [secretUnlockTime, setSecretUnlockTime] = useState<string>("20:00");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showMoreActions, setShowMoreActions] = useState(false);
    const [jarNotes, setJarNotes] = useState<any[]>([]);
    const [showJar, setShowJar] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [distance, setDistance] = useState<number | null>(null);
    const [showGratitudePrompt, setShowGratitudePrompt] = useState(false);
    const [showStreak, setShowStreak] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(0);

    const [profiles, setProfiles] = useState<Record<string, any>>({});
    const [fireworkText, setFireworkText] = useState<string | null>(null);
    const lastFireworkId = useRef<string | null>(null);
    const [isOtherTyping, setIsOtherTyping] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isTypingRef = useRef(false);
    const [showRocket, setShowRocket] = useState(false);
    const [chatWallpaper, setChatWallpaper] = useState<string | null>(null);

    const isUnlocked = (msg: any) => {
        if (msg.type !== "secret" || msg.sender === "sajid") return true;
        if (!msg.unlockAt) return true;

        const now = new Date();
        const [hours, minutes] = msg.unlockAt.split(':').map(Number);
        const unlockTime = new Date();
        unlockTime.setHours(hours, minutes, 0, 0);

        return now >= unlockTime;
    };

    useEffect(() => {
        const savedWallpaper = localStorage.getItem(`chatWallpaper_sajid_${activeChat}`);
        setChatWallpaper(savedWallpaper);
    }, [activeChat]);

    const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setChatWallpaper(base64);
            localStorage.setItem(`chatWallpaper_sajid_${activeChat}`, base64);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const [p1, p2] = await Promise.all([
                    fetch(`/api/profiles?role=sajid`).then(r => r.json()),
                    fetch(`/api/profiles?role=nasywa`).then(r => r.json())
                ]);
                setProfiles({ sajid: p1, nasywa: p2 });
            } catch (e) {
                console.error("Failed to fetch profiles", e);
            }
        };
        const fetchLoveNotes = async () => {
            const res = await fetch("/api/lovenotes");
            const data = await res.json();
            if (Array.isArray(data)) setLoveNotes(data);
        };
        const fetchMilestones = async () => {
            const res = await fetch("/api/milestones");
            const data = await res.json();
            if (Array.isArray(data)) setMilestones(data);
        };
        const recordLogin = async () => {
            await fetch("/api/admin/login-history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: "sajid" })
            });
        };

        const fetchJarNotes = async () => {
            const res = await fetch("/api/jar");
            const data = await res.json();
            if (Array.isArray(data)) setJarNotes(data);
        };

        const updateLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    await fetch("/api/location", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            role: "sajid",
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        })
                    });
                });
            }
        };

        fetchProfiles();
        fetchLoveNotes();
        fetchMilestones();
        fetchJarNotes();
        recordLogin();
        updateLocation();

        // Fetch streak data
        const fetchStreak = async () => {
            try {
                const res = await fetch("/api/streak");
                const data = await res.json();
                setCurrentStreak(data.currentStreak || 0);
            } catch (error) {
                console.error("Failed to fetch streak:", error);
            }
        };
        fetchStreak();

        // Prompt for gratitude once a day
        const lastPrompt = localStorage.getItem("lastGratitudePrompt");
        const today = new Date().toLocaleDateString();
        if (lastPrompt !== today) {
            setShowGratitudePrompt(true);
        }
    }, []);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    };

    useEffect(() => {
        if (profiles.sajid?.latitude && profiles.nasywa?.latitude) {
            const d = calculateDistance(
                profiles.sajid.latitude, profiles.sajid.longitude,
                profiles.nasywa.latitude, profiles.nasywa.longitude
            );
            setDistance(d);
        }
    }, [profiles]);

    // Auto-refresh for secret message unlocking
    const [, setRefreshTrigger] = useState(0);
    useEffect(() => {
        // Check every 30 seconds if any message should be unlocked
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleMoodUpdate = async (mood: string) => {
        try {
            const res = await fetch("/api/profiles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role: "sajid",
                    mood,
                    name: profiles.sajid?.name,
                    avatarUrl: profiles.sajid?.avatarUrl
                })
            });
            const updated = await res.json();
            setProfiles(prev => ({ ...prev, sajid: updated }));
        } catch (e) {
            console.error("Failed to update mood", e);
        }
    };

    const handleClearChat = async () => {
        if (!confirm("Clear this chat permanently?")) return;
        try {
            await fetch(`/api/messages?user1=sajid&user2=${activeChat}`, { method: "DELETE" });
            setMessages(prev => ({ ...prev, [activeChat]: [] }));
        } catch (e) {
            console.error("Failed to clear chat", e);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            // Send as an image message
            const userMessage = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                text: "[Image]",
                imageUrl: base64,
                sender: "sajid",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "sending"
            };

            setMessages((prev) => ({
                ...prev,
                [activeChat]: [...prev[activeChat], userMessage]
            }));

            // Upload via API
            try {
                const res = await fetch("/api/images", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image: base64,
                        sender: "sajid",
                        receiver: activeChat,
                        viewType: "permanent"
                    })
                });
                const data = await res.json();
                if (data.success) {
                    // Update the message in store too
                    await fetch("/api/messages", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user1: "sajid",
                            user2: activeChat,
                            message: { ...userMessage, imageUrl: data.image.url, status: "sent" }
                        })
                    });
                }
            } catch (err) {
                console.error("Image upload failed", err);
            }
        };
        reader.readAsDataURL(file);
    };

    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
        };
        recognition.start();
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            try {
                const uploadRes = await fetch("/api/images", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image: base64,
                        sender: "sajid",
                        receiver: "system",
                        viewType: "permanent"
                    })
                });
                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    const newAvatar = uploadData.image.url;
                    await fetch("/api/profiles", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            role: "sajid",
                            name: profiles.sajid?.name || "Sajid",
                            avatarUrl: newAvatar
                        })
                    });
                    setProfiles(prev => ({
                        ...prev,
                        sajid: { ...prev.sajid, avatarUrl: newAvatar }
                    }));
                }
            } catch (err) {
                console.error("Avatar upload failed", err);
            }
        };
        reader.readAsDataURL(file);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeChat]);

    useEffect(() => {
        const currentMessages = messages[activeChat];
        if (currentMessages.length > 0 && !selectedMessage) {
            setSelectedMessage(currentMessages[currentMessages.length - 1]);
        }
    }, [messages, activeChat]);

    // Real-time synchronization with Pusher
    useEffect(() => {
        const fetchInitialMessages = async () => {
            try {
                const res = await fetch(`/api/messages?user1=sajid&user2=${activeChat}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMessages((prev) => ({ ...prev, [activeChat]: data }));
                }
            } catch (e) {
                console.error("Initial fetch failed", e);
            }
        };
        fetchInitialMessages();

        const pusher = getPusherClient();
        if (!pusher || !process.env.NEXT_PUBLIC_PUSHER_KEY) return;

        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        const channel = pusher.subscribe(chatKey);

        channel.bind("new-message", (newMessage: any) => {
            // Check for fireworks in new messages
            if (newMessage.type === "heart_firework" && newMessage.id !== lastFireworkId.current) {
                lastFireworkId.current = newMessage.id;
                triggerFirework(newMessage.text);
            }

            setMessages((prev) => {
                const chatMessages = prev[activeChat] || [];
                // If message exists (sent by us), update it; otherwise append
                const exists = chatMessages.find(m => m.id === newMessage.id);
                if (exists) {
                    return {
                        ...prev,
                        [activeChat]: chatMessages.map(m => m.id === newMessage.id ? newMessage : m)
                    };
                }
                return {
                    ...prev,
                    [activeChat]: [...chatMessages, newMessage]
                };
            });
        });

        channel.bind("clear-chat", () => {
            setMessages(prev => ({ ...prev, [activeChat]: [] }));
        });

        channel.bind("typing", (data: { user: string, isTyping: boolean }) => {
            if (data.user !== "sajid") {
                setIsOtherTyping(data.isTyping);
            }
        });

        channel.bind("profile-update", (data: { role: string, profile: any }) => {
            setProfiles(prev => ({ ...prev, [data.role]: data.profile }));
        });

        channel.bind("hug", () => {
            setCurrentHug(true);
            setTimeout(() => setCurrentHug(false), 5000);
        });

        channel.bind("kiss", () => {
            setCurrentKiss(true);
            setTimeout(() => setCurrentKiss(false), 5000);
        });

        channel.bind("mumma", () => {
            setCurrentMumma(true);
            setTimeout(() => setCurrentMumma(false), 5000);
        });

        channel.bind("babyboy", () => {
            setCurrentBabyBoy(true);
            setTimeout(() => setCurrentBabyBoy(false), 5000);
        });

        ["goodmorning", "goodafternoon", "goodevening", "goodnight"].forEach(type => {
            channel.bind(type, () => {
                setActiveAnimation(type);
                setTimeout(() => setActiveAnimation(null), 5000);
            });
        });

        channel.bind("new-lovenote", (note: any) => {
            setLoveNotes(prev => [note, ...prev]);
        });

        channel.bind("delete-lovenote", (data: { id: string }) => {
            setLoveNotes(prev => prev.filter(n => n.id !== data.id));
        });

        channel.bind("new-milestone", (milestone: any) => {
            setMilestones(prev => [...prev, milestone].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        });

        channel.bind("messages-seen", (data: { messageIds: string[] }) => {
            setMessages((prev) => {
                const chatMessages = prev[activeChat] || [];
                return {
                    ...prev,
                    [activeChat]: chatMessages.map(m =>
                        data.messageIds.includes(m.id) ? { ...m, status: "seen" } : m
                    )
                };
            });
        });

        return () => {
            pusher.unsubscribe(chatKey);
        };
    }, [activeChat]);

    // Mark messages as seen when they arrive or when activeChat changes
    useEffect(() => {
        const unseenIds = (messages[activeChat] || [])
            .filter(m => m.sender !== "sajid" && m.status !== "seen")
            .map(m => m.id);

        if (unseenIds.length > 0) {
            const sorted = ["sajid", activeChat].sort();
            const chatKey = `${sorted[0]}-${sorted[1]}`;
            fetch("/api/messages/read", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messageIds: unseenIds, chatKey })
            });

            // Local update for immediate feedback
            setMessages(prev => ({
                ...prev,
                [activeChat]: prev[activeChat].map(m =>
                    unseenIds.includes(m.id) ? { ...m, status: "seen" } : m
                )
            }));
        }
    }, [messages[activeChat], activeChat]);

    const handleSearchInput = (val: string) => {
        setInputValue(val);

        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        if (!isTypingRef.current) {
            isTypingRef.current = true;
            fetch("/api/chat/typing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatKey, user: "sajid", isTyping: true })
            });
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
            fetch("/api/chat/typing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatKey, user: "sajid", isTyping: false })
            });
        }, 2000);
    };

    const triggerFirework = (text: string) => {
        setFireworkText(text);
        setShowRocket(true);
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                setShowRocket(false);
                return clearInterval(interval);
            }
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#ff0000", "#ffa500", "#ff69b4"]
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#ff0000", "#ffa500", "#ff69b4"]
            });
        }, 50);

        setTimeout(() => setFireworkText(null), 5000);
    };

    const sendHeartFirework = async () => {
        const text = "I love you ❤️";
        const msgId = `msg-${Date.now()}`;
        const newMessage = {
            id: msgId,
            text,
            sender: "sajid",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending",
            type: "heart_firework"
        };

        setMessages(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], newMessage]
        }));

        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user1: "sajid", user2: activeChat, message: newMessage })
        });

        triggerFirework(text);
    };

    const sendHug = async () => {
        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        // Broadcast via a special event
        setCurrentHug(true);
        setTimeout(() => setCurrentHug(false), 5000);

        // We also save it as a message type so it shows in history
        const msgId = `msg-${Date.now()}`;
        const newMessage = {
            id: msgId,
            text: "Sent you a Huge Hug! 🤗",
            sender: "sajid",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending",
            type: "hug"
        };

        setMessages(prev => ({ ...prev, [activeChat]: [...prev[activeChat], newMessage] }));

        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user1: "sajid", user2: activeChat, message: newMessage })
        });

        // Trigger the animation for the other person
        await fetch("/api/chat/animation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatKey, type: "hug" })
        });
    };

    const sendKiss = async () => {
        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        setCurrentKiss(true);
        setTimeout(() => setCurrentKiss(false), 5000);

        const msgId = `msg-${Date.now()}`;
        const newMessage = {
            id: msgId,
            text: "Sent you a Big Kiss! 💋",
            sender: "sajid",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending",
            type: "kiss"
        };

        setMessages(prev => ({ ...prev, [activeChat]: [...prev[activeChat], newMessage] }));

        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user1: "sajid", user2: activeChat, message: newMessage })
        });

        await fetch("/api/chat/animation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatKey, type: "kiss" })
        });
    };

    const sendMumma = async () => {
        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        setCurrentMumma(true);
        setTimeout(() => setCurrentMumma(false), 5000);

        await fetch("/api/chat/animation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatKey, type: "mumma" })
        });
    };

    const sendBabyGirl = async () => {
        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        setCurrentBabyGirl(true);
        setTimeout(() => setCurrentBabyGirl(false), 5000);

        await fetch("/api/chat/animation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatKey, type: "babygirl" })
        });
    };

    const sendGreeting = async (type: string) => {
        const sorted = ["sajid", activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;

        setActiveAnimation(type);
        setTimeout(() => setActiveAnimation(null), 5000);

        await fetch("/api/chat/animation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatKey, type })
        });
    };

    const handleAddLoveNote = async (text: string) => {
        const res = await fetch("/api/lovenotes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: text, sender: "sajid" })
        });
        const note = await res.json();
        setLoveNotes(prev => [note, ...prev]);
    };

    const handleDeleteLoveNote = async (id: string) => {
        await fetch("/api/lovenotes", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        setLoveNotes(prev => prev.filter(n => n.id !== id));
    };

    const handleAddJarNote = async (content: string) => {
        const res = await fetch("/api/jar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, author: "sajid" })
        });
        const note = await res.json();
        setJarNotes(prev => [note, ...prev]);
        setShowGratitudePrompt(false);
        localStorage.setItem("lastGratitudePrompt", new Date().toLocaleDateString());
    };

    const handleAddMilestone = async (data: { title: string, date: string }) => {
        const res = await fetch("/api/milestones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const milestone = await res.json();
        setMilestones(prev => [...prev, milestone].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    };

    const handleSend = async (textOverride?: string, isSticker = false) => {
        const text = textOverride || inputValue;
        if (!text.trim()) return;

        const userMessage: any = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text: text,
            sender: "sajid",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending",
            isSticker: isSticker,
            isHeart: text === "❤️" || text === "💖",
            type: isSecretMode ? "secret" : "normal",
            unlockAt: isSecretMode ? secretUnlockTime : null
        };

        setMessages((prev) => ({
            ...prev,
            [activeChat]: [...prev[activeChat], userMessage]
        }));
        setInputValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px';
        }

        // Reset secret mode after sending
        if (isSecretMode) {
            setIsSecretMode(false);
        }

        // Trigger Mumma animation if keyword detected
        if (text.toLowerCase().includes("mumma")) {
            sendMumma();
        }

        // Trigger Baby Girl animation if keyword detected
        if (text.toLowerCase().includes("baby girl") || text.toLowerCase().includes("babygirl")) {
            sendBabyGirl();
        }

        // Trigger Greetings
        const lowerText = text.toLowerCase();
        if (lowerText.includes("good morning")) sendGreeting("goodmorning");
        else if (lowerText.includes("good afternoon")) sendGreeting("goodafternoon");
        else if (lowerText.includes("good evening")) sendGreeting("goodevening");
        else if (lowerText.includes("good night")) sendGreeting("goodnight");

        // 2. Persist to message store INSTANTLY (without translation)
        fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user1: "sajid",
                user2: activeChat,
                message: { ...userMessage, status: "sent" } // Set as sent immediately in store
            })
        }).catch(err => console.error("Initial sync failed:", err));

        // Record streak activity
        fetch("/api/streak", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: "sajid" })
        }).catch(err => console.error("Failed to record streak:", err));

        // 3. Request translation (background)
        try {
            console.log("Requesting translation...");
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: text,
                    sourceLang: "English",
                    targetLang: "Indonesian"
                }),
            });

            if (!response.ok) throw new Error("Translation failed");

            const data = await response.json();

            const updatedMessage = {
                ...userMessage,
                translation: data.translation || "No translation",
                hindiTranslation: data.hindiTranslation,
                wordBreakdown: data.wordBreakdown || [],
                status: "sent"
            };

            // Update local state with translation
            setMessages((prev) => ({
                ...prev,
                [activeChat]: prev[activeChat].map((msg) =>
                    msg.id === userMessage.id ? updatedMessage : msg
                )
            }));

            // Save translation back to store
            fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user1: "sajid",
                    user2: activeChat,
                    message: updatedMessage
                })
            }).catch(err => console.error("Final sync failed:", err));

            // Word breakdown logic
            if (data.wordBreakdown && Array.isArray(data.wordBreakdown)) {
                setLearnedWords((prev) => {
                    const newWords = data.wordBreakdown.filter((newWord: any) =>
                        !prev.some((w) => (w.word || "").toLowerCase() === (newWord.word || "").toLowerCase())
                    );
                    return [...prev, ...newWords];
                });
            }

        } catch (error: any) {
            console.error("Translation failed:", error);
            // English message is already saved and displayed, so we don't mark as error
        }
    };

    const chatPartners = [
        { id: "nasywa", name: "Nasywa", color: "from-pink-500 to-rose-500" },
        { id: "admin", name: "Admin", color: "from-purple-500 to-indigo-500" }
    ];

    return (
        <div className="flex h-[100dvh] bg-background overflow-hidden relative">
            <SlideshowBackground isPlaying={isMusicPlaying} />
            <BackgroundEffects effect={backgroundEffect} />
            {/* Mobile Overlay */}
            {(showSidebar || showWordBucket) && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => {
                        setShowSidebar(false);
                        setShowWordBucket(false);
                    }}
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
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                                {profiles.sajid?.avatarUrl ? (
                                    <img src={profiles.sajid.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h2 className="font-semibold text-sm lg:text-base">{profiles.sajid?.name || user.name}</h2>
                                <p className="text-xs text-muted-foreground mr-1 capitalize">{profiles.sajid?.mood ? `Feeling ${profiles.sajid.mood}` : "Learning Indonesian"}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                                <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                            </button>
                            <button onClick={onLogout} className="p-2 hover:bg-muted rounded-lg transition-colors">
                                <LogOut className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                        {[
                            { label: "Happy", icon: Smile, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                            { label: "Miss You", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
                            { label: "Tired", icon: Coffee, color: "text-orange-500", bg: "bg-orange-500/10" },
                            { label: "Need a Hug", icon: Ghost, color: "text-blue-500", bg: "bg-blue-500/10" }
                        ].map((m) => (
                            <button
                                key={m.label}
                                onClick={() => handleMoodUpdate(m.label)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all shrink-0",
                                    profiles.sajid?.mood === m.label
                                        ? `${m.bg} border-${m.color.split('-')[1]}-500/50 scale-105`
                                        : "bg-transparent border-transparent hover:bg-muted"
                                )}
                            >
                                <m.icon className={cn("w-3.5 h-3.5", m.color)} />
                                <span className="text-[10px] font-bold whitespace-nowrap">{m.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                            onClick={() => setShowLoveWall(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all"
                        >
                            <Layout className="w-3 h-3" />
                            Wall
                        </button>
                        <button
                            onClick={() => setShowMilestones(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all"
                        >
                            <Calendar className="w-3 h-3" />
                            Journey
                        </button>
                        <button
                            onClick={() => setShowJar(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
                        >
                            <Heart className="w-3 h-3 fill-current" />
                            Jar
                        </button>
                        <button
                            onClick={() => setShowMap(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                        >
                            <MapPin className="w-3 h-3" />
                            Track
                        </button>
                    </div>

                    {distance !== null && (
                        <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Distance</span>
                            </div>
                            <span className="text-sm font-black text-emerald-500">{distance.toLocaleString()} km</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-3 lg:p-4">
                    <div className="space-y-2">
                        {chatPartners.map((partner) => (
                            <button
                                key={partner.id}
                                onClick={() => {
                                    setActiveChat(partner.id as any);
                                    setShowSidebar(false);
                                }}
                                className={cn(
                                    "w-full p-3 lg:p-4 rounded-2xl transition-all flex items-center gap-3",
                                    activeChat === partner.id
                                        ? "bg-primary/10 border-2 border-primary"
                                        : "glass border border-white/5 hover:border-white/20"
                                )}
                            >
                                <div className={`w - 10 h - 10 rounded - xl bg - gradient - to - br ${partner.color} flex items - center justify - center relative overflow - hidden`}>
                                    {profiles[partner.id]?.avatarUrl ? (
                                        <img src={profiles[partner.id].avatarUrl} alt={partner.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-5 h-5 text-white" />
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold text-sm">{profiles[partner.id]?.name || partner.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {messages[partner.id as keyof typeof messages]?.length || 0} messages
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Chat */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-14 lg:h-16 border-b border-border flex items-center justify-between px-3 lg:px-6 bg-card/30 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors shrink-0"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className={`w - 8 h - 8 lg: w - 10 lg: h - 10 rounded - xl bg - gradient - to - br ${chatPartners.find(p => p.id === activeChat)?.color} flex items - center justify - center shrink - 0 overflow - hidden`}>
                            {profiles[activeChat]?.avatarUrl ? (
                                <img src={profiles[activeChat].avatarUrl} alt={activeChat} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-semibold text-sm lg:text-base capitalize truncate">{profiles[activeChat]?.name || activeChat}</h2>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] lg:text-xs text-green-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    Online
                                </p>
                                {profiles[activeChat]?.mood && (
                                    <span className="text-[10px] lg:text-xs text-muted-foreground flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-tighter">
                                        is feeling {profiles[activeChat].mood}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center px-4 overflow-hidden">
                        <MusicPlayer
                            activeChat={activeChat}
                            pusherClient={pusher}
                            currentEffect={backgroundEffect}
                            onEffectChange={setBackgroundEffect}
                            onPlayingChange={setIsMusicPlaying}
                            userRole="sajid"
                            inline={true}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Streak Button */}
                        <button
                            onClick={() => setShowStreak(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl hover:border-orange-500/40 transition-all group"
                            title="View Love Streak"
                        >
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-bold text-orange-500">{currentStreak}</span>
                        </button>
                        <button onClick={handleClearChat} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors group" title="Clear Chat">
                            <Trash2 className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-destructive" />
                        </button>
                        <button
                            onClick={() => setShowWordBucket(!showWordBucket)}
                            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors relative shrink-0"
                        >
                            <BookOpen className="w-5 h-5" />
                            {learnedWords.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {learnedWords.length}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                {/* Messages Container */}
                <div
                    className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4 pb-24 lg:pb-6 relative"
                    style={{
                        backgroundImage: chatWallpaper ? `url(${chatWallpaper})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {chatWallpaper && <div className="absolute inset-0 bg-background/60 pointer-events-none" />}
                    {
                        messages[activeChat].length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-sm">Start chatting with {activeChat}</p>
                            </div>
                        ) : (
                            messages[activeChat].map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-3 max-w-[85%] lg:max-w-[75%]",
                                        msg.sender === "sajid" ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center overflow-hidden",
                                        msg.sender === "sajid" ? "bg-blue-500" : "bg-pink-500"
                                    )}>
                                        {profiles[msg.sender]?.avatarUrl ? (
                                            <img src={profiles[msg.sender].avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div className={cn("flex flex-col gap-1", msg.sender === "sajid" ? "items-end" : "items-start")}>
                                        <div className={cn(
                                            "p-3 lg:p-4 rounded-2xl glass transition-all",
                                            msg.sender === "sajid" ? "bg-primary/20 rounded-tr-none" : "bg-muted/50 rounded-tl-none"
                                        )}>
                                            <div className="text-sm lg:text-base break-words">
                                                {msg.imageUrl ? (
                                                    <img src={msg.imageUrl} alt="Sent" className="max-w-full rounded-lg mb-2 shadow-lg cursor-pointer" onClick={() => window.open(msg.imageUrl, '_blank')} />
                                                ) : msg.type === "secret" && !isUnlocked(msg) ? (
                                                    <div className="flex flex-col items-center gap-2 py-4 px-8 opacity-50 select-none">
                                                        <Lock className="w-8 h-8 animate-pulse text-amber-500" />
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-center">
                                                            Secret Message<br />
                                                            <span className="text-amber-500">Unlocks at {msg.unlockAt}</span>
                                                        </p>
                                                    </div>
                                                ) : msg.isHeart ? (
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1 }}
                                                        className="text-4xl"
                                                    >
                                                        ❤️
                                                    </motion.div>
                                                ) : msg.isSticker ? (
                                                    <div className="text-5xl">{msg.text}</div>
                                                ) : (
                                                    msg.text
                                                )}
                                            </div>
                                            {msg.status === "sending" && (
                                                <div className="mt-1 flex items-center gap-1">
                                                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                                                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                                    <span className="text-[9px] text-muted-foreground ml-1">Translating...</span>
                                                </div>
                                            )}
                                            {msg.sender === "sajid" && (
                                                <div className="flex justify-end mt-1">
                                                    {msg.status === "seen" ? (
                                                        <CheckCheck className="w-3 h-3 text-blue-400" />
                                                    ) : msg.status === "sent" ? (
                                                        <CheckCheck className="w-3 h-3 text-muted-foreground/50" />
                                                    ) : (
                                                        <Check className="w-3 h-3 text-muted-foreground/50" />
                                                    )}
                                                </div>
                                            )}
                                            {msg.translation && (
                                                <div className="mt-2 pt-2 border-t border-white/5">
                                                    <p className="text-xs text-indigo-300 italic">{msg.translation}</p>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground px-2">{msg.timestamp}</span>
                                    </div>
                                </motion.div>
                            ))
                        )
                    }
                    {
                        isOtherTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 px-4 py-2"
                            >
                                <div className="flex gap-1">
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                </div>
                                <span className="text-xs text-muted-foreground italic">Nasywa is typing...</span>
                            </motion.div>
                        )
                    }
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="fixed lg:relative bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:right-auto p-3 lg:p-6 lg:pt-0 shrink-0 bg-background z-40">
                    <div className="flex flex-col gap-2">
                        {showStickers && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-3 rounded-2xl border border-white/10 grid grid-cols-6 gap-2 mb-2"
                            >
                                {["❤️", "💖", "✨", "🔥", "😭", "😂", "🌹", "💎", "🌈", "🍦", "🎁", "🎈"].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => {
                                            setInputValue("");
                                            handleSend(s, true); // Send as sticker
                                            setShowStickers(false);
                                        }}
                                        className="text-2xl hover:scale-125 transition-transform"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Secret Mode Status Bar */}
                        <AnimatePresence>
                            {isSecretMode && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="glass border border-amber-500/30 rounded-2xl p-3 mb-2 flex items-center justify-between gap-4 bg-amber-500/5"
                                >
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-amber-500" />
                                        <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Secret Message Mode</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-muted-foreground">Opens at:</span>
                                        <input
                                            type="time"
                                            value={secretUnlockTime}
                                            onChange={(e) => setSecretUnlockTime(e.target.value)}
                                            className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-1.5 text-sm font-bold text-amber-500 outline-none focus:ring-2 focus:ring-amber-500/50"
                                        />
                                        <button
                                            onClick={() => setIsSecretMode(false)}
                                            className="p-1.5 hover:bg-amber-500/20 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4 text-amber-500" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="glass border border-white/10 rounded-2xl p-2 flex items-end gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <AnimatePresence initial={false}>
                                {!inputValue && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "auto", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        className="flex items-center overflow-hidden shrink-0"
                                    >
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 hover:bg-white/5 rounded-xl transition-colors shrink-0"
                                        >
                                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                        </button>

                                        {/* Desktop-only action buttons or hidden behind toggle on mobile */}
                                        <div className="hidden lg:flex items-center">
                                            <button
                                                onClick={() => setShowStickers(!showStickers)}
                                                className="p-2 hover:bg-white/5 rounded-xl transition-colors shrink-0"
                                            >
                                                <Smile className="w-5 h-5 text-muted-foreground" />
                                            </button>
                                            <button
                                                onClick={() => setIsDrawing(true)}
                                                className="p-2 hover:bg-white/5 rounded-xl transition-colors shrink-0"
                                            >
                                                <Palette className="w-5 h-5 text-muted-foreground" />
                                            </button>
                                            <button
                                                onClick={sendHug}
                                                className="p-2 hover:bg-blue-500/10 rounded-xl transition-colors shrink-0 group"
                                            >
                                                <Ghost className="w-5 h-5 text-blue-500 transition-transform" />
                                            </button>
                                            <button
                                                onClick={sendKiss}
                                                className="p-2 hover:bg-pink-500/10 rounded-xl transition-colors shrink-0 group"
                                            >
                                                <Flame className="w-5 h-5 text-pink-500 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => setIsSecretMode(!isSecretMode)}
                                                className={cn(
                                                    "p-2 rounded-xl transition-colors shrink-0",
                                                    isSecretMode ? "bg-amber-500/20 text-amber-500" : "hover:bg-amber-500/10 text-muted-foreground"
                                                )}
                                                title="Secret Message Mode"
                                            >
                                                {isSecretMode ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        {/* Mobile Toggle Button */}
                                        <button
                                            onClick={() => setShowMoreActions(!showMoreActions)}
                                            className={cn(
                                                "lg:hidden p-2 hover:bg-white/5 rounded-xl transition-all shrink-0",
                                                showMoreActions && "rotate-45 text-primary"
                                            )}
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Mobile More Actions Menu */}
                            <AnimatePresence>
                                {showMoreActions && !inputValue && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: -60, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-20 left-4 bg-card/95 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-1 shadow-2xl z-50 lg:hidden"
                                    >
                                        <button onClick={() => { setShowStickers(!showStickers); setShowMoreActions(false); }} className="p-3 hover:bg-white/5 rounded-xl"><Smile className="w-5 h-5" /></button>
                                        <button onClick={() => { setIsDrawing(true); setShowMoreActions(false); }} className="p-3 hover:bg-white/5 rounded-xl"><Palette className="w-5 h-5" /></button>
                                        <button onClick={() => { sendHug(); setShowMoreActions(false); }} className="p-3 hover:bg-blue-500/10 rounded-xl"><Ghost className="w-5 h-5 text-blue-500" /></button>
                                        <button onClick={() => { sendKiss(); setShowMoreActions(false); }} className="p-3 hover:bg-pink-500/10 rounded-xl"><Flame className="w-5 h-5 text-pink-500" /></button>
                                        <button
                                            onClick={() => { setIsSecretMode(!isSecretMode); setShowMoreActions(false); }}
                                            className={cn("p-3 rounded-xl", isSecretMode ? "bg-amber-500/20 text-amber-500" : "hover:bg-white/5")}
                                        >
                                            {isSecretMode ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                        </button>
                                        <button onClick={() => { sendHeartFirework(); setShowMoreActions(false); }} className="p-3 hover:bg-red-500/10 rounded-xl"><Heart className="w-5 h-5 text-red-500" /></button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => {
                                    handleSearchInput(e.target.value);
                                    // Auto-resize textarea
                                    e.target.style.height = '40px';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder={`Message ${activeChat}... (Shift + Enter for new line)`}
                                className="flex-1 bg-transparent border-none outline-none text-sm px-2 lg:px-4 min-w-0 resize-none overflow-y-auto leading-relaxed"
                                rows={1}
                                style={{ minHeight: '40px', maxHeight: '150px' }}
                            />
                            <button
                                onClick={startRecording}
                                className={cn(
                                    "p-2 hover:bg-white/5 rounded-xl transition-colors shrink-0",
                                    isRecording && "text-red-500 animate-pulse"
                                )}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleSend()}
                                className="p-2 lg:p-3 bg-primary hover:bg-primary/90 rounded-xl transition-all neon-border shrink-0"
                            >
                                <Send className="w-4 h-4 lg:w-5 lg:h-5 text-primary-foreground" />
                            </button>
                        </div>
                    </div>
                </div >

                {/* Drawing Overlay */}
                <AnimatePresence>
                    {
                        isDrawing && (
                            <DrawingOverlay
                                onClose={() => setIsDrawing(false)}
                                onSave={(img) => {
                                    handleImageUpload({ target: { files: [dataURLtoFile(img, 'heart.png')] } } as any);
                                    setIsDrawing(false);
                                }}
                            />
                        )
                    }
                </AnimatePresence >
            </main >

            {/* Word Bucket */}
            < aside className={
                cn(
                    "fixed lg:relative inset-y-0 right-0 z-50 w-full sm:w-96 bg-background/95 backdrop-blur-2xl border-l border-border flex flex-col transition-transform duration-300",
                    showWordBucket ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                )
            } >
                <div className="p-4 lg:p-6 border-b border-border shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-sm lg:text-base">Learning Indonesian 🇮🇩</h3>
                            <p className="text-xs text-muted-foreground">{learnedWords.length} words collected</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowEmailSettings(!showEmailSettings)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowWordBucket(false)}
                                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showEmailSettings && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 overflow-hidden"
                            >
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    onClick={async () => {
                                        if (!userEmail || learnedWords.length === 0) return;
                                        try {
                                            const content = learnedWords.map(w => `
                                                <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.03); border-left: 4px solid #818cf8; border-radius: 8px;">
                                                    <div style="font-size: 18px; font-weight: bold; color: #ffffff; margin-bottom: 4px;">${w.word}</div>
                                                    <div style="font-size: 14px; color: #818cf8; font-weight: 500; margin-bottom: 8px;">${w.indonesian}</div>
                                                    <div style="font-size: 13px; color: #94a3b8; font-style: italic; line-height: 1.4;">${w.meaning}</div>
                                                </div>
                                            `).join('');

                                            const res = await fetch("/api/email/send", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    to: userEmail,
                                                    userName: "Sajid",
                                                    content: content
                                                })
                                            });
                                            if (res.ok) alert("Word list sent to your email!");
                                            else throw new Error("Failed");
                                        } catch (e) {
                                            alert("Failed to send email");
                                        }
                                    }}
                                    className="w-full px-3 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-all"
                                >
                                    Email My Word List
                                </button>
                            </motion.div >
                        )
                        }
                    </AnimatePresence >
                </div >

                <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2">
                    {learnedWords.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8">
                            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm">Start chatting to collect Indonesian words!</p>
                        </div>
                    ) : (
                        learnedWords.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 rounded-xl glass border border-white/5 hover:border-primary/20 transition-all">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-bold text-sm">{item.word}</p>
                                    <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                                </div>
                                <p className="text-indigo-300 font-medium mb-1 text-sm">{item.indonesian}</p>
                                <p className="text-xs text-muted-foreground">{item.meaning}</p>
                            </div>
                        ))
                    )}
                </div>

                {
                    learnedWords.length > 0 && (
                        <div className="p-3 lg:p-4 border-t border-border shrink-0">
                            <button
                                onClick={() => setLearnedWords([])}
                                className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/20 transition-all"
                            >
                                Clear All Words
                            </button>
                        </div>
                    )
                }
            </aside >
            {/* Settings Modal */}
            <AnimatePresence>
                {
                    showSettings && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSettings(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative w-full max-w-md glass border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold font-display">Profile Settings</h2>
                                    <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-xl transition-transform group-hover:scale-105">
                                            {profiles.sajid?.avatarUrl ? (
                                                <img src={profiles.sajid.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-12 h-12 text-white" />
                                            )}
                                        </div>
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-3xl">
                                            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                                            <div className="flex flex-col items-center gap-1">
                                                <Upload className="w-8 h-8 text-white" />
                                                <span className="text-[10px] text-white font-bold uppercase">Update</span>
                                            </div>
                                        </label>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium text-center">Your profile picture is stored securely in Cloudinary.</p>

                                    <div className="w-full space-y-5">
                                        <div>
                                            <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2 block">Display Name</label>
                                            <input
                                                type="text"
                                                value={profiles.sajid?.name || ""}
                                                onChange={(e) => {
                                                    const newName = e.target.value;
                                                    setProfiles(prev => ({
                                                        ...prev,
                                                        sajid: { ...prev.sajid, name: newName }
                                                    }));
                                                }}
                                                onBlur={async () => {
                                                    if (!profiles.sajid) return;
                                                    await fetch("/api/profiles", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({
                                                            role: "sajid",
                                                            name: profiles.sajid.name,
                                                            avatarUrl: profiles.sajid.avatarUrl
                                                        })
                                                    });
                                                }}
                                                placeholder="Your name"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2 block">Chat Wallpaper</label>
                                            <div className="flex gap-2">
                                                <label className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-2xl py-3 cursor-pointer">
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleWallpaperUpload} />
                                                    <ImageIcon className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Choose Wallpaper</span>
                                                </label>
                                                {chatWallpaper && (
                                                    <button
                                                        onClick={() => {
                                                            setChatWallpaper(null);
                                                            localStorage.removeItem(`chatWallpaper_sajid_${activeChat}`);
                                                        }}
                                                        className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="w-full mt-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Save Changes
                                </button>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>

            {/* Fullscreen Animations: Hug & Kiss */}
            <AnimatePresence>
                {
                    currentHug && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <Ghost className="w-64 h-64 text-blue-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: -40 }}
                                    className="absolute inset-x-0 -bottom-10 text-center"
                                >
                                    <span className="text-4xl font-black text-white drop-shadow-lg uppercase tracking-widest bg-black/20 px-4 py-2 rounded-2xl backdrop-blur-sm whitespace-nowrap">A Huge Hug! 🤗</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                }

                {
                    currentKiss && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative text-center">
                                <motion.div
                                    animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <Flame className="w-64 h-64 text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)] fill-current mx-auto" />
                                </motion.div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Heart className="w-32 h-32 text-white animate-ping opacity-50" />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: -40 }}
                                    className="absolute inset-x-0 -bottom-10 text-center"
                                >
                                    <span className="text-4xl font-black text-white drop-shadow-lg uppercase tracking-widest bg-black/20 px-4 py-2 rounded-2xl backdrop-blur-sm whitespace-nowrap">Big Kiss! 💋</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                }

                {
                    currentMumma && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative text-center">
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        scale: [1, 1.1, 1],
                                        rotate: [0, -5, 5, 0]
                                    }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                >
                                    <span className="text-[150px] lg:text-[300px] leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">🥺</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-x-0 -bottom-20 text-center"
                                >
                                    <span className="text-4xl lg:text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] bg-black/30 px-8 py-4 rounded-3xl backdrop-blur-md">
                                        Mumma...
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                }

                {
                    currentBabyGirl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative text-center">
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                >
                                    <span className="text-[150px] lg:text-[300px] leading-none drop-shadow-[0_0_50px_rgba(236,72,153,0.5)]">👸</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-x-0 -bottom-20 text-center"
                                >
                                    <span className="text-4xl lg:text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] bg-black/30 px-8 py-4 rounded-3xl backdrop-blur-md">
                                        Baby Girl... ❤️
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                }

                {
                    currentBabyBoy && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative text-center">
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        scale: [1, 1.1, 1],
                                        rotate: [0, -5, 5, 0]
                                    }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                >
                                    <span className="text-[150px] lg:text-[300px] leading-none drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]">👶</span>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-x-0 -bottom-20 text-center"
                                >
                                    <span className="text-4xl lg:text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] bg-black/30 px-8 py-4 rounded-3xl backdrop-blur-md">
                                        Baby Boy... 💙
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                }

                {activeAnimation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative text-center">
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <span className="text-[100px] lg:text-[200px] leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                                    {activeAnimation === 'goodmorning' && '☀️'}
                                    {activeAnimation === 'goodafternoon' && '🌤️'}
                                    {activeAnimation === 'goodevening' && '🌇'}
                                    {activeAnimation === 'goodnight' && '🌙'}
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute inset-x-0 -bottom-20 text-center"
                            >
                                <span className="text-4xl lg:text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] bg-black/30 px-8 py-4 rounded-3xl backdrop-blur-md whitespace-nowrap">
                                    {activeAnimation === 'goodmorning' && 'Good Morning, Love! ☀️'}
                                    {activeAnimation === 'goodafternoon' && 'Good Afternoon, Love! 🌤️'}
                                    {activeAnimation === 'goodevening' && 'Good Evening, Love! 🌇'}
                                    {activeAnimation === 'goodnight' && 'Good Night, Love! 🌙'}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* Firework Text & Rocket Overlay */}
            <AnimatePresence>
                {
                    fireworkText && (
                        <div className="fixed inset-0 z-[10001] flex flex-col items-center justify-center pointer-events-none px-4 overflow-hidden">
                            {showRocket && (
                                <motion.div
                                    initial={{ y: 800, x: -200, rotate: -45, opacity: 0 }}
                                    animate={{ y: -800, x: 200, rotate: -45, opacity: 1 }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                    className="mb-12"
                                >
                                    <Rocket className="w-24 h-24 lg:w-40 lg:h-40 text-red-500 fill-current drop-shadow-[0_0_20px_rgba(244,63,94,1)] drop-shadow-[0_0_50px_rgba(244,63,94,0.5)]" />
                                </motion.div>
                            )}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.5, y: -100 }}
                            >
                                <h1 className="text-4xl lg:text-7xl font-black text-white text-center drop-shadow-[0_0_30px_rgba(244,63,94,1)] drop-shadow-[0_0_60px_rgba(244,63,94,0.5)] bg-clip-text">
                                    {fireworkText}
                                </h1>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>

            {/* Love Features Overlays */}
            <AnimatePresence>
                {
                    showLoveWall && (
                        <LoveWallOverlay
                            notes={loveNotes}
                            onClose={() => setShowLoveWall(false)}
                            onAdd={handleAddLoveNote}
                            onDelete={handleDeleteLoveNote}
                            role="sajid"
                        />
                    )
                }
                {
                    showMilestones && (
                        <MilestonesOverlay
                            milestones={milestones}
                            onClose={() => setShowMilestones(false)}
                            onAdd={handleAddMilestone}
                            role="sajid"
                        />
                    )
                }
                {
                    showJar && (
                        <JarOverlay
                            notes={jarNotes}
                            onClose={() => setShowJar(false)}
                            onAdd={handleAddJarNote}
                            role="sajid"
                        />
                    )
                }
                {
                    showMap && (
                        <InteractiveMap
                            distance={distance}
                            onClose={() => setShowMap(false)}
                            myLocation={profiles.sajid}
                            partnerLocation={profiles.nasywa}
                            myRole="sajid"
                        />
                    )
                }
                {
                    showStreak && (
                        <StreakOverlay
                            onClose={() => setShowStreak(false)}
                        />
                    )
                }
            </AnimatePresence>
        </div>
    );
}

function DrawingOverlay({ onClose, onSave }: { onClose: () => void, onSave: (img: string) => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
    }, []);

    const startDrawing = (e: any) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.getContext('2d')?.beginPath();
    };

    const draw = (e: any) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
            <div className="bg-card w-full max-w-lg rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold">Draw a Heart ❤️</h3>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={400}
                        className="w-full aspect-square bg-white rounded-2xl cursor-crosshair touch-none"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                    />
                </div>
                <div className="p-4 border-t border-border flex gap-3">
                    <button
                        onClick={() => {
                            const canvas = canvasRef.current;
                            if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
                        }}
                        className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-all"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => {
                            const canvas = canvasRef.current;
                            if (canvas) onSave(canvas.toDataURL());
                        }}
                        className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg"
                    >
                        Send Heart
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function LoveWallOverlay({ notes, onClose, onAdd, onDelete, role }: { notes: any[], onClose: () => void, onAdd: (text: string) => void, onDelete: (id: string) => void, role: string }) {
    const [newNote, setNewNote] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-card w-full max-w-4xl max-h-[90vh] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-pink-500/10 to-rose-500/10">
                    <div>
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <Heart className="text-pink-500 fill-current" />
                            Our Love Wall
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Capture every sweet moment</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col gap-4">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="I love when you..."
                                className="flex-1 bg-transparent resize-none outline-none text-sm font-medium italic placeholder:text-muted-foreground/30"
                            />
                            <button
                                onClick={() => {
                                    if (newNote.trim()) {
                                        onAdd(newNote);
                                        setNewNote("");
                                    }
                                }}
                                className="w-full py-2.5 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Note
                            </button>
                        </div>

                        {notes.map((note) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 rounded-3xl bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/20 shadow-lg relative group overflow-hidden"
                            >
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-all" />
                                <p className="text-sm font-medium italic mb-4 leading-relaxed">{note.content || note.text}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black uppercase text-white", (note.sender || note.author) === 'sajid' ? 'bg-blue-500' : 'bg-pink-500')}>
                                            {(note.sender || note.author)?.[0] || '?'}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{new Date(note.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {(note.sender || note.author) === role && (
                                        <button
                                            onClick={() => onDelete(note.id)}
                                            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function MilestonesOverlay({ milestones, onClose, onAdd, role }: { milestones: any[], onClose: () => void, onAdd: (data: any) => void, role: string }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-card w-full max-w-2xl max-h-[90vh] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                    <div>
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <Calendar className="text-indigo-500" />
                            Our Journey
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Every step of the way</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                    <div className="space-y-8 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/50 to-purple-500/50" />

                        {milestones.map((m, idx) => {
                            const mDate = new Date(m.date);
                            const diff = mDate.getTime() - Date.now();
                            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                            const isPast = days < 0;

                            return (
                                <motion.div
                                    key={m.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-6 relative"
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 border-background z-10 shrink-0 mt-1",
                                        isPast ? "bg-indigo-500" : "bg-white border-indigo-500 animate-pulse"
                                    )} />
                                    <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                                        <h4 className="font-black text-sm uppercase tracking-wider">{m.title}</h4>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{mDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            <span className={cn(
                                                "text-[10px] font-black px-2 py-0.5 rounded-full",
                                                isPast ? "bg-white/10 text-white/50" : "bg-green-500/20 text-green-500"
                                            )}>
                                                {isPast ? "COMPLETED" : `${Math.abs(days)} DAYS TO GO`}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        <div className="flex gap-6 relative">
                            <div className="w-6 h-6 rounded-full border-2 border-dashed border-indigo-500/50 z-10 shrink-0 mt-1" />
                            <div className="flex-1 p-6 rounded-2xl bg-indigo-500/5 border-2 border-dashed border-indigo-500/20 flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Event Name"
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        if (title && date) {
                                            onAdd({ title, date });
                                            setTitle("");
                                            setDate("");
                                        }
                                    }}
                                    className="w-full py-3 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    Add New Milestone
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function JarOverlay({ notes, onClose, onAdd, role }: { notes: any[], onClose: () => void, onAdd: (content: string) => void, role: string }) {
    const [newNote, setNewNote] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-card w-full max-w-2xl max-h-[90vh] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                    <div>
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <Heart className="text-amber-500 fill-current" />
                            Jar of Hearts
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Daily gratitude & compliments</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                    <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-sm font-bold mb-3 text-amber-500">✨ Write something you appreciate about your partner today:</p>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Today I appreciate you for..."
                            className="w-full bg-transparent resize-none outline-none text-sm font-medium italic placeholder:text-muted-foreground/30 min-h-[80px]"
                        />
                        <button
                            onClick={() => {
                                if (newNote.trim()) {
                                    onAdd(newNote);
                                    setNewNote("");
                                }
                            }}
                            className="w-full py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all flex items-center justify-center gap-2 mt-3"
                        >
                            <Heart className="w-4 h-4 fill-current" />
                            Add to Jar
                        </button>
                    </div>

                    <div className="space-y-4">
                        {notes.map((note, idx) => (
                            <motion.div
                                key={note.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20"
                            >
                                <p className="text-sm italic">"{note.content}"</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-[10px] font-bold text-amber-500 uppercase">— {note.author}</span>
                                    <span className="text-[10px] text-muted-foreground">{new Date(note.createdAt).toLocaleDateString()}</span>
                                </div>
                            </motion.div>
                        ))}
                        {notes.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">No notes yet. Be the first to add one!</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function MapOverlay({ distance, onClose, myLocation, partnerLocation }: { distance: number | null, onClose: () => void, myLocation: any, partnerLocation: any }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-card w-full max-w-lg max-h-[90vh] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
                    <div>
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <MapPin className="text-emerald-500" />
                            Distance Tracker
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Thinking of you from afar</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 p-6 lg:p-8 flex flex-col items-center justify-center">
                    {distance !== null ? (
                        <>
                            <div className="relative w-48 h-48 mb-8">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30"
                                />
                                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-500/50 flex items-center justify-center flex-col">
                                    <span className="text-4xl font-black text-emerald-500">{Math.round(distance).toLocaleString()}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">kilometers</span>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between gap-4">
                                <div className="flex-1 text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <User className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <p className="text-xs font-bold text-blue-500 uppercase">You</p>
                                </div>

                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <Heart className="w-8 h-8 text-pink-500 fill-current" />
                                </motion.div>

                                <div className="flex-1 text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-500/20 flex items-center justify-center">
                                        <User className="w-6 h-6 text-pink-500" />
                                    </div>
                                    <p className="text-xs font-bold text-pink-500 uppercase">Your Love</p>
                                </div>
                            </div>

                            <p className="mt-8 text-center text-sm text-muted-foreground italic">
                                "No matter the distance, our hearts are always close."
                            </p>
                        </>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-sm">Enable location to see the distance between you</p>
                            <p className="text-xs mt-2 opacity-50">Location permissions may be required</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
