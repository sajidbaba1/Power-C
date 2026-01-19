import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export async function sendMoodEmail(to: string, partnerName: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials missing. Email not sent.");
        return;
    }

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `❤️ ${partnerName} is missing you!`,
        text: `Hey, ${partnerName} just changed their mood to "Missing You" on Power Couple. Go check in on them!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #ed64a6; text-align: center;">❤️ Missed You!</h1>
                <p style="font-size: 16px; color: #4a5568;">Hey there,</p>
                <p style="font-size: 16px; color: #4a5568;"><strong>${partnerName}</strong> just changed their mood to <span style="color: #ed64a6; font-weight: bold;">"Missing You"</span> on your Power Couple dashboard.</p>
                <p style="font-size: 16px; color: #4a5568;">Why not send them a sweet message or a virtual hug?</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #ed64a6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Mood email sent to ${to}`);
    } catch (error) {
        console.error("Failed to send mood email:", error);
    }
}

export async function sendActivityEmail(to: string, partnerName: string, type: "reaction" | "comment", activityText: string, emojiOrComment?: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials missing. Email not sent.");
        return;
    }

    const title = type === "reaction" ? "New Reaction!" : "New Comment!";
    const subject = type === "reaction"
        ? `❤️ ${partnerName} reacted to your activity!`
        : `💬 ${partnerName} commented on your activity!`;

    const content = type === "reaction"
        ? `<strong>${partnerName}</strong> reacted with <span style="font-size: 24px;">${emojiOrComment}</span> to: "${activityText}"`
        : `<strong>${partnerName}</strong> commented: "${emojiOrComment}" on: "${activityText}"`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #6366f1; text-align: center;">${title}</h1>
                <p style="font-size: 16px; color: #4a5568;">Hey there,</p>
                <p style="font-size: 16px; color: #4a5568;">${content}</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Dashboard</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Activity ${type} email sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send ${type} email:`, error);
    }
}

export async function sendNewMessageEmail(to: string, partnerName: string, messagePreview: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `💌 New message from ${partnerName}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #ec4899; text-align: center;">💌 New Message!</h1>
                <p style="font-size: 16px; color: #4a5568;"><strong>${partnerName}</strong> sent you a message:</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="font-size: 14px; color: #1f2937; font-style: italic;">"${messagePreview.substring(0, 100)}${messagePreview.length > 100 ? '...' : ''}"</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #ec4899; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reply Now</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send message email:", error);
    }
}

export async function sendLoveNoteEmail(to: string, partnerName: string, noteContent: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `💖 ${partnerName} added a Love Note!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #f472b6; text-align: center;">💖 New Love Note!</h1>
                <p style="font-size: 16px; color: #4a5568;"><strong>${partnerName}</strong> posted a love note on your wall:</p>
                <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #ec4899;">
                    <p style="font-size: 16px; color: #831843; font-weight: 500;">${noteContent}</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #ec4899; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Love Wall</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send love note email:", error);
    }
}

export async function sendMilestoneEmail(to: string, partnerName: string, milestoneTitle: string, milestoneDate: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `📅 ${partnerName} added a Milestone!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #8b5cf6; text-align: center;">📅 New Milestone!</h1>
                <p style="font-size: 16px; color: #4a5568;"><strong>${partnerName}</strong> added a new milestone:</p>
                <div style="background: #f5f3ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
                    <h3 style="color: #6d28d9; margin: 0 0 10px 0;">${milestoneTitle}</h3>
                    <p style="color: #7c3aed; font-weight: 600; margin: 0;">📆 ${new Date(milestoneDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Journey</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send milestone email:", error);
    }
}

export async function sendJarNoteEmail(to: string, partnerName: string, noteContent: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `🏺 ${partnerName} added to the Gratitude Jar!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #f59e0b; text-align: center;">🏺 New Jar Note!</h1>
                <p style="font-size: 16px; color: #4a5568;"><strong>${partnerName}</strong> added a gratitude note:</p>
                <div style="background: #fef3c7; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 16px; color: #78350f; font-weight: 500;">${noteContent}</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Jar</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send jar note email:", error);
    }
}

export async function sendHugKissEmail(to: string, partnerName: string, type: "hug" | "kiss") {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const emoji = type === "hug" ? "🤗" : "💋";
    const title = type === "hug" ? "Huge Hug" : "Big Kiss";
    const color = type === "hug" ? "#3b82f6" : "#ec4899";

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `${emoji} ${partnerName} sent you a ${title}!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: ${color}; text-align: center; font-size: 48px;">${emoji}</h1>
                <h2 style="color: ${color}; text-align: center;">A ${title} from ${partnerName}!</h2>
                <p style="font-size: 16px; color: #4a5568; text-align: center;">Your partner is thinking of you! ❤️</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: ${color}; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Send One Back</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Failed to send ${type} email:`, error);
    }
}

export async function sendSecretUnlockedEmail(to: string, partnerName: string, messagePreview: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `🔓 Secret message from ${partnerName} unlocked!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #f59e0b; text-align: center;">🔓 Secret Unlocked!</h1>
                <p style="font-size: 16px; color: #4a5568;">A secret message from <strong>${partnerName}</strong> is now unlocked!</p>
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; margin: 20px 0; border: 2px dashed #f59e0b;">
                    <p style="font-size: 14px; color: #78350f; text-align: center; font-style: italic;">"${messagePreview.substring(0, 80)}..."</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Read Full Message</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send secret unlocked email:", error);
    }
}

export async function sendMessageReactionEmail(to: string, partnerName: string, emoji: string, messagePreview: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `${emoji} ${partnerName} reacted to your message!`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                <h1 style="color: #6366f1; text-align: center; font-size: 48px;">${emoji}</h1>
                <p style="font-size: 16px; color: #4a5568;"><strong>${partnerName}</strong> reacted to your message:</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="font-size: 14px; color: #1f2937; font-style: italic;">"${messagePreview.substring(0, 80)}..."</p>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Chat</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send reaction email:", error);
    }
}
