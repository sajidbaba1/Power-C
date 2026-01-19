import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Activity, MessageCircle, Heart, Info, Star, Gift, StickyNote } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Notification {
    id: string;
    type: "activity" | "reaction" | "comment" | "system" | "lovenote" | "milestone" | "jar";
    title: string;
    message: string;
    sender?: string;
    createdAt: string;
    read: boolean;
}

interface NotificationBellProps {
    userRole: "sajid" | "nasywa";
    pusherClient: any;
    onNotificationClick: (notification: Notification) => void;
}

export default function NotificationBell({ userRole, pusherClient, onNotificationClick }: NotificationBellProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasNew, setHasNew] = useState(false);

    useEffect(() => {
        if (!pusherClient) return;

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        const channel = pusherClient.subscribe(chatKey);

        channel.bind("partner-notification", (data: any) => {
            // Only show if the sender is not the current user
            if (data.sender !== userRole) {
                const newNotification: Notification = {
                    id: Math.random().toString(36).substring(7),
                    type: data.type || "system",
                    title: data.title || "Notification",
                    message: data.message || "",
                    sender: data.sender,
                    createdAt: data.createdAt || new Date().toISOString(),
                    read: false
                };

                setNotifications(prev => [newNotification, ...prev].slice(0, 20));
                setHasNew(true);
            }
        });

        return () => {
            pusherClient.unsubscribe(chatKey);
        };
    }, [pusherClient, userRole]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setHasNew(false);
    };

    const handleNotificationClick = (n: Notification) => {
        // Mark as read
        setNotifications(prev => prev.map(notif =>
            notif.id === n.id ? { ...notif, read: true } : notif
        ));
        // Trigger external action
        onNotificationClick(n);
        // Close menu
        setIsOpen(false);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setHasNew(false);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "activity": return <Activity className="w-4 h-4 text-blue-400" />;
            case "reaction": return <Heart className="w-4 h-4 text-pink-400 fill-current" />;
            case "comment": return <MessageCircle className="w-4 h-4 text-green-400" />;
            case "milestone": return <Star className="w-4 h-4 text-yellow-400 fill-current" />;
            case "jar": return <Gift className="w-4 h-4 text-purple-400" />;
            case "lovenote": return <StickyNote className="w-4 h-4 text-orange-400" />;
            default: return <Info className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={toggleOpen}
                className={cn(
                    "p-2 rounded-xl transition-all relative group",
                    isOpen ? "bg-primary/20 text-primary" : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"
                )}
            >
                <Bell className={cn("w-5 h-5", hasNew && "animate-bounce")} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-card" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
                        />

                        {/* Notification Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.3, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.3, y: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed top-20 right-4 w-[calc(100vw-2rem)] sm:w-80 bg-card/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[1000] overflow-hidden flex flex-col max-h-[70vh]"
                        >
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <h3 className="font-bold text-sm">Notifications</h3>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllRead}
                                            className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Clear
                                        </button>
                                    )}
                                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                {notifications.length === 0 ? (
                                    <div className="py-8 flex flex-col items-center justify-center text-muted-foreground text-center">
                                        <Bell className="w-8 h-8 mb-2 opacity-10" />
                                        <p className="text-xs">All caught up!</p>
                                    </div>
                                ) : (
                                    notifications.map(n => (
                                        <button
                                            key={n.id}
                                            onClick={() => handleNotificationClick(n)}
                                            className={cn(
                                                "w-full text-left p-3 rounded-xl transition-all flex gap-3 items-start hover:bg-white/5",
                                                !n.read && "bg-white/5 border border-white/5"
                                            )}
                                        >
                                            <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-white/5">
                                                {getIcon(n.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <span className="font-bold text-xs truncate">{n.title}</span>
                                                    <span className="text-[9px] text-muted-foreground">
                                                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">{n.message}</p>
                                            </div>
                                            {!n.read && <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                                        </button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
