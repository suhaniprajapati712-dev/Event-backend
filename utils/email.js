const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' 
            ? 'Verify Your Eventora Account' 
            : 'Event Booking';
        
        const msg = type === 'account_verification' 
            ? 'Please use the following OTP to verify your new Eventora account and access all the features of our website.' 
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `
            <div style="background-color: #f2f2f2; padding: 20px;">
                <h1 style="color: #333333; font-size: 24px; margin-bottom: 10px;">${title}</h1>
                <p style="color: #666666; font-size: 16px; margin-bottom: 20px;">${msg}</p>
                <p style="color: #333333; font-size: 18px; font-weight: bold; margin-bottom: 10px;">OTP: ${otp}</p>
                <p style="color: #666666; font-size: 14px;">This OTP is valid for 5 minutes.</p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${userEmail} for ${type}`);
    } catch (error) {
        console.error(`Error sending OTP email to ${userEmail} for ${type}:`, error);
    }
};

exports.sendBookingEmail = async (userEmail, userName,eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmation for ${eventTitle}`,
            html: `
           <h1>Hi ${userName},</h1>
            <p>Thank you for the event <strong> ${eventTitle} </strong>is successfully comfirmed</p>
            <p>Thank you for choosing us,<br> Eventora</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending  email:', error);
    }
};