import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
    X,
    Plus,
    Image as ImageIcon,
    CheckCircle,
    Circle,
    MessageCircle,
    Search,
    Calendar,
    Send,
    Smile,
    Heart,
    HeartOff,
    Sparkles,
    Check,
    Clock,
    Camera
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface Activity {
    id: string;
    text: string;
    imageUrl?: string;
    sender: string;
    status: "pending" | "completed";
    date: string;
    createdAt: string;
    reactions: any[];
    comments: ActivityComment[];
}

export interface ActivityComment {
    id: string;
    text: string;
    sender: string;
    createdAt: string;
}

interface PartnerActivitiesProps {
    isOpen: boolean;
    onClose: () => void;
    userRole: "sajid" | "nasywa";
    pusherClient: any;
}

export default function PartnerActivities({ isOpen, onClose, userRole, pusherClient }: PartnerActivitiesProps) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newActivityText, setNewActivityText] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
    const [showHistory, setShowHistory] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const partnerRole = userRole === "sajid" ? "nasywa" : "sajid";
    const partnerName = partnerRole === "sajid" ? "Sajid" : "Nasywa";

    useEffect(() => {
        if (isOpen) {
            fetchActivities(searchDate);
        }
    }, [isOpen, searchDate]);

    useEffect(() => {
        if (!pusherClient) return;

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        const channel = pusherClient.subscribe(chatKey);

        channel.bind("new-activity", (newAct: Activity) => {
            if (newAct.date === searchDate) {
                setActivities(prev => {
                    // Avoid duplicate if optimistic update already added it
                    if (prev.some(a => a.id === newAct.id)) return prev;
                    return [newAct, ...prev];
                });
            }
        });

        channel.bind("activity-update", (updatedAct: Activity) => {
            setActivities(prev => prev.map(a => a.id === updatedAct.id ? updatedAct : a));
        });

        return () => {
            pusherClient.unsubscribe(chatKey);
        };
    }, [pusherClient, searchDate]);

    const fetchActivities = async (date: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/activities?date=${date}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setActivities(data);
            }
        } catch (e) {
            console.error("Failed to fetch activities", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddActivity = async () => {
        if (!newActivityText.trim() || isSubmitting) return;

        setIsSubmitting(true);
        const tempId = `temp-${Date.now()}`;
        const optimisticActivity: Activity = {
            id: tempId,
            text: newActivityText,
            imageUrl: selectedImage || undefined,
            sender: userRole,
            status: "pending",
            date: searchDate,
            createdAt: new Date().toISOString(),
            reactions: [],
            comments: []
        };

        // Optimistically add to list
        setActivities(prev => [optimisticActivity, ...prev]);
        const originalText = newActivityText;
        const originalImage = selectedImage;
        setNewActivityText("");
        setSelectedImage(null);

        try {
            const res = await fetch("/api/activities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: originalText,
                    imageUrl: originalImage,
                    sender: userRole
                })
            });

            if (!res.ok) throw new Error("Failed to add activity");

            const savedActivity = await res.json();
            // Replace optimistic activity with saved one
            setActivities(prev => prev.map(a => a.id === tempId ? savedActivity : a));
        } catch (e: any) {
            console.error("Failed to add activity:", e);
            // Rollback optimistic update
            setActivities(prev => prev.filter(a => a.id !== tempId));
            setNewActivityText(originalText);
            setSelectedImage(originalImage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleStatus = async (activity: Activity) => {
        if (activity.sender !== userRole) return; // Only owner can complete

        const newStatus = activity.status === "pending" ? "completed" : "pending";
        // Optimistic update
        setActivities(prev => prev.map(a => a.id === activity.id ? { ...a, status: newStatus } : a));

        try {
            await fetch("/api/activities", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: activity.id,
                    status: newStatus
                })
            });
        } catch (e) {
            // Rollback
            setActivities(prev => prev.map(a => a.id === activity.id ? { ...a, status: activity.status } : a));
        }
    };

    const handleAddReaction = async (id: string, emoji: string) => {
        await fetch("/api/activities", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                reaction: emoji,
                sender: userRole
            })
        });
    };

    const handleAddComment = async (id: string) => {
        if (!commentText.trim()) return;

        await fetch("/api/activities", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                comment: commentText,
                sender: userRole
            })
        });
        setCommentText("");
        setActiveCommentId(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 lg:p-8 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        className="relative w-full max-w-4xl h-full sm:h-[90vh] bg-card backdrop-blur-2xl border border-white/10 rounded-none sm:rounded-[3rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col"
                    >
                        {/* Header Area */}
                        <div className="relative shrink-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
                            <div className="relative p-6 lg:p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-2xl bg-primary/20 text-primary">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                                            What's {partnerName} doing?
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground font-medium pl-14 tracking-wide text-sm">
                                        Keep up with each other's day, one pulse at a time.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pl-14 md:pl-0">
                                    <button
                                        onClick={async () => {
                                            const toEmail = userRole === "sajid" ? "nasywanazhifariyandi@gmail.com" : "ss2727303@gmail.com";
                                            const fromName = userRole === "sajid" ? "Sajid" : "Nasywa";
                                            fetch("/api/mood-notify", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ from: fromName, toEmail, mood: "Miss You" })
                                            });
                                            alert("Sent a Miss You pulse! ❤️");
                                        }}
                                        className="h-12 px-6 bg-pink-500/10 text-pink-500 border border-pink-500/20 rounded-2xl hover:bg-pink-500/20 active:scale-95 transition-all flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        <Heart className="w-4 h-4 fill-current" />
                                        <span>Pulse Heart</span>
                                    </button>
                                    <button
                                        onClick={() => setShowHistory(!showHistory)}
                                        className={cn(
                                            "h-12 w-12 rounded-2xl transition-all flex items-center justify-center border",
                                            showHistory
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "glass border-white/10 hover:bg-white/10"
                                        )}
                                    >
                                        <Calendar className="w-5 h-5" />
                                    </button>
                                    <button onClick={onClose} className="h-12 w-12 rounded-2xl glass border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center group">
                                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* History Search Bar */}
                        <AnimatePresence>
                            {showHistory && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 lg:px-10 py-6 bg-white/5 border-b border-white/5 flex items-center gap-4 shrink-0 overflow-hidden"
                                >
                                    <div className="flex-1 relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="date"
                                            value={searchDate}
                                            onChange={(e) => setSearchDate(e.target.value)}
                                            className="w-full bg-muted/30 border border-white/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium transition-all"
                                        />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                                            {searchDate === new Date().toISOString().split('T')[0] ? "Today's Log" : "Historical Log"}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                            {/* Left Pane: New activity input */}
                            <div className="w-full md:w-80 p-6 lg:p-8 border-b md:border-b-0 md:border-r border-white/5 space-y-6 shrink-0 bg-white/[0.02]">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">New Pulse</label>
                                    <div className="relative">
                                        <textarea
                                            value={newActivityText}
                                            onChange={(e) => setNewActivityText(e.target.value)}
                                            placeholder="What's happening?"
                                            className="w-full bg-muted/20 border border-white/10 rounded-3xl p-5 min-h-[160px] text-sm font-medium resize-none outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/50 transition-all"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className={cn(
                                                    "p-3 rounded-2xl transition-all",
                                                    selectedImage ? "bg-green-500/20 text-green-400" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                                )}
                                            >
                                                <Camera className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />

                                    {selectedImage && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group"
                                        >
                                            <img src={selectedImage} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    )}

                                    <button
                                        onClick={handleAddActivity}
                                        disabled={!newActivityText.trim() || isSubmitting}
                                        className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Publish Pulse</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Right Pane: Activity Feed */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-gradient-to-b from-transparent to-white/[0.01]">
                                {isLoading ? (
                                    <div className="h-60 flex flex-col items-center justify-center gap-4">
                                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Syncing pulses...</p>
                                    </div>
                                ) : activities.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-10 bg-white/[0.02] rounded-[3rem] border-2 border-dashed border-white/5 mt-4">
                                        <Clock className="w-16 h-16 mb-6 opacity-5" />
                                        <h3 className="text-lg font-bold text-foreground/50 mb-2">Silence is Golden</h3>
                                        <p className="text-sm text-center max-w-[240px]">No pulses recorded for this date. Start the conversation!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-10">
                                        {activities.map((activity, idx) => (
                                            <motion.div
                                                key={activity.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group relative"
                                            >
                                                {/* Connecting line for flow */}
                                                {idx !== activities.length - 1 && (
                                                    <div className="absolute left-[26px] top-12 bottom-[-40px] w-0.5 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
                                                )}

                                                <div className="flex gap-6 items-start">
                                                    {/* Status Circle */}
                                                    <button
                                                        onClick={() => handleToggleStatus(activity)}
                                                        className={cn(
                                                            "mt-1 w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center transition-all relative z-10",
                                                            activity.status === "completed"
                                                                ? "bg-green-500/20 text-green-500 border border-green-500/20"
                                                                : "bg-white/5 text-muted-foreground border border-white/10 hover:border-primary/50",
                                                            activity.sender !== userRole && "pointer-events-none"
                                                        )}
                                                    >
                                                        {activity.status === "completed" ? (
                                                            <CheckCircle className="w-7 h-7" />
                                                        ) : (
                                                            <div className="w-3 h-3 rounded-full bg-current opacity-40 animate-pulse" />
                                                        )}
                                                    </button>

                                                    <div className="flex-1 min-w-0">
                                                        {/* Activity Meta */}
                                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                                            <span className={cn(
                                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                                activity.sender === userRole
                                                                    ? "bg-primary/20 text-primary border border-primary/20"
                                                                    : "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                                                            )}>
                                                                {activity.sender === userRole ? "My Pulse" : activity.sender}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                                                                <Clock className="w-3 h-3" />
                                                                {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>

                                                        {/* Activity Body */}
                                                        <div className={cn(
                                                            "p-6 lg:p-8 rounded-[2rem] border transition-all duration-500",
                                                            activity.status === "completed"
                                                                ? "bg-green-500/[0.03] border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                                                                : "bg-white/5 border-white/10 group-hover:bg-white/[0.07] group-hover:border-white/20 shadow-xl shadow-black/20"
                                                        )}>
                                                            <p className={cn(
                                                                "text-xl lg:text-2xl font-semibold leading-relaxed tracking-tight break-words",
                                                                activity.status === "completed" && "text-muted-foreground line-through decoration-primary/30"
                                                            )}>
                                                                {activity.text}
                                                            </p>

                                                            {activity.imageUrl && (
                                                                <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group/img">
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                                                    <img
                                                                        src={activity.imageUrl}
                                                                        alt="Pulse Image"
                                                                        className="w-full h-auto object-contain max-h-[400px] hover:scale-105 transition-transform duration-700"
                                                                    />
                                                                </div>
                                                            )}

                                                            {/* Reactions & Comments Footer */}
                                                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                                                {/* Reactions */}
                                                                <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-white/5 border border-white/5">
                                                                    {["❤️", "🔥", "✨", "🙌"].map(emoji => (
                                                                        <button
                                                                            key={emoji}
                                                                            onClick={() => handleAddReaction(activity.id, emoji)}
                                                                            className="hover:scale-125 active:scale-95 transition-transform p-1 filter drop-shadow-sm"
                                                                        >
                                                                            {emoji}
                                                                        </button>
                                                                    ))}
                                                                    {activity.reactions && activity.reactions.length > 0 && (
                                                                        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
                                                                            <span className="text-xs font-bold text-primary">{activity.reactions.length}</span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Comment Toggle */}
                                                                <button
                                                                    onClick={() => setActiveCommentId(activeCommentId === activity.id ? null : activity.id)}
                                                                    className={cn(
                                                                        "flex items-center gap-2 p-2 px-4 rounded-2xl transition-all",
                                                                        activeCommentId === activity.id
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <MessageCircle className="w-4 h-4" />
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                                                        {activity.comments?.length || 0} Comments
                                                                    </span>
                                                                </button>
                                                            </div>

                                                            {/* Comments Section */}
                                                            <AnimatePresence>
                                                                {activeCommentId === activity.id && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="pt-6 space-y-4">
                                                                            {activity.comments?.map(comment => (
                                                                                <div key={comment.id} className="flex gap-3 items-start bg-white/5 p-3 rounded-2xl border border-white/5">
                                                                                    <div className="flex-1">
                                                                                        <div className="flex items-center justify-between mb-1">
                                                                                            <span className="text-[9px] font-black text-primary uppercase tracking-wider">{comment.sender}</span>
                                                                                            <span className="text-[8px] font-medium text-muted-foreground">
                                                                                                {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                                            </span>
                                                                                        </div>
                                                                                        <p className="text-[10px] font-medium text-foreground/90 leading-relaxed">{comment.text}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}

                                                                            <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10">
                                                                                <input
                                                                                    value={commentText}
                                                                                    onChange={(e) => setCommentText(e.target.value)}
                                                                                    placeholder="Write a sweet comment..."
                                                                                    className="flex-1 bg-transparent border-none outline-none text-xs px-3 py-2"
                                                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(activity.id)}
                                                                                />
                                                                                <button
                                                                                    onClick={() => handleAddComment(activity.id)}
                                                                                    className="p-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors"
                                                                                >
                                                                                    <Send className="w-4 h-4" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
