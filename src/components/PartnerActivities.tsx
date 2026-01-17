import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    Smile
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

        console.log("Submitting activity:", { text: originalText, sender: userRole });

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

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to add activity");
            }

            const savedActivity = await res.json();
            console.log("Activity saved successfully:", savedActivity);

            // Replace optimistic activity with saved one
            setActivities(prev => prev.map(a => a.id === tempId ? savedActivity : a));
        } catch (e: any) {
            console.error("Failed to add activity:", e);
            alert(`Error: ${e.message}`);
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
        await fetch("/api/activities", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: activity.id,
                status: newStatus
            })
        });
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-card border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 lg:p-8 border-b border-white/5 bg-white/5 flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                    What's {partnerRole === 'sajid' ? 'Sajid' : 'Nasywa'} doing?
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">Daily activities & status updates</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowHistory(!showHistory)}
                                    className={cn(
                                        "p-3 rounded-2xl transition-all",
                                        showHistory ? "bg-primary text-primary-foreground" : "glass border border-white/5 hover:bg-white/10"
                                    )}
                                >
                                    <Calendar className="w-5 h-5" />
                                </button>
                                <button onClick={onClose} className="p-3 glass border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* History Search Bar */}
                        <AnimatePresence>
                            {showHistory && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 lg:px-8 py-4 bg-white/5 border-b border-white/5 flex items-center gap-4 shrink-0 overflow-hidden"
                                >
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="date"
                                            value={searchDate}
                                            onChange={(e) => setSearchDate(e.target.value)}
                                            className="w-full bg-muted/50 border border-white/10 rounded-xl pl-12 pr-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        {searchDate === new Date().toISOString().split('T')[0] ? "Today" : "History"}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Activities List */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                            {isLoading ? (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : activities.length === 0 ? (
                                <div className="h-40 flex flex-col items-center justify-center text-muted-foreground bg-white/5 rounded-3xl border border-dashed border-white/10">
                                    <Circle className="w-12 h-12 mb-4 opacity-10" />
                                    <p className="text-sm">No activities recorded for this date.</p>
                                </div>
                            ) : (
                                activities.map(activity => (
                                    <motion.div
                                        key={activity.id}
                                        layout
                                        className={cn(
                                            "relative p-6 rounded-[2rem] border transition-all",
                                            activity.status === "completed"
                                                ? "bg-green-500/5 border-green-500/20"
                                                : "bg-white/5 border-white/10"
                                        )}
                                    >
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => handleToggleStatus(activity)}
                                                className={cn(
                                                    "shrink-0 mt-1 transition-transform active:scale-95",
                                                    activity.sender !== userRole && "pointer-events-none opacity-50"
                                                )}
                                            >
                                                {activity.status === "completed" ? (
                                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                                ) : (
                                                    <Circle className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </button>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                        {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    <span className={cn(
                                                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                                        activity.sender === "sajid" ? "bg-blue-500/20 text-blue-500" : "bg-pink-500/20 text-pink-500"
                                                    )}>
                                                        {activity.sender}
                                                    </span>
                                                </div>

                                                <p className={cn(
                                                    "text-lg lg:text-xl font-medium leading-relaxed break-words",
                                                    activity.status === "completed" && "text-muted-foreground line-through"
                                                )}>
                                                    {activity.text}
                                                </p>

                                                {activity.imageUrl && (
                                                    <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                                        <img src={activity.imageUrl} alt="Activity" className="w-full h-auto object-cover max-h-80" />
                                                    </div>
                                                )}

                                                {/* Reactions */}
                                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                                    {["❤️", "🔥", "💪", "✨", "🙌"].map(emoji => {
                                                        const count = activity.reactions?.filter((r: any) => r.emoji === emoji).length || 0;
                                                        const reactedByMe = activity.reactions?.some((r: any) => r.emoji === emoji && r.user === userRole);

                                                        return (
                                                            <button
                                                                key={emoji}
                                                                onClick={() => handleAddReaction(activity.id, emoji)}
                                                                className={cn(
                                                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                                                                    reactedByMe ? "bg-primary text-primary-foreground" : "bg-white/5 hover:bg-white/10"
                                                                )}
                                                            >
                                                                <span>{emoji}</span>
                                                                {count > 0 && <span className="opacity-70">{count}</span>}
                                                            </button>
                                                        );
                                                    })}
                                                    <button
                                                        onClick={() => setActiveCommentId(activity.id === activeCommentId ? null : activity.id)}
                                                        className="p-1.5 hover:bg-white/5 rounded-full text-muted-foreground transition-colors"
                                                    >
                                                        <MessageCircle className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Comments List */}
                                                {activity.comments && activity.comments.length > 0 && (
                                                    <div className="mt-4 space-y-3 bg-white/3 p-4 rounded-2xl border border-white/5">
                                                        {activity.comments.map(comment => (
                                                            <div key={comment.id} className="text-sm">
                                                                <span className={cn(
                                                                    "font-bold mr-2 lowercase",
                                                                    comment.sender === "sajid" ? "text-blue-400" : "text-pink-400"
                                                                )}>{comment.sender}:</span>
                                                                <span className="text-muted-foreground">{comment.text}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Comment Input */}
                                                <AnimatePresence>
                                                    {activeCommentId === activity.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="mt-4 flex gap-2 overflow-hidden"
                                                        >
                                                            <input
                                                                type="text"
                                                                placeholder="Add a comment..."
                                                                value={commentText}
                                                                onChange={(e) => setCommentText(e.target.value)}
                                                                onKeyDown={(e) => e.key === "Enter" && handleAddComment(activity.id)}
                                                                className="flex-1 bg-muted/50 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                                                                autoFocus
                                                            />
                                                            <button
                                                                onClick={() => handleAddComment(activity.id)}
                                                                className="p-2 bg-primary text-primary-foreground rounded-xl"
                                                            >
                                                                <Send className="w-4 h-4" />
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer (Add New) - Only for today */}
                        {searchDate === new Date().toISOString().split('T')[0] && (
                            <div className="p-6 lg:p-8 bg-white/5 border-t border-white/5 shrink-0">
                                <div className="flex flex-col gap-3">
                                    {selectedImage && (
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20">
                                            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute top-1 right-1 bg-black/50 p-1 rounded-lg hover:bg-black/80"
                                            >
                                                <X className="w-3 h-3 text-white" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        <div className="flex-1 relative flex items-center">
                                            <input
                                                type="text"
                                                placeholder="What are you doing right now?"
                                                value={newActivityText}
                                                onChange={(e) => setNewActivityText(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && handleAddActivity()}
                                                className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-sm lg:text-base border-r-0 rounded-r-none"
                                            />
                                            <div className="bg-muted/50 border border-white/10 border-l-0 rounded-r-2xl pr-2 flex items-center h-full">
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-muted-foreground"
                                                >
                                                    <ImageIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                        <button
                                            onClick={handleAddActivity}
                                            disabled={!newActivityText.trim() || isSubmitting}
                                            className="bg-primary text-primary-foreground p-4 lg:p-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100 min-w-[64px] flex items-center justify-center"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Plus className="w-6 h-6" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
