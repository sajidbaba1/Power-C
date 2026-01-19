import webPush from 'web-push';
import { getPrisma } from './db';

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webPush.setVapidDetails(
        process.env.VAPID_SUBJECT || 'mailto:ss2727303@gmail.com',
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
}

export async function sendPushNotification(targetRole: string, title: string, body: string, url: string = '/') {
    try {
        const prisma = getPrisma();
        // Since we identify users by role 'sajid' or 'nasywa'
        const subscriptions = await prisma.pushSubscription.findMany({
            where: { userId: targetRole }
        });

        if (subscriptions.length === 0) {
            console.log(`No active push subscriptions for ${targetRole}`);
            return;
        }

        const payload = JSON.stringify({
            title,
            body,
            url,
            icon: '/icon.jpg'
        });

        const promises = subscriptions.map(sub =>
            webPush.sendNotification({
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth
                }
            }, payload).catch(async err => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    // Subscription expired, delete it
                    await prisma.pushSubscription.delete({ where: { id: sub.id } });
                }
                console.error(`Error sending to subscription ${sub.id}:`, err);
            })
        );

        await Promise.all(promises);
        console.log(`Push notifications sent to ${targetRole}`);
    } catch (error) {
        console.error('Error sending push notifications:', error);
    }
}
