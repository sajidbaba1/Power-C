'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity as ActivityIcon,
    Calendar,
    Heart,
    MessageSquare,
    Send,
    Smile,
    User,
    X,
    Camera,
    Stars,
    Clock,
    CheckCircle2,
    Search,
    ChevronRight,
    Loader2,
    Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import Pusher from 'pusher-js';

// --- Types ---
interface Activity {
    id: string;
    text: string;
    imageUrl?: string;
    sender: string;
    status: 'pending' | 'completed';
    date: string;
    createdAt: string;
    reactions: { emoji: string; user: string }[];
    comments: { id: string; user: string; text: string; createdAt: string }[];
}

interface PartnerActivitiesProps {
    isOpen: boolean;
    onClose: () => void;
    userRole: string;
    partnerName: string;
}

// --- Background Effects ---
const PulseBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
    </div>
);

export default function PartnerActivities({ isOpen, onClose, userRole, partnerName }: PartnerActivitiesProps) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ totalByMe: 0, totalByPartner: 0 });

    const fromName = userRole === "sajid" ? "Sajid" : "Nasywa";
    const toEmail = userRole === "sajid" ? "nasywaagiftania.03@gmail.com" : "ss2727303@gmail.com";

    // --- Fetching ---
    const fetchActivities = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/activities?date=${selectedDate}`);
            if (res.ok) {
                const data = await res.json();
                setActivities(data);
                // Update stats
                const me = data.filter((a: Activity) => a.sender === userRole).length;
                const partner = data.length - me;
                setStats({ totalByMe: me, totalByPartner: partner });
            }
        } catch (error) {
            console.error("Failed to fetch activities:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedDate, userRole]);

    useEffect(() => {
        if (isOpen) {
            fetchActivities();
        }
    }, [isOpen, fetchActivities]);

    // --- Pusher Integration ---
    useEffect(() => {
        const pusher = new Pusher("0d115e5c942cd8942918", { cluster: "ap2" });
        const channel = pusher.subscribe(`activities-${selectedDate}`);

        channel.bind("new-activity", (newActivity: Activity) => {
            setActivities(prev => {
                const exists = prev.find(a => a.id === newActivity.id);
                if (exists) return prev;
                return [newActivity, ...prev];
            });
        });

        channel.bind("update-activity", (updatedActivity: Activity) => {
            setActivities(prev => prev.map(a => a.id === updatedActivity.id ? updatedActivity : a));
        });

        return () => {
            pusher.unsubscribe(`activities-${selectedDate}`);
        };
    }, [selectedDate]);

    // --- Actions ---
    const handleReaction = async (activityId: string, emoji: string) => {
        try {
            const res = await fetch("/api/activities/react", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activityId, emoji, user: userRole })
            });

            if (res.ok) {
                const fromName = userRole === "sajid" ? "Sajid" : "Nasywa";
                const toEmail = userRole === "sajid" ? "nasywaagiftania.03@gmail.com" : "ss2727303@gmail.com";
                await fetch("/api/mood-notify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        from: fromName,
                        toEmail,
                        mood: `${emoji} Reaction`,
                        message: `Reacted with ${emoji} to your pulse!`
                    })
                });
            }
        } catch (error) {
            console.error("Failed to react:", error);
        }
    };

    const handleComment = async (activityId: string, text: string) => {
        if (!text.trim()) return;
        try {
            const res = await fetch("/api/activities/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activityId, text, user: userRole })
            });

            if (res.ok) {
                const fromName = userRole === "sajid" ? "Sajid" : "Nasywa";
                const toEmail = userRole === "sajid" ? "nasywaagiftania.03@gmail.com" : "ss2727303@gmail.com";
                await fetch("/api/mood-notify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        from: fromName,
                        toEmail,
                        mood: `New Comment`,
                        message: `Commented: "${text.substring(0, 30)}..." on your pulse!`
                    })
                });
            }
        } catch (error) {
            console.error("Failed to comment:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
                >
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
                    <PulseBackground />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full h-full max-w-6xl bg-zinc-950/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 lg:p-8 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20">
                                    <ActivityIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl lg:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                                        The Pulse
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                                    </h2>
                                    <p className="text-xs lg:text-sm text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        Syncing Hearts Refhedged
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex bg-white/5 p-1 rounded-2xl border border-white/10">
                                    <button
                                        onClick={() => setActiveTab('list')}
                                        className={cn(
                                            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                            activeTab === 'list' ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                                        )}
                                    >
                                        Activity Feed
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('new')}
                                        className={cn(
                                            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                            activeTab === 'new' ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                                        )}
                                    >
                                        Post Pulse
                                    </button>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all active:scale-95"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Tabs */}
                        <div className="md:hidden flex p-2 border-b border-white/5 gap-2">
                            <button
                                onClick={() => setActiveTab('list')}
                                className={cn(
                                    "flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                    activeTab === 'list' ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                                )}
                            >
                                Feed
                            </button>
                            <button
                                onClick={() => setActiveTab('new')}
                                className={cn(
                                    "flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                    activeTab === 'new' ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                                )}
                            >
                                Post
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-h-0 relative">
                            <AnimatePresence mode="wait">
                                {activeTab === "list" ? (
                                    <motion.div
                                        key="list"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="h-full flex flex-col"
                                    >
                                        {/* Filters */}
                                        <div className="p-6 lg:p-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.02]">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="relative flex-1 md:w-64">
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="date"
                                                        value={selectedDate}
                                                        onChange={(e) => setSelectedDate(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const fromName = userRole === "sajid" ? "Sajid" : "Nasywa";
                                                        const toEmail = userRole === "sajid" ? "nasywaagiftania.03@gmail.com" : "ss2727303@gmail.com";
                                                        fetch("/api/mood-notify", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ from: fromName, toEmail, mood: "Miss You" })
                                                        });
                                                        toast.success("Miss You pulse sent! ❤️");
                                                    }}
                                                    className="p-3 bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 border border-pink-500/20 rounded-2xl transition-all flex items-center gap-2 group"
                                                >
                                                    <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                                                    <span className="hidden sm:inline font-bold text-sm">Pulse Heart</span>
                                                </button>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="text-center px-4 border-r border-white/10">
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Your Pulses</p>
                                                    <p className="text-xl font-black text-white">{stats.totalByMe}</p>
                                                </div>
                                                <div className="text-center px-4">
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">{partnerName}'s Pulses</p>
                                                    <p className="text-xl font-black text-white">{stats.totalByPartner}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* List */}
                                        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                                            {isLoading ? (
                                                <div className="h-64 flex flex-col items-center justify-center gap-4">
                                                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Syncing Heartbeats...</p>
                                                </div>
                                            ) : activities.length === 0 ? (
                                                <div className="h-64 flex flex-col items-center justify-center gap-4 opacity-40">
                                                    <ActivityIcon className="w-16 h-16 text-muted-foreground" />
                                                    <p className="text-sm font-bold uppercase tracking-widest">No pulses recorded for this day</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-6 max-w-4xl mx-auto">
                                                    {activities.map((activity, idx) => (
                                                        <ActivityCard
                                                            key={activity.id}
                                                            activity={activity}
                                                            userRole={userRole}
                                                            onReact={handleReaction}
                                                            onComment={handleComment}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <div className="h-10" />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="new"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="h-full overflow-y-auto overflow-x-hidden p-6 lg:p-10 flex flex-col items-center justify-start max-w-2xl mx-auto pt-10 md:pt-20 lg:pt-10"
                                    >
                                        <div className="w-full space-y-8">
                                            <div className="text-center space-y-2">
                                                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 mb-4 ring-4 ring-primary/20">
                                                    <Stars className="w-10 h-10 text-white" />
                                                </div>
                                                <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Post a Pulse</h3>
                                                <p className="text-muted-foreground font-medium">Let {partnerName} know what's going on in your world.</p>
                                            </div>

                                            <ActivityInput
                                                userRole={userRole}
                                                searchDate={selectedDate}
                                                onNewActivity={(a) => {
                                                    setActivities(prev => [a, ...prev]);
                                                    toast.success("Pulse posted successfully! ✨");
                                                    setActiveTab('list');
                                                }}
                                                onOptimisticRollback={(id) => {
                                                    setActivities(prev => prev.filter(a => a.id !== id));
                                                    toast.error("Failed to post pulse. Let's try again!");
                                                }}
                                                onUpdateActivity={(updated) => {
                                                    setActivities(prev => prev.map(a => a.id.startsWith('temp-') && a.text === updated.text ? updated : a));
                                                }}
                                            />
                                        </div>
                                        <div className="h-20 shrink-0" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div >
            )
            }
        </AnimatePresence >
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
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '150px';
            textareaRef.current.style.height = Math.max(150, Math.min(textareaRef.current.scrollHeight, 400)) + 'px';
        }
    }, [newActivityText]);

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
                    sender: userRole,
                    date: searchDate
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
                    ref={textareaRef}
                    value={newActivityText}
                    onChange={(e) => setNewActivityText(e.target.value)}
                    placeholder="Tell your partner what you're doing..."
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
                    <img src={selectedImage} alt="Preview" className="w-full h-auto object-contain max-h-[250px] md:max-h-[400px]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="p-4 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all border border-red-500/20 shadow-xl"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                </motion.div>
            )}

            <button
                disabled={!newActivityText.trim() || isSubmitting}
                onClick={handleAddActivity}
                className={cn(
                    "w-full h-16 rounded-[2rem] flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all",
                    newActivityText.trim() && !isSubmitting
                        ? "bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 translate-y-0"
                        : "bg-white/5 text-muted-foreground cursor-not-allowed"
                )}
            >
                {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Post Pulse
                    </>
                )}
            </button>
        </div>
    );
};

// --- Sub-components ---
const ActivityCard = memo(({ activity, userRole, onReact, onComment }: {
    activity: Activity;
    userRole: string;
    onReact: (id: string, e: string) => void;
    onComment: (id: string, t: string) => void;
}) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const isMe = activity.sender === userRole;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all hover:bg-white/[0.05] hover:border-white/20",
                isMe ? "border-primary/20" : "border-pink-500/20"
            )}
        >
            <div className="p-6 md:p-8">
                {/* User Info */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-white/10 shadow-xl",
                            isMe ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-pink-500 to-rose-600"
                        )}>
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-white tracking-tight">{isMe ? "You" : activity.sender}</p>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase font-black tracking-widest">
                                <Clock className="w-3 h-3" />
                                {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <div className="relative">
                        <Quote className="absolute -left-2 -top-2 w-8 h-8 text-primary/10 rotate-180" />
                        <p className="text-lg md:text-xl font-medium text-white leading-relaxed pl-6">
                            {activity.text}
                        </p>
                    </div>

                    {activity.imageUrl && (
                        <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden ring-1 ring-white/10 shadow-2xl group/img">
                            <img
                                src={activity.imageUrl}
                                alt="Activity"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        </div>
                    )}
                </div>

                {/* Footer / Stats */}
                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {["❤️", "🔥", "✨", "😮"].map((emoji) => (
                                <button
                                    key={emoji}
                                    onClick={() => onReact(activity.id, emoji)}
                                    className="w-10 h-10 rounded-full bg-zinc-900 border-2 border-zinc-950 flex items-center justify-center text-lg hover:scale-125 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-black/40"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        {activity.reactions?.length > 0 && (
                            <span className="ml-2 text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                                {activity.reactions.length}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all active:scale-95 group"
                    >
                        <MessageSquare className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-white">{activity.comments?.length || 0} Comments</span>
                    </button>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                    {showComments && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-4 overflow-hidden"
                        >
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {activity.comments?.map((comment) => (
                                    <div key={comment.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-primary uppercase tracking-widest">{comment.user}</span>
                                            <span className="text-[10px] text-muted-foreground uppercase">{new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="text-sm text-white/80">{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onComment(activity.id, commentText);
                                            setCommentText("");
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        onComment(activity.id, commentText);
                                        setCommentText("");
                                    }}
                                    className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
});

ActivityCard.displayName = "ActivityCard";
