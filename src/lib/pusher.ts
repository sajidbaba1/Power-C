import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// Server-side Pusher instance
export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
    useTLS: true,
});

// Client-side Pusher instance
let pusherClient: PusherClient | null = null;

export const getPusherClient = () => {
    if (typeof window === 'undefined') return null as any; // Safe for SSR

    if (!pusherClient) {
        pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
        });
    }
    return pusherClient;
};
