import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL,
        pass: APP_PASSWORD
    }
});

// Define the email content
const mailOptions = (email) => ({
    from: {
        name: "Mera Store Support",
        address: USER_EMAIL
    },
    to: email,
    subject: 'Password Reset Request',
    html: `
        <p>Hello,</p>
        <p>You've requested a password reset for your MeraStore account. To reset your password, click the link below:</p>
        <p><a href="${process.env.CLIENT_URL}">Reset Your Password</a></p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>MeraStore Support</p>
    `
});

export { transporter, mailOptions };
