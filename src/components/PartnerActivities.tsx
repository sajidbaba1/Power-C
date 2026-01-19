import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
    Camera,
    User
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
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState("");
    const [activeTab, setActiveTab] = useState<"feed" | "new">("feed");
    const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
    const [showHistory, setShowHistory] = useState(false);
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


    // Removed handleImageUpload and handleAddActivity from here as they moved to child component

    const handleNewActivity = useCallback((activity: Activity) => {
        setActivities(prev => [activity, ...prev]);
    }, []);

    const handleOptimisticRollback = useCallback((tempId: string) => {
        setActivities(prev => prev.filter(a => a.id !== tempId));
    }, []);

    const handleUpdateActivity = useCallback((updatedActivity: Activity) => {
        setActivities(prev => prev.map(a => a.id === updatedActivity.id ? updatedActivity : a));
    }, []);


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

                        {/* Tab Navbar */}
                        <div className="px-6 lg:px-10 py-2 border-b border-white/5 bg-white/[0.01] flex items-center justify-center sm:justify-start gap-1">
                            <button
                                onClick={() => setActiveTab("feed")}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]",
                                    activeTab === "feed"
                                        ? "bg-primary/20 text-primary border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                                        : "text-muted-foreground hover:bg-white/5"
                                )}
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                Pulse Feed
                            </button>
                            <button
                                onClick={() => setActiveTab("new")}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]",
                                    activeTab === "new"
                                        ? "bg-primary/20 text-primary border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                                        : "text-muted-foreground hover:bg-white/5"
                                )}
                            >
                                <Plus className="w-3.5 h-3.5" />
                                New Pulse
                            </button>
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
                        <div className="flex-1 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                {activeTab === "new" ? (
                                    <motion.div
                                        key="new"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="h-full overflow-y-auto overflow-x-hidden p-6 lg:p-10 flex flex-col items-center justify-center max-w-2xl mx-auto"
                                    >
                                        <div className="w-full space-y-8">
                                            <div className="text-center space-y-2">
                                                <h3 className="text-2xl font-black tracking-tight">Post a Pulse</h3>
                                                <p className="text-sm text-muted-foreground">Show {partnerName} what you're up to right now.</p>
                                            </div>

                                            <ActivityInput
                                                userRole={userRole}
                                                searchDate={searchDate}
                                                onNewActivity={handleNewActivity}
                                                onOptimisticRollback={handleOptimisticRollback}
                                                onUpdateActivity={handleUpdateActivity}
                                            />
                                        </div>
                                    </motion.div>
                                ) : (

                                    <motion.div
                                        key="feed"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        ref={scrollRef}
                                        className="h-full overflow-y-auto overflow-x-hidden p-4 lg:p-10 space-y-12 bg-gradient-to-b from-transparent to-white/[0.01]"
                                    >
                                        {isLoading ? (
                                            <div className="h-full flex flex-col items-center justify-center gap-4">
                                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Syncing pulses...</p>
                                            </div>
                                        ) : activities.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-10 text-center">
                                                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                                    <MessageCircle className="w-10 h-10 opacity-20" />
                                                </div>
                                                <h4 className="text-xl font-bold mb-2">No pulses yet</h4>
                                                <p className="text-sm max-w-[200px]">Be the first to share what's happening!</p>
                                                <button
                                                    onClick={() => setActiveTab("new")}
                                                    className="mt-6 px-8 py-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary/20 transition-all"
                                                >
                                                    Add a Pulse
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-12">
                                                {activities.map((activity) => (
                                                    <motion.div
                                                        key={activity.id}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="relative group"
                                                    >
                                                        <div className="flex flex-col lg:flex-row gap-6 relative">
                                                            {/* Avatar Gutter */}
                                                            <div className="hidden lg:flex flex-col items-center gap-4 shrink-0">
                                                                <div className={cn(
                                                                    "w-14 h-14 rounded-2xl border-2 flex items-center justify-center shadow-2xl relative overflow-hidden bg-card transition-all duration-500",
                                                                    activity.sender === userRole ? "border-primary/50 shadow-primary/20" : "border-purple-500/50 shadow-purple-500/20"
                                                                )}>
                                                                    <User className="w-6 h-6" />
                                                                </div>
                                                                <div className="flex-1 w-px bg-gradient-to-b from-white/10 to-transparent" />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                {/* Activity Meta */}
                                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                                    <span className={cn(
                                                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                                        activity.sender === userRole
                                                                            ? "bg-primary/20 text-primary border border-primary/20"
                                                                            : "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                                                                    )}>
                                                                        {activity.sender === userRole ? "My Pulse" : activity.sender}
                                                                    </span>
                                                                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground">
                                                                        <Clock className="w-3 h-3" />
                                                                        {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                    </span>
                                                                </div>

                                                                {/* Activity Body */}
                                                                <div className={cn(
                                                                    "p-6 md:p-8 rounded-[2.5rem] border",
                                                                    activity.status === "completed"
                                                                        ? "bg-green-500/10 border-green-500/20"
                                                                        : "bg-white/5 border-white/10 shadow-lg shadow-black/20"
                                                                )}>
                                                                    <p className={cn(
                                                                        "text-sm md:text-base lg:text-lg font-semibold leading-relaxed tracking-tight break-words select-text",
                                                                        activity.status === "completed" && "text-muted-foreground line-through decoration-primary/30"
                                                                    )}>
                                                                        {activity.text}
                                                                    </p>

                                                                    {activity.imageUrl && (
                                                                        <div className="mt-6 rounded-3xl overflow-hidden border border-white/10 shadow-md bg-black/20 min-h-[200px] flex items-center justify-center">
                                                                            <img
                                                                                src={activity.imageUrl}
                                                                                alt="Pulse"
                                                                                loading="lazy"
                                                                                className="w-full h-auto object-contain"
                                                                                style={{ maxHeight: '500px' }}
                                                                                onError={(e) => {
                                                                                    // Hide broken images
                                                                                    e.currentTarget.style.display = 'none';
                                                                                    e.currentTarget.parentElement!.style.display = 'none';
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    {/* Reactions & Actions */}
                                                                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                                                                        <div className="flex items-center gap-2">
                                                                            {["❤️", "🔥", "✨", "🙌", "🥺", "💪"].map((emoji) => (
                                                                                <button
                                                                                    key={emoji}
                                                                                    onClick={() => handleAddReaction(activity.id, emoji)}
                                                                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 active:bg-white/20 active:scale-95 transition-transform"
                                                                                >
                                                                                    {emoji}
                                                                                </button>
                                                                            ))}
                                                                        </div>

                                                                        <div className="flex items-center gap-3">
                                                                            {activity.sender !== userRole && (
                                                                                <button
                                                                                    onClick={() => handleToggleStatus(activity)}
                                                                                    className={cn(
                                                                                        "flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all font-black uppercase tracking-widest text-[9px] border",
                                                                                        activity.status === "completed"
                                                                                            ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20"
                                                                                            : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground"
                                                                                    )}
                                                                                >
                                                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                                                    {activity.status === "completed" ? "Completed" : "Mark Done"}
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {/* Reactions Display */}
                                                                    {activity.reactions && activity.reactions.length > 0 && (
                                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                                            {Array.from(new Set(activity.reactions.map(r => r.emoji))).map(emoji => (
                                                                                <div key={emoji} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                                                                                    <span className="text-xs">{emoji}</span>
                                                                                    <span className="text-[10px] font-bold text-primary">
                                                                                        {activity.reactions.filter(r => r.emoji === emoji).length}
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Comments Section */}
                                                                <div className="mt-6 space-y-4">
                                                                    <div className="flex items-center gap-2 px-4 mb-2">
                                                                        <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
                                                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Comments</span>
                                                                    </div>

                                                                    {activity.comments && activity.comments.map(comment => (
                                                                        <motion.div
                                                                            key={comment.id}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            className="flex gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:ml-4"
                                                                        >
                                                                            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                                                <p className="text-[10px] font-black uppercase text-muted-foreground">{comment.sender?.[0]}</p>
                                                                            </div>
                                                                            <div className="flex-1 space-y-1">
                                                                                <div className="flex items-center justify-between">
                                                                                    <span className="text-[9px] font-black tracking-widest uppercase text-primary/80">{comment.sender}</span>
                                                                                    <span className="text-[8px] text-muted-foreground font-bold">
                                                                                        {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-[10px] font-medium text-foreground/90 leading-relaxed">{comment.text}</p>
                                                                            </div>
                                                                        </motion.div>
                                                                    ))}

                                                                    <div className="flex items-center gap-3 px-2 md:ml-4 bg-white/5 rounded-2xl border border-white/10 p-2">
                                                                        <input
                                                                            value={activeCommentId === activity.id ? commentText : ""}
                                                                            onFocus={() => setActiveCommentId(activity.id)}
                                                                            onChange={(e) => setCommentText(e.target.value)}
                                                                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(activity.id)}
                                                                            placeholder="Add a sweet comment..."
                                                                            className="flex-1 bg-transparent border-none outline-none px-4 py-2.5 text-[10px] font-medium"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleAddComment(activity.id)}
                                                                            disabled={!commentText.trim() || activeCommentId !== activity.id}
                                                                            className="h-10 w-10 bg-primary/20 text-primary border border-primary/20 rounded-xl flex items-center justify-center hover:bg-primary/30 disabled:opacity-30 disabled:scale-100 active:scale-95 transition-all text-sm"
                                                                        >
                                                                            <Send className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="h-20 shrink-0" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

const ActivityInput = ({
    userRole,
    searchDate,
    onNewActivity,
    onOptimisticRollback,
    onUpdateActivity
}: {
    userRole: string;
    searchDate: string;
    onNewActivity: (a: Activity) => void;
    onOptimisticRollback: (id: string) => void;
    onUpdateActivity: (a: Activity) => void;
}) => {
    const [newActivityText, setNewActivityText] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Compress image before setting state
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                // Compress to JPEG with 0.7 quality
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                setSelectedImage(compressedBase64);
            };
        };
    }, []);

    const handleAddActivity = useCallback(async () => {
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
        onNewActivity(optimisticActivity);
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
            onUpdateActivity(savedActivity);
        } catch (e: any) {
            console.error("Failed to add activity:", e);
            // Rollback optimistic update
            onOptimisticRollback(tempId);
            setNewActivityText(originalText);
            setSelectedImage(originalImage);
        } finally {
            setIsSubmitting(false);
        }
    }, [newActivityText, selectedImage, isSubmitting, userRole, searchDate, onNewActivity, onUpdateActivity, onOptimisticRollback]);

    return (
        <div className="space-y-4">
            <div className="relative group">
                <textarea
                    value={newActivityText}
                    onChange={(e) => setNewActivityText(e.target.value)}
                    placeholder="Write your heart out..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-5 md:p-8 min-h-[150px] text-sm md:text-base font-medium resize-none outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/30 transition-colors shadow-inner"
                    style={{ willChange: 'contents' }}
                />
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "h-14 w-14 rounded-2xl transition-all shadow-xl flex items-center justify-center",
                            selectedImage ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
                        )}
                        title="Add Image"
                    >
                        <Camera className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl bg-black/20 min-h-[200px] flex items-center justify-center"
                >
                    <img src={selectedImage} alt="Preview" className="w-full h-auto object-contain" style={{ maxHeight: '400px' }} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="h-14 w-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            )}

            <button
                onClick={handleAddActivity}
                disabled={isSubmitting || !newActivityText.trim()}
                className="w-full h-16 bg-gradient-to-r from-primary to-pink-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Publish Pulse
                    </>
                )}
            </button>
        </div>
    );
};
