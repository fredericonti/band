import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// You can get this from https://dashboard.emailjs.com/admin/account
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

export const initEmailService = () => {
    emailjs.init(PUBLIC_KEY);
};

export const sendOTP = async (email, otp) => {
    try {
        const templateParams = {
            to_email: email,
            otp_code: otp,
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        return response;
    } catch (error) {
        console.error("Failed to send OTP", error);
        throw error;
    }
};
