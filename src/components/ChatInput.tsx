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
            {/* Secret Mode Status Bar - More compact on mobile */}
            <AnimatePresence>
                {isSecretMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mx-2 lg:mx-4 mb-2 p-2 lg:p-3 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-2xl flex items-center justify-between gap-2 lg:gap-4 shadow-lg shadow-amber-500/5"
                    >
                        <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                                <Lock className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] lg:text-[10px] uppercase font-black tracking-widest text-amber-500 truncate">Secret Mode Active</p>
                                <p className="text-[10px] lg:text-xs font-bold text-amber-500/70 truncate">Unlocked at {secretUnlockTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-2 shrink-0">
                            <input
                                type="time"
                                value={secretUnlockTime}
                                onChange={(e) => setSecretUnlockTime(e.target.value)}
                                className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1 text-xs lg:text-sm font-bold text-amber-500 outline-none focus:ring-2 focus:ring-amber-500/50 w-24"
                            />
                            <button
                                onClick={() => setIsSecretMode(false)}
                                className="p-1 hover:bg-amber-500/20 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4 text-amber-500" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Input Container - Better safe area and padding */}
            <div className="px-2 pb-safe pt-2 lg:p-6 bg-card/50 backdrop-blur-xl border-t border-white/5 relative z-20">
                {/* Replying To Preview - Integrated better */}
                <AnimatePresence>
                    {replyingTo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute bottom-full left-2 right-2 lg:left-6 lg:right-6 mb-3 p-3 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between gap-3 shadow-2xl z-30"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1 h-3 bg-primary rounded-full" />
                                    <p className="text-[10px] uppercase font-black tracking-widest text-primary">Replying to</p>
                                </div>
                                <p className="text-xs font-medium truncate opacity-70 italic pl-3">"{replyingTo.text}"</p>
                            </div>
                            <button onClick={onCancelReply} className="p-1.5 hover:bg-white/10 rounded-xl transition-colors shrink-0">
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative flex items-end gap-2 lg:gap-4 max-w-6xl mx-auto w-full">
                    {/* Action Buttons & Textarea wrapper */}
                    <div className="flex-1 relative bg-white/5 border border-white/10 rounded-[2rem] flex items-end p-1.5 lg:p-2 transition-all focus-within:border-primary/50 focus-within:bg-white/10 shadow-inner group overflow-hidden">

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
                                        <ImageIcon className="w-5 h-5 lg:w-5 lg:h-5" />
                                    </button>
                                    <div className="w-[1px] h-5 lg:h-6 bg-white/10 mx-0.5" />
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
                            <Plus className="w-5 h-5 lg:w-5 lg:h-5 transition-transform" />
                        </button>

                        <AnimatePresence>
                            {showMoreActions && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute bottom-[calc(100%+16px)] left-0 bg-zinc-900 border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col gap-1 z-50 min-w-[160px]"
                                >
                                    <button onClick={() => { onShowStickers(); setShowMoreActions(false); }} className="p-3 hover:bg-white/5 rounded-xl flex items-center gap-3"><Smile className="w-5 h-5 text-yellow-400" /><span className="text-xs font-bold font-inter">Stickers</span></button>
                                    <button onClick={() => { onShowDrawing(); setShowMoreActions(false); }} className="p-3 hover:bg-white/5 rounded-xl flex items-center gap-3"><Palette className="w-5 h-5 text-indigo-400" /><span className="text-xs font-bold font-inter">Draw</span></button>

                                    {/* Big Hug & Big Kiss */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            onSend("🤗 BIG HUG! 🤗", false);
                                            setShowMoreActions(false);
                                        }}
                                        className="p-3 hover:bg-blue-500/10 rounded-xl flex items-center gap-3 group bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20"
                                    >
                                        <Ghost className="w-5 h-5 text-blue-500 group-hover:scale-125 transition-transform" />
                                        <span className="text-xs font-bold font-inter text-blue-400">BIG HUG</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            onSend("💋 BIG KISS! 💋", false);
                                            setShowMoreActions(false);
                                        }}
                                        className="p-3 hover:bg-pink-500/10 rounded-xl flex items-center gap-3 group bg-gradient-to-r from-pink-500/5 to-rose-500/5 border border-pink-500/20"
                                    >
                                        <Flame className="w-5 h-5 text-pink-500 group-hover:scale-125 transition-transform" />
                                        <span className="text-xs font-bold font-inter text-pink-400">BIG KISS</span>
                                    </motion.button>

                                    {/* Love You Rocket Animations */}
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => {
                                            onSend("Love You Nasywa ❤️🚀", false);
                                            setShowMoreActions(false);
                                        }}
                                        className="p-3 hover:bg-rose-500/10 rounded-xl flex items-center gap-3 group bg-gradient-to-r from-rose-500/5 to-red-500/5 border border-rose-500/20"
                                    >
                                        <Heart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform animate-pulse" />
                                        <span className="text-xs font-bold font-inter text-rose-400">Love You Nasywa 🚀</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => {
                                            onSend("Love You Sajid ❤️🚀", false);
                                            setShowMoreActions(false);
                                        }}
                                        className="p-3 hover:bg-indigo-500/10 rounded-xl flex items-center gap-3 group bg-gradient-to-r from-indigo-500/5 to-blue-500/5 border border-indigo-500/20"
                                    >
                                        <Heart className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform animate-pulse" />
                                        <span className="text-xs font-bold font-inter text-indigo-400">Love You Sajid 🚀</span>
                                    </motion.button>

                                    <motion.button whileHover={{ x: 5 }} onClick={() => { onSendHug(); setShowMoreActions(false); }} className="p-3 hover:bg-blue-500/10 rounded-xl flex items-center gap-3 group"><Ghost className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" /><span className="text-xs font-bold font-inter">Send Hug</span></motion.button>
                                    <motion.button whileHover={{ x: 5 }} onClick={() => { onSendKiss(); setShowMoreActions(false); }} className="p-3 hover:bg-pink-500/10 rounded-xl flex items-center gap-3 group"><Flame className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" /><span className="text-xs font-bold font-inter">Send Kiss</span></motion.button>
                                    <button
                                        onClick={() => { setIsSecretMode(!isSecretMode); setShowMoreActions(false); }}
                                        className={cn("p-3 rounded-xl flex items-center gap-3", isSecretMode ? "bg-amber-500/20 text-amber-500" : "hover:bg-white/5")}
                                    >
                                        {isSecretMode ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                        <span className="text-xs font-bold font-inter">Secret Mode</span>
                                    </button>
                                    <button onClick={() => { onSendHeartFirework(); setShowMoreActions(false); }} className="p-3 hover:bg-red-500/10 rounded-xl flex items-center gap-3"><Heart className="w-5 h-5 text-red-500" /><span className="text-xs font-bold font-inter">Firework</span></button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => handleTextChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={replyingTo ? "Write a reply..." : `Message ${activeChat}...`}
                            className="flex-1 bg-transparent border-none outline-none text-[15px] lg:text-base px-1 lg:px-4 min-w-0 resize-none overflow-y-auto leading-relaxed py-2 custom-scrollbar"
                            rows={1}
                            style={{ minHeight: '40px', maxHeight: '150px' }}
                        />

                        <button
                            onClick={onStartRecording}
                            className={cn(
                                "p-2 lg:p-3 hover:bg-white/10 rounded-full transition-all shrink-0",
                                isRecording ? "text-red-500 animate-pulse bg-red-500/10" : "text-muted-foreground"
                            )}
                        >
                            <Mic className="w-5 h-5 lg:w-5 lg:h-5" />
                        </button>
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!text.trim()}
                        className={cn(
                            "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all shadow-xl shrink-0",
                            text.trim()
                                ? "bg-primary text-white scale-100 hover:scale-105 active:scale-95 shadow-primary/30"
                                : "bg-white/5 text-white/20 scale-90 cursor-not-allowed shadow-none"
                        )}
                    >
                        <Send className={cn("w-5 h-5 lg:w-6 lg:h-6", text.trim() ? "translate-x-0.5" : "")} />
                    </button>
                </div>
            </div>
        </div >
    );
}
