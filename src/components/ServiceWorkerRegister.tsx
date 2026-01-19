"use client";

import { useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default function ServiceWorkerRegister({ userRole }: { userRole: string }) {
    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {

            const register = async () => {
                try {
                    const swReg = await navigator.serviceWorker.register("/sw.js");
                    console.log("Service Worker registered", swReg);

                    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
                    if (!publicKey) {
                        console.error("VAPID public key not found");
                        return;
                    }

                    // Ask for permission and subscribe
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        const subscription = await swReg.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(publicKey)
                        });

                        // Send to backend
                        await fetch('/api/notifications/subscribe', {
                            method: 'POST',
                            body: JSON.stringify({ subscription, userId: userRole }),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        console.log("Push Subscribed for", userRole);
                    }
                } catch (error) {
                    console.error("Service Worker Error", error);
                }
            };

            register();
        }
    }, [userRole]);

    return null;
}
