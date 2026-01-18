import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const { from, toEmail, mood } = await req.json();

        if (!toEmail || !from || !mood) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const htmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px 20px;">
                <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <div style="background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); padding: 32px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">Power Couple</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Mood Notification</p>
                    </div>
                    
                    <div style="padding: 32px; text-align: center;">
                        <div style="font-size: 64px; margin-bottom: 16px;">🥺</div>
                        <p style="font-size: 18px; color: #1e293b; margin-bottom: 24px;">
                            Hey there! <strong>${from}</strong> just updated their mood to:
                        </p>
                        <div style="display: inline-block; background-color: #fce7f3; color: #be185d; padding: 12px 24px; border-radius: 9999px; font-size: 20px; font-weight: 800; margin-bottom: 32px; border: 2px solid #f9a8d4;">
                            ${mood}
                        </div>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.6;">
                            It looks like your partner is missing you! Why don't you send them a message or a hug in the app?
                        </p>
                        
                        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://power-couple.vercel.app'}" style="display: inline-block; background: #6366f1; color: white; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px shadow: 0 4px 6px rgba(99, 102, 241, 0.2);"> Go to Dashboard ❤️ </a>
                        </div>
                    </div>
                </div>
                
                <p style="text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;">
                    Sent with love from Power Couple.<br/>
                    Always connected, no matter the distance.
                </p>
            </div>
        `;

        if (!resend) {
            console.log("Resend API Key not set. Simulating mood notification email to:", toEmail);
            console.log("From:", from, "Mood:", mood);
            return NextResponse.json({ success: true, simulated: true });
        }

        await resend.emails.send({
            from: 'Power Couple <onboarding@resend.dev>',
            to: [toEmail],
            subject: `🥺 ${from} is feeling ${mood}...`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Mood notify error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
