import { useState, useRef, useCallback, useEffect } from "react";
import { getPusherClient } from "@/lib/pusher";

export function useChat(activeChat: string, userRole: string) {
    const [messages, setMessages] = useState<Record<string, any[]>>({
        [userRole === 'sajid' ? 'nasywa' : 'sajid']: [],
        admin: []
    });
    const [isOtherTyping, setIsOtherTyping] = useState(false);
    const lastFireworkId = useRef<string | null>(null);

    // Initial Fetch
    useEffect(() => {
        const fetchInitialMessages = async () => {
            try {
                // Determine user1/user2 order based on role or simple convention
                // Ideally API should handle "me" vs "other" but for now stick to current params
                const user1 = userRole;
                const user2 = activeChat;
                const res = await fetch(`/api/messages?user1=${user1}&user2=${user2}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMessages((prev) => ({ ...prev, [activeChat]: data }));
                }
            } catch (e) {
                console.error("Initial fetch failed", e);
            }
        };
        fetchInitialMessages();
    }, [activeChat, userRole]);

    // Pusher Listeners
    useEffect(() => {
        const pusher = getPusherClient();
        if (!pusher || !process.env.NEXT_PUBLIC_PUSHER_KEY) return;

        const sorted = [userRole, activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        const channel = pusher.subscribe(chatKey);

        const handleNewMessage = (newMessage: any) => {
            if (newMessage.type === "heart_firework" && newMessage.id !== lastFireworkId.current) {
                lastFireworkId.current = newMessage.id;
                // Dispatch event or callback for UI effect?
                // For now, let's expose a boolean or event listener for the dashboard to pick up
                window.dispatchEvent(new CustomEvent('trigger-firework', { detail: newMessage.text }));
            }

            setMessages((prev) => {
                const chatMessages = prev[activeChat] || [];
                const existingIndex = chatMessages.findIndex(m => m.id === newMessage.id);

                if (existingIndex !== -1) {
                    const existing = chatMessages[existingIndex];
                    if (newMessage.sender === userRole) {
                        const shouldUpdate =
                            (!existing.translation && newMessage.translation) ||
                            (existing.status !== newMessage.status) ||
                            (JSON.stringify(existing.reactions) !== JSON.stringify(newMessage.reactions));

                        if (!shouldUpdate) return prev;

                        const merged = {
                            ...existing,
                            ...newMessage,
                            translation: newMessage.translation || existing.translation,
                            wordBreakdown: newMessage.wordBreakdown || existing.wordBreakdown
                        };
                        const newChat = [...chatMessages];
                        newChat[existingIndex] = merged;
                        return { ...prev, [activeChat]: newChat };
                    }
                    const newChat = [...chatMessages];
                    newChat[existingIndex] = newMessage;
                    return { ...prev, [activeChat]: newChat };
                }

                return { ...prev, [activeChat]: [...chatMessages, newMessage] };
            });
        };

        const handleMessageDeleted = ({ messageId }: { messageId: string }) => {
            setMessages((prev) => ({
                ...prev,
                [activeChat]: (prev[activeChat] || []).filter(m => m.id !== messageId)
            }));
        };

        const handleMessageEdited = ({ messageId, text }: { messageId: string, text: string }) => {
            setMessages((prev) => ({
                ...prev,
                [activeChat]: (prev[activeChat] || []).map(m => m.id === messageId ? { ...m, text, status: "edited" } : m)
            }));
        };

        const handleTyping = (data: { user: string, isTyping: boolean }) => {
            if (data.user !== userRole) setIsOtherTyping(data.isTyping);
        };

        const handleReaction = (data: { messageId: string, reactions: any[] }) => {
            setMessages(prev => {
                const chatMessages = prev[activeChat] || [];
                return {
                    ...prev,
                    [activeChat]: chatMessages.map(m =>
                        m.id === data.messageId ? { ...m, reactions: data.reactions } : m
                    )
                };
            });
        };

        const handleClearChat = () => {
            setMessages(prev => ({ ...prev, [activeChat]: [] }));
        };

        channel.bind("new-message", handleNewMessage);
        channel.bind("message-deleted", handleMessageDeleted);
        channel.bind("message-edited", handleMessageEdited);
        channel.bind("typing", handleTyping);
        channel.bind("message-reaction", handleReaction);
        channel.bind("clear-chat", handleClearChat);

        return () => {
            channel.unbind("new-message", handleNewMessage);
            channel.unbind("message-deleted", handleMessageDeleted);
            channel.unbind("message-edited", handleMessageEdited);
            channel.unbind("typing", handleTyping);
            channel.unbind("message-reaction", handleReaction);
            channel.unbind("clear-chat", handleClearChat);
        };
    }, [activeChat, userRole]);

    const sendMessage = useCallback(async (text: string, isSecretMode: boolean, secretUnlockTime?: string, type: string = "text", fileUrl?: string) => {
        const sorted = [userRole, activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        const msgId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const newMessage = {
            id: msgId,
            text,
            sender: userRole,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending" as const,
            type: isSecretMode ? "secret" : type,
            unlockAt: isSecretMode ? secretUnlockTime : undefined,
            isPinned: false,
            imageUrl: fileUrl, // Optional
            chatKey
        };

        // Optimistic update
        setMessages((prev) => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newMessage]
        }));

        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user1: userRole,
                user2: activeChat,
                message: newMessage
            })
        });

        // Trigger translation analysis or other side effects if needed (fire and forget)
        if (text) {
            (async () => {
                try {
                    const analysisRes = await fetch("/api/analyze", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ text, user1: userRole, user2: activeChat, messageId: msgId })
                    });
                    const data = await analysisRes.json();
                    setMessages((prev) => {
                        const currentChat = prev[activeChat] || [];
                        const index = currentChat.findIndex(m => m.id === msgId);
                        if (index === -1) return prev;
                        const newChat = [...currentChat];
                        newChat[index] = {
                            ...newChat[index],
                            translation: data.translation,
                            wordBreakdown: data.wordBreakdown || [],
                            status: "sent"
                        };
                        return { ...prev, [activeChat]: newChat };
                    });

                } catch (e) { console.error("Analysis failed", e); }
            })();
        }
    }, [userRole, activeChat]);

    return {
        messages: messages[activeChat] || [],
        setMessages, // Exposed for unusual manual overrides if really needed
        isOtherTyping,
        sendMessage
    };
}
