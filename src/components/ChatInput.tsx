'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Palette, Ghost, Flame, Lock, Unlock, Heart, Mic, Image as ImageIcon, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSend: (text: string, isSecret: boolean) => void;
    onTyping: (isTyping: boolean) => void;
    onStartRecording: () => void;
    onShowStickers: () => void;
    onShowDrawing: () => void;
    onSendHug: () => void;
    onSendKiss: () => void;
    onSendHeartFirework: () => void;
    onImageUpload: () => void;
    activeChat: string;
    isRecording: boolean;
    replyingTo?: any;
    onCancelReply: () => void;
    isSecretMode: boolean;
    setIsSecretMode: (val: boolean) => void;
    secretUnlockTime: string;
    setSecretUnlockTime: (val: string) => void;
}

export default function ChatInput({
    onSend,
    onTyping,
    onStartRecording,
    onShowStickers,
    onShowDrawing,
    onSendHug,
    onSendKiss,
    onSendHeartFirework,
    onImageUpload,
    activeChat,
    isRecording,
    replyingTo,
    onCancelReply,
    isSecretMode,
    setIsSecretMode,
    secretUnlockTime,
    setSecretUnlockTime
}: ChatInputProps) {
    const [text, setText] = useState("");
    const [showMoreActions, setShowMoreActions] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isTypingRef = useRef(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
        }
    }, [text]);

    const handleTextChange = (val: string) => {
        setText(val);

        if (!isTypingRef.current) {
            isTypingRef.current = true;
            onTyping(true);
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
            onTyping(false);
        }, 2000);
    };

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text, isSecretMode);
        setText("");
        if (textareaRef.current) textareaRef.current.style.height = '40px';
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Secret Mode Status Bar */}
            <AnimatePresence>
                {isSecretMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mx-4 mb-2 p-3 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-2xl flex items-center justify-between gap-4 shadow-lg shadow-amber-500/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <Lock className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-amber-500">Secret Mode Active</p>
                                <p className="text-xs font-bold text-amber-500/70">Message will unlock at:</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
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

            <div className="p-4 lg:p-6 bg-card/50 backdrop-blur-xl border-t border-white/5 relative z-20">
                {/* Replying To Preview */}
                <AnimatePresence>
                    {replyingTo && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-4 right-4 mb-2 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between gap-3 shadow-2xl"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">Replying to</p>
                                <p className="text-xs font-medium truncate opacity-70 italic">"{replyingTo.text}"</p>
                            </div>
                            <button onClick={onCancelReply} className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0">
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative flex items-end gap-2 lg:gap-4 max-w-6xl mx-auto">
                    <div className="flex-1 relative bg-white/5 border border-white/10 rounded-[2rem] flex items-end p-2 transition-all focus-within:border-primary/50 focus-within:bg-white/10 shadow-inner group">

                        <AnimatePresence initial={false}>
                            {!text && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="flex items-center overflow-hidden shrink-0"
                                >
                                    <button
                                        onClick={onImageUpload}
                                        className="p-2 lg:p-3 hover:bg-white/10 rounded-full transition-all shrink-0 text-muted-foreground"
                                    >
                                        <ImageIcon className="w-5 h-5" />
                                    </button>
                                    <div className="w-[1px] h-6 bg-white/10 mx-1" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setShowMoreActions(!showMoreActions)}
                            className={cn(
                                "p-2 lg:p-3 hover:bg-white/10 rounded-full transition-all shrink-0",
                                showMoreActions ? "bg-primary/20 text-primary rotate-45" : "text-muted-foreground"
                            )}
                        >
                            <Plus className="w-5 h-5 transition-transform" />
                        </button>

                        <AnimatePresence>
                            {showMoreActions && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                    className="absolute bottom-[calc(100%+12px)] left-0 bg-card/95 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col gap-1 z-30"
                                >
                                    <button onClick={() => { onShowStickers(); setShowMoreActions(false); }} className="p-3 hover:bg-white/5 rounded-xl flex items-center gap-3"><Smile className="w-5 h-5" /><span className="text-xs font-bold">Stickers</span></button>
                                    <button onClick={() => { onShowDrawing(); setShowMoreActions(false); }} className="p-3 hover:bg-white/5 rounded-xl flex items-center gap-3"><Palette className="w-5 h-5" /><span className="text-xs font-bold">Draw</span></button>
                                    <button onClick={() => { onSendHug(); setShowMoreActions(false); }} className="p-3 hover:bg-blue-500/10 rounded-xl flex items-center gap-3"><Ghost className="w-5 h-5 text-blue-500" /><span className="text-xs font-bold">Send Hug</span></button>
                                    <button onClick={() => { onSendKiss(); setShowMoreActions(false); }} className="p-3 hover:bg-pink-500/10 rounded-xl flex items-center gap-3"><Flame className="w-5 h-5 text-pink-500" /><span className="text-xs font-bold">Send Kiss</span></button>
                                    <button
                                        onClick={() => { setIsSecretMode(!isSecretMode); setShowMoreActions(false); }}
                                        className={cn("p-3 rounded-xl flex items-center gap-3", isSecretMode ? "bg-amber-500/20 text-amber-500" : "hover:bg-white/5")}
                                    >
                                        {isSecretMode ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                        <span className="text-xs font-bold">Secret Mode</span>
                                    </button>
                                    <button onClick={() => { onSendHeartFirework(); setShowMoreActions(false); }} className="p-3 hover:bg-red-500/10 rounded-xl flex items-center gap-3"><Heart className="w-5 h-5 text-red-500" /><span className="text-xs font-bold">Firework</span></button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => handleTextChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Message ${activeChat}...`}
                            className="flex-1 bg-transparent border-none outline-none text-sm px-2 lg:px-4 min-w-0 resize-none overflow-y-auto leading-relaxed py-2"
                            rows={1}
                            style={{ minHeight: '40px', maxHeight: '150px' }}
                        />

                        <button
                            onClick={onStartRecording}
                            className={cn(
                                "p-2 lg:p-3 hover:bg-white/10 rounded-full transition-all shrink-0",
                                isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"
                            )}
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!text.trim()}
                        className={cn(
                            "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all shadow-lg shadow-primary/20 shrink-0",
                            text.trim()
                                ? "bg-primary text-white scale-100 hover:scale-105 active:scale-95"
                                : "bg-white/5 text-white/20 scale-90 cursor-not-allowed"
                        )}
                    >
                        <Send className="w-5 h-5 lg:w-6 lg:h-6 -rotate-45 ml-1" />
                    </button>
                </div>
            </div>
        </div >
    );
}
