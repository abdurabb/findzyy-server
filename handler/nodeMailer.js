const nodemailer = require('nodemailer');
const path = require('path');
// const hbs = require("nodemailer-express-handlebars");

const templatePath = path.join(__dirname, '..', 'templates');

const createTransporter = async () => {
    const hbs = (await import('nodemailer-express-handlebars')).default;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: templatePath,
            defaultLayout: false,
        },
        viewPath: templatePath,
        extName: '.handlebars',
    };

    transporter.use('compile', hbs(handlebarOptions));

    return transporter;
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// -----------------
const sendMail = async (email) => {
    const hbs = (await import('nodemailer-express-handlebars')).default;
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./public"),
            defaultLayout: false
        },
        viewPath: path.resolve("./public"),
        extName: ".handlebars"
    };

    transporter.use("compile", hbs(handlebarOptions));

    const client = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Email Verification',
        template: "email",
        context: {
            otp: otpCode,
            currentDate: currentDate
        }
    };

    try {
        await transporter.sendMail(client);
        return { success: true, otpCode: otpCode };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


// Email validation and error handling
class EmailSendError extends Error {
    constructor(message, originalError) {
        super(message);
        this.name = 'EmailSendError';
        this.originalError = originalError;
    }
}

class InvalidEmailError extends Error {
    constructor(email) {
        super(`Invalid email address: ${email}`);
        this.name = 'InvalidEmailError';
    }
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


module.exports = {
    sendMail,
    EmailSendError,
    InvalidEmailError,
};