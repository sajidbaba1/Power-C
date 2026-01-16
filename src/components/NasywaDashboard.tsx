"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, LogOut, User, Menu, BookOpen, X, Mail, Mic, Image as ImageIcon, Heart, Trash2, Palette, Smile, Settings, Upload } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import confetti from "canvas-confetti";
import { getPusherClient } from "@/lib/pusher";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NasywaDashboardProps {
    user: { name: string; role: string };
    onLogout: () => void;
}

export default function NasywaDashboard({ user, onLogout }: NasywaDashboardProps) {
    const [activeChat, setActiveChat] = useState<"sajid" | "admin">("sajid");
    const [messages, setMessages] = useState<Record<string, any[]>>({
        sajid: [],
        admin: []
    });
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
    const [profiles, setProfiles] = useState<Record<string, any>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [fireworkText, setFireworkText] = useState<string | null>(null);
    const lastFireworkId = useRef<string | null>(null);


    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const [p1, p2] = await Promise.all([
                    fetch(`/api/profiles?role=nasywa`).then(r => r.json()),
                    fetch(`/api/profiles?role=sajid`).then(r => r.json())
                ]);
                setProfiles({ nasywa: p1, sajid: p2 });
            } catch (e) {
                console.error("Failed to fetch profiles", e);
            }
        };
        fetchProfiles();
    }, []);

    const handleClearChat = async () => {
        if (!confirm("Clear this chat permanently?")) return;
        try {
            await fetch(`/api/messages?user1=nasywa&user2=${activeChat}`, { method: "DELETE" });
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
                sender: "nasywa",
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
                        sender: "nasywa",
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
                            user1: "nasywa",
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
                        sender: "nasywa",
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
                            role: "nasywa",
                            name: profiles.nasywa?.name || "Nasywa",
                            avatarUrl: newAvatar
                        })
                    });
                    setProfiles(prev => ({
                        ...prev,
                        nasywa: { ...prev.nasywa, avatarUrl: newAvatar }
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

    // Real-time synchronization with Pusher
    useEffect(() => {
        const fetchInitialMessages = async () => {
            try {
                const res = await fetch(`/api/messages?user1=nasywa&user2=${activeChat}`);
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

        const sorted = ["nasywa", activeChat].sort();
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

        return () => {
            pusher.unsubscribe(chatKey);
        };
    }, [activeChat]);

    const triggerFirework = (text: string) => {
        setFireworkText(text);
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        setTimeout(() => setFireworkText(null), 6000);
    };

    const sendHeartFirework = async () => {
        const text = "I love you Sajid ❤️";
        const message = {
            id: `firework-${Date.now()}`,
            text: text,
            sender: "nasywa",
            type: "heart_firework",
            timestamp: new Date().toLocaleTimeString(),
            status: "sent"
        };

        // Trigger locally immediately
        lastFireworkId.current = message.id;
        triggerFirework(text);

        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user1: "nasywa",
                user2: "sajid",
                message: message
            })
        });
    };

    const handleSend = async (textOverride?: string, isSticker = false) => {
        const text = textOverride || inputValue;
        if (!text.trim()) return;

        const userMessage = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text: text,
            sender: "nasywa",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending",
            isSticker: isSticker,
            isHeart: text === "❤️" || text === "💖"
        };

        setMessages((prev) => ({
            ...prev,
            [activeChat]: [...prev[activeChat], userMessage]
        }));
        setInputValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px';
        }

        // 2. Persist to message store INSTANTLY (without translation)
        fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user1: "nasywa",
                user2: activeChat,
                message: { ...userMessage, status: "sent" } // Set as sent immediately in store
            })
        }).catch(err => console.error("Initial sync failed:", err));

        // 3. Request translation (background)
        try {
            console.log("Requesting translation...");
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: inputValue,
                    sourceLang: "English",
                    targetLang: "Hindi"
                }),
            });

            if (!response.ok) throw new Error("Translation failed");

            const data = await response.json();

            const updatedMessage = {
                ...userMessage,
                translation: data.translation || data.hindiTranslation || "No translation",
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
                    user1: "nasywa",
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

        } catch (error) {
            console.error("Translation failed:", error);
            // English message is already saved and displayed
        }
    };

    const chatPartners = [
        { id: "sajid", name: "Sajid", color: "from-blue-500 to-indigo-500" },
        { id: "admin", name: "Admin", color: "from-purple-500 to-indigo-500" }
    ];

    return (
        <div className="flex h-[100dvh] bg-background overflow-hidden relative">
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
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center overflow-hidden">
                                {profiles.nasywa?.avatarUrl ? (
                                    <img src={profiles.nasywa.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h2 className="font-semibold text-sm lg:text-base">{profiles.nasywa?.name || user.name}</h2>
                                <p className="text-xs text-muted-foreground">Learning Hindi</p>
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
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center relative overflow-hidden`}>
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
                <header className="h-14 lg:h-16 border-b border-border flex items-center justify-between px-3 lg:px-6 bg-card/30 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors shrink-0"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br ${chatPartners.find(p => p.id === activeChat)?.color} flex items-center justify-center shrink-0 overflow-hidden`}>
                            {profiles[activeChat]?.avatarUrl ? (
                                <img src={profiles[activeChat].avatarUrl} alt={activeChat} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-semibold text-sm lg:text-base capitalize truncate">{profiles[activeChat]?.name || activeChat}</h2>
                            <p className="text-[10px] lg:text-xs text-green-500">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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

                <div className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4 pb-24 lg:pb-6">
                    {messages[activeChat].length === 0 ? (
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
                                    msg.sender === "nasywa" ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center overflow-hidden",
                                    msg.sender === "nasywa" ? "bg-pink-500" : "bg-blue-500"
                                )}>
                                    {profiles[msg.sender]?.avatarUrl ? (
                                        <img src={profiles[msg.sender].avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                <div className={cn("flex flex-col gap-1", msg.sender === "nasywa" ? "items-end" : "items-start")}>
                                    <div className={cn(
                                        "p-3 lg:p-4 rounded-2xl glass transition-all",
                                        msg.sender === "nasywa" ? "bg-primary/20 rounded-tr-none" : "bg-muted/50 rounded-tl-none"
                                    )}>
                                        <div className="text-sm lg:text-base break-words">
                                            {msg.imageUrl ? (
                                                <img src={msg.imageUrl} alt="Sent" className="max-w-full rounded-lg mb-2 shadow-lg cursor-pointer" onClick={() => window.open(msg.imageUrl, '_blank')} />
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
                                        {(msg.hindiTranslation || msg.translation) && (
                                            <div className="mt-2 pt-2 border-t border-white/5">
                                                <p className="text-xs text-indigo-300 italic">
                                                    {msg.hindiTranslation || msg.translation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground px-2">{msg.timestamp}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
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

                        <div className="glass border border-white/10 rounded-2xl p-2 flex items-end gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 hover:bg-white/5 rounded-xl transition-colors shrink-0"
                            >
                                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            </button>
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
                                onClick={sendHeartFirework}
                                className="p-2 hover:bg-red-500/10 rounded-xl transition-colors shrink-0 group"
                                title="Send Love Firework"
                            >
                                <Heart className="w-5 h-5 text-red-500 group-hover:scale-125 transition-transform fill-current" />
                            </button>
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
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
                                placeholder={`Message ${activeChat}... (Shift+Enter for new line)`}
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
                </div>

                {/* Drawing Overlay */}
                <AnimatePresence>
                    {isDrawing && (
                        <DrawingOverlay
                            onClose={() => setIsDrawing(false)}
                            onSave={(img) => {
                                handleImageUpload({ target: { files: [dataURLtoFile(img, 'heart.png')] } } as any);
                                setIsDrawing(false);
                            }}
                        />
                    )}
                </AnimatePresence>
            </main>

            {/* Word Bucket */}
            <aside className={cn(
                "fixed lg:relative inset-y-0 right-0 z-50 w-full sm:w-96 bg-background/95 backdrop-blur-2xl border-l border-border flex flex-col transition-transform duration-300",
                showWordBucket ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            )}>
                <div className="p-4 lg:p-6 border-b border-border shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-sm lg:text-base">Learning Hindi 🇮🇳</h3>
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
                                                <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1)">
                                                    <strong style="font-size: 16px;">${w.word}</strong><br>
                                                    <span style="color: #818cf8;">${w.hindi || w.translation || 'N/A'}</span><br>
                                                    <em style="font-size: 12px; color: #94a3b8;">${w.meaning}</em>
                                                </div>
                                            `).join('');

                                            const res = await fetch("/api/email/send", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    to: userEmail,
                                                    userName: "Nasywa",
                                                    content: content
                                                })
                                            });
                                            if (res.ok) alert("Word list sent to your email!");
                                            else throw new Error("Failed");
                                        } catch (e) {
                                            alert("Failed to send email");
                                        }
                                    }}
                                    className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
                                >
                                    Email My Word List
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2">
                    {learnedWords.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8">
                            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm">Start chatting to collect Hindi words!</p>
                        </div>
                    ) : (
                        learnedWords.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 rounded-xl glass border border-white/5 hover:border-primary/20 transition-all">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-bold text-sm">{item.word}</p>
                                    <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                                </div>
                                <p className="text-indigo-300 font-medium mb-1 text-sm">{item.hindi || item.translation || "N/A"}</p>
                                <p className="text-xs text-muted-foreground">{item.meaning}</p>
                            </div>
                        ))
                    )}
                </div>

                {learnedWords.length > 0 && (
                    <div className="p-3 lg:p-4 border-t border-border shrink-0">
                        <button
                            onClick={() => setLearnedWords([])}
                            className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/20 transition-all"
                        >
                            Clear All Words
                        </button>
                    </div>
                )}
            </aside>
            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
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
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500" />
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold font-display">Profile Settings</h2>
                                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-xl transition-transform group-hover:scale-105">
                                        {profiles.nasywa?.avatarUrl ? (
                                            <img src={profiles.nasywa.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
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
                                            value={profiles.nasywa?.name || ""}
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setProfiles(prev => ({
                                                    ...prev,
                                                    nasywa: { ...prev.nasywa, name: newName }
                                                }));
                                            }}
                                            onBlur={async () => {
                                                if (!profiles.nasywa) return;
                                                await fetch("/api/profiles", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        role: "nasywa",
                                                        name: profiles.nasywa.name,
                                                        avatarUrl: profiles.nasywa.avatarUrl
                                                    })
                                                });
                                            }}
                                            placeholder="Your name"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white/10 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowSettings(false)}
                                className="w-full mt-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Save Changes
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Firework Text Overlay */}
            <AnimatePresence>
                {fireworkText && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.5, y: -100 }}
                        className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none px-4"
                    >
                        <h1 className="text-4xl lg:text-7xl font-black text-white text-center drop-shadow-[0_0_30px_rgba(244,63,94,1)] drop-shadow-[0_0_60px_rgba(244,63,94,0.5)] bg-clip-text">
                            {fireworkText}
                        </h1>
                    </motion.div>
                )}
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
