import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, RotateCcw, MapPin, Lock, Check, CheckCheck, Pencil, Trash2, Copy, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useRef, memo } from "react";

interface MessageBubbleProps {
    msg: any;
    userRole: string; // 'sajid' or 'nasywa'
    activeChat: string; // The ID of the person we are talking to
    senderProfile: any; // Profile of the SENDER
    parentMessage?: any; // The message this is replying to (if any)
    isActive: boolean;
    setActiveMessageActions: (id: string | null) => void;
    setReplyingTo: (msg: any) => void;
    onReact: (msgId: string, emoji: string) => void;
    onPin: (msgId: string, isPinned: boolean) => void;
    onImageClick: (url: string) => void;
    onDelete?: (msgId: string) => void;
    onEdit?: (msgId: string, text: string) => void;
    onDeleteForEveryone?: (msgId: string) => void;
}

const MessageBubble = memo(({
    msg,
    userRole,
    activeChat,
    senderProfile,
    parentMessage,
    isActive,
    setActiveMessageActions,
    setReplyingTo,
    onReact,
    onPin,
    onImageClick,
    onDelete,
    onEdit,
    onDeleteForEveryone
}: MessageBubbleProps) => {
    const longPressTimer = useRef<any>(null);

    const isUnlocked = () => {
        if (msg.type !== "secret" || msg.sender === userRole) return true;
        if (!msg.unlockAt) return true;
        const now = new Date();
        const [hours, minutes] = msg.unlockAt.split(':').map(Number);
        const unlockTime = new Date();
        unlockTime.setHours(hours, minutes, 0, 0);
        return now >= unlockTime;
    };

    const isMe = msg.sender === userRole;

    const handleCopy = () => {
        navigator.clipboard.writeText(msg.text);
        setActiveMessageActions(null);
        // Could add a toast here if available
    };

    return (
        <motion.div
            layout // Enable layout animation for smooth sorting/updates
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 100 }}
            dragElastic={0.4}
            dragSnapToOrigin={true}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
            onDragEnd={(_, info) => {
                if (info.offset.x > 50) {
                    setReplyingTo(msg);
                    if ('vibrate' in navigator) navigator.vibrate(20);
                }
            }}
            className={cn(
                "flex gap-3 max-w-[85%] lg:max-w-[75%]",
                isMe ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
            )}
        >
            {/* Avatar */}
            <div className={cn(
                "w-8 h-8 rounded-xl shrink-0 flex items-center justify-center overflow-hidden border border-white/10 shadow-lg relative",
                isMe ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-pink-500 to-rose-600"
            )}>
                {senderProfile?.avatarUrl ? (
                    <Image
                        src={senderProfile.avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover"
                        sizes="32px"
                    />
                ) : (
                    <User className="w-4 h-4 text-white" />
                )}
            </div>

            <div className={cn("flex flex-col gap-1 relative min-w-0", isMe ? "items-end" : "items-start")}>
                {/* Reply Context */}
                {msg.parentId && parentMessage && (
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1 px-2 max-w-full truncate">
                        <RotateCcw className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">Replied to: {parentMessage.text}</span>
                    </div>
                )}

                {/* Bubble */}
                <div
                    className={cn(
                        "p-3 lg:p-4 rounded-2xl transition-all relative group/msg cursor-pointer lg:cursor-default max-w-full overflow-hidden touch-manipulation",
                        isMe
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 rounded-tr-none border border-primary/20 shadow-[0_4px_20px_rgba(59,130,246,0.1)] hover:border-primary/40"
                            : "bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-tl-none border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-white/20",
                        msg.isPinned && "border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
                        isActive && "ring-2 ring-primary/50"
                    )}
                    onTouchStart={() => {
                        if (longPressTimer.current) clearTimeout(longPressTimer.current);
                        longPressTimer.current = window.setTimeout(() => {
                            setActiveMessageActions(msg.id);
                            if ('vibrate' in navigator) navigator.vibrate(50);
                        }, 500);
                    }}
                    onTouchEnd={() => {
                        if (longPressTimer.current) clearTimeout(longPressTimer.current);
                    }}
                    onMouseDown={() => {
                        if (longPressTimer.current) clearTimeout(longPressTimer.current);
                        longPressTimer.current = window.setTimeout(() => {
                            setActiveMessageActions(msg.id);
                        }, 500);
                    }}
                    onMouseUp={() => {
                        if (longPressTimer.current) clearTimeout(longPressTimer.current);
                    }}
                    onMouseLeave={() => {
                        if (longPressTimer.current) clearTimeout(longPressTimer.current);
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setActiveMessageActions(msg.id);
                    }}
                >
                    {/* Swipe Reply Icon */}
                    <motion.div
                        className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-drag:opacity-100"
                        style={{ x: -20 }}
                    >
                        <RotateCcw className="w-5 h-5 text-primary" />
                    </motion.div>

                    {/* Pin Indicator */}
                    {msg.isPinned && (
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-background z-20">
                            <MapPin className="w-3 h-3 text-white" />
                        </div>
                    )}

                    {/* Action Menu */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className={cn(
                                    "absolute bottom-full mb-3 flex flex-col gap-2 bg-card/95 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl z-[100] min-w-[200px]",
                                    isMe ? "right-0" : "left-0"
                                )}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Reaction Row */}
                                <div className="flex gap-1 justify-between px-1 pb-1 border-b border-white/10">
                                    {["❤️", "😂", "😮", "🔥", "😢", "💯"].map(emoji => (
                                        <button
                                            key={emoji}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onReact(msg.id, emoji);
                                                setActiveMessageActions(null);
                                            }}
                                            className="hover:scale-150 active:scale-110 transition-transform p-1 text-xl outline-none"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>

                                {/* Action List */}
                                <div className="grid grid-cols-2 gap-1 p-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMessageActions(null);
                                            setReplyingTo(msg);
                                        }}
                                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl transition-all text-xs font-bold"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Reply
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl transition-all text-xs font-bold"
                                    >
                                        <Copy className="w-4 h-4" /> Copy
                                    </button>
                                    {isMe && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit?.(msg.id, msg.text);
                                                setActiveMessageActions(null);
                                            }}
                                            className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl transition-all text-xs font-bold"
                                        >
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onPin(msg.id, !msg.isPinned);
                                            setActiveMessageActions(null);
                                        }}
                                        className={cn("flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl transition-all text-xs font-bold", msg.isPinned && "text-amber-400")}
                                    >
                                        <MapPin className="w-4 h-4" /> {msg.isPinned ? 'Unpin' : 'Pin'}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete?.(msg.id);
                                            setActiveMessageActions(null);
                                        }}
                                        className="flex items-center gap-2 p-2 hover:bg-red-500/20 text-red-500 rounded-xl transition-all text-xs font-bold"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete For Me
                                    </button>
                                    {isMe && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteForEveryone?.(msg.id);
                                                setActiveMessageActions(null);
                                            }}
                                            className="flex items-center gap-2 p-2 hover:bg-red-500/20 text-red-500 rounded-xl transition-all text-xs font-bold"
                                        >
                                            <Trash className="w-4 h-4" /> Delete For Everyone
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Content */}
                    <div className="text-lg lg:text-[22px] break-words leading-relaxed font-semibold">
                        {msg.imageUrl ? (
                            <div className="relative w-full aspect-square max-w-[300px] mb-2">
                                <Image
                                    src={msg.imageUrl}
                                    alt="Sent"
                                    fill
                                    className="rounded-xl shadow-2xl border border-white/10 cursor-pointer transition-transform hover:scale-[1.02] object-cover"
                                    onClick={() => onImageClick(msg.imageUrl)}
                                    unoptimized={msg.imageUrl.startsWith('data:')}
                                />
                            </div>
                        ) : msg.type === "sticker" ? (
                            <div className="text-6xl my-2 drop-shadow-xl">{msg.text}</div>
                        ) : msg.type === "secret" && !isUnlocked() ? (
                            <div className="flex flex-col items-center gap-2 py-6 px-10 opacity-70 select-none bg-black/20 rounded-xl border border-white/5 shadow-inner">
                                <Lock className="w-10 h-10 animate-pulse text-amber-500" />
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-center">
                                    Encrypted<br />
                                    <span className="text-amber-500 font-display">T-{msg.unlockAt}</span>
                                </p>
                            </div>
                        ) : (
                            <>
                                {msg.text}
                                {msg.translation && msg.translation.toLowerCase() !== msg.text.toLowerCase() && (
                                    <div className="mt-2 text-[14px] text-white/60 font-medium">
                                        {msg.translation}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                            {msg.reactions.map((r: any, i: number) => (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    key={i}
                                    className="text-[11px] bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                >
                                    {r.emoji}
                                </motion.span>
                            ))}
                        </div>
                    )}

                    {/* Status / Timestamp */}
                    <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[10px] opacity-50">
                            {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isMe && (
                            <div className="opacity-70">
                                {msg.status === "sending" ? (
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : msg.status === "sent" ? (
                                    <Check className="w-3 h-3" />
                                ) : (
                                    <CheckCheck className="w-3 h-3 text-blue-400" />
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
