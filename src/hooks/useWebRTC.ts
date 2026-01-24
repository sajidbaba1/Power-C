import { useState, useRef, useCallback, useEffect } from "react";
import { getPusherClient } from "@/lib/pusher";

export interface CallConfig {
    isOpen: boolean;
    type: 'audio' | 'video';
    role: 'caller' | 'receiver';
    partnerName: string;
    partnerAvatar?: string;
}

export function useWebRTC(userRole: string, activeChat: string) {
    const [callConfig, setCallConfig] = useState<CallConfig>({
        isOpen: false,
        type: 'audio',
        role: 'caller',
        partnerName: 'Partner'
    });
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const iceCandidateQueue = useRef<RTCIceCandidateInit[]>([]);

    const sendSignal = useCallback(async (type: string, data: any) => {
        const receiver = userRole === "sajid" ? "nasywa" : "sajid"; // Assuming 1:1 for now

        await fetch("/api/chat/signal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender: userRole,
                receiver: activeChat === 'admin' ? 'sajid' : activeChat, // Handle admin edge case if any, usually activeChat is 'nasywa' or 'sajid' but here activeChat is 'nasywa'
                type,
                data
            })
        });
    }, [userRole, activeChat]);

    const createPeerConnection = useCallback((type: 'audio' | 'video') => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignal('candidate', event.candidate);
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        peerConnectionRef.current = pc;
        return pc;
    }, [sendSignal]);

    const initiateCall = async (type: 'audio' | 'video', partnerProfile?: any) => {
        setCallConfig({
            isOpen: true,
            type,
            role: 'caller',
            partnerName: partnerProfile?.name || activeChat,
            partnerAvatar: partnerProfile?.avatarUrl
        });

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: type === 'video'
            });
            setLocalStream(stream);

            const pc = createPeerConnection(type);
            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            await sendSignal('call-invite', { type });
            await sendSignal('offer', offer);
        } catch (err) {
            console.error("Call initiation failed:", err);
            alert("Could not access camera/microphone");
            setCallConfig(prev => ({ ...prev, isOpen: false }));
        }
    };

    const handleAcceptCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: callConfig.type === 'video'
            });
            setLocalStream(stream);

            const pc = createPeerConnection(callConfig.type);
            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            const offer = (window as any).pendingOffer;
            if (offer) {
                await pc.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSignal('answer', answer);
                (window as any).pendingOffer = null;

                // Flush buffered candidates
                while (iceCandidateQueue.current.length > 0) {
                    const candidate = iceCandidateQueue.current.shift();
                    if (candidate) {
                        await pc.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                }
            }
        } catch (err) {
            console.error("Failed to accept call:", err);
            handleHangup();
        }
    };

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        (window as any).pendingOffer = offer;
        // If we are already in a call (re-negotiation), apply immediately
        if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            sendSignal('answer', answer);
        }
    };

    const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
        if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));

            while (iceCandidateQueue.current.length > 0) {
                const candidate = iceCandidateQueue.current.shift();
                if (candidate) {
                    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                }
            }
        }
    };

    const handleCandidate = async (candidate: RTCIceCandidateInit) => {
        const pc = peerConnectionRef.current;
        if (pc && pc.remoteDescription && pc.remoteDescription.type) {
            try {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error("Error adding ice candidate", e);
            }
        } else {
            iceCandidateQueue.current.push(candidate);
        }
    };

    const handleDeclineCall = () => {
        sendSignal('call-decline', {});
        setCallConfig(prev => ({ ...prev, isOpen: false }));
    };

    const handleHangup = useCallback((shouldSignal = true) => {
        if (shouldSignal) sendSignal('hangup', {});

        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        setRemoteStream(null);
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        setCallConfig(prev => ({ ...prev, isOpen: false }));
    }, [localStream, sendSignal]);

    // Pusher Listener for Call Signal Events
    useEffect(() => {
        const pusher = getPusherClient();
        if (!pusher) return;

        const sorted = [userRole, activeChat].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        const channel = pusher.subscribe(chatKey);

        channel.bind("signal", async (data: any) => {
            if (data.receiver !== userRole) return;

            switch (data.type) {
                case "call-invite":
                    setCallConfig({
                        isOpen: true,
                        type: data.data.type,
                        role: "receiver",
                        partnerName: activeChat.charAt(0).toUpperCase() + activeChat.slice(1), // Simple capitalization
                    });

                    // Ringtone (optional, basic beep for now if we don't have audio file)
                    // const audio = new Audio('/sounds/ringtone.mp3');
                    // audio.play().catch(() => {});
                    break;

                case "offer":
                    await handleOffer(data.data);
                    break;

                case "answer":
                    await handleAnswer(data.data);
                    break;

                case "candidate":
                    await handleCandidate(data.data);
                    break;

                case "call-decline":
                    alert("Call declined");
                    setCallConfig((prev) => ({ ...prev, isOpen: false }));
                    break;

                case "hangup":
                    handleHangup(false); // Don't signal back
                    break;
            }
        });

        return () => {
            channel.unbind("signal");
            // Don't unsubscribe here if other components use the same channel, 
            // but usually hooks should clean up their own listeners.
            // Since this is a shared channel, we assume other listeners might exist.
            // Good pattern is to bind/unbind specific events.
        };
    }, [userRole, activeChat, activeChat /* dependency on activeChat to refresh key */]);
    // Note: Dependencies here are tricky. If activeChat changes, we resubscribe.

    return {
        callConfig,
        setCallConfig,
        localStream,
        remoteStream,
        initiateCall,
        handleAcceptCall,
        handleDeclineCall,
        handleHangup
    };
}
