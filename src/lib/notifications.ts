import webPush from 'web-push';
import { getPrisma } from './db';
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

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

        // Fetch profile for Expo Push Token
        const profile = await prisma.profile.findUnique({
            where: { role: targetRole }
        });

        if (profile?.expoPushToken && Expo.isExpoPushToken(profile.expoPushToken)) {
            await expo.sendPushNotificationsAsync([
                {
                    to: profile.expoPushToken,
                    title,
                    body,
                    data: { url },
                    sound: 'default',
                    priority: 'high',
                }
            ]);
            console.log(`Expo push notification sent to ${targetRole}`);
        }

        // Web Push Subscriptions
        const subscriptions = await prisma.pushSubscription.findMany({
            where: { userId: targetRole }
        });

        if (subscriptions.length > 0) {
            const payload = JSON.stringify({ title, body, url, icon: '/icon.jpg' });
            const promises = subscriptions.map(sub =>
                webPush.sendNotification({
                    endpoint: sub.endpoint,
                    keys: { p256dh: sub.p256dh, auth: sub.auth }
                }, payload).catch(async err => {
                    if (err.statusCode === 410 || err.statusCode === 404) {
                        await prisma.pushSubscription.delete({ where: { id: sub.id } });
                    }
                })
            );
            await Promise.all(promises);
            console.log(`Web push notifications sent to ${targetRole}`);
        }
    } catch (error) {
        console.error('Error sending push notifications:', error);
    }
}
