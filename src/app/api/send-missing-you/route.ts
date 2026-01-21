import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { sender, recipient, message } = await request.json();

        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: recipient,
            subject: `💕 ${sender} is Missing You!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px;">
                    <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                        <h1 style="color: #667eea; text-align: center; margin-bottom: 20px; font-size: 32px;">
                            💕 Someone is Missing You! 💕
                        </h1>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="font-size: 48px; margin: 0;">🥺</p>
                        </div>
                        
                        <div style="background: #f8f9ff; padding: 25px; border-radius: 10px; border-left: 4px solid #667eea; margin: 20px 0;">
                            <p style="font-size: 18px; color: #333; margin: 0; line-height: 1.6;">
                                <strong style="color: #667eea;">${sender}</strong> just sent you a message:
                            </p>
                            <p style="font-size: 20px; color: #555; margin: 15px 0 0 0; font-style: italic;">
                                "${message}"
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="font-size: 16px; color: #666; margin: 10px 0;">
                                They're thinking of you right now! ❤️
                            </p>
                            <a href="https://power-couple-3yb6xx65u-sajids-projects-6524aee0.vercel.app" 
                               style="display: inline-block; margin-top: 20px; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                💬 Reply Now
                            </a>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="font-size: 12px; color: #999; margin: 0;">
                                Sent with love from Power Couple App 💕
                            </p>
                        </div>
                    </div>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
