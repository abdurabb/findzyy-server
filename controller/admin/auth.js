
const Admin = require('../../models/admin/adminSchema')
const { sendMail, InvalidEmailError, EmailSendError } = require("../../handler/nodeMailer");
const { generateToken } = require("../../handler/jwtGenerate");
const { handleError } = require('../../handler/handleError')

const sendOtp = async (req, res) => {
    try {
        const { email } = req?.body
        if (!email) { return res.status(400).json({ success: false, message: 'Email is required.' }) }
        let isExist = await Admin.findOne({ email })
        if (!isExist) { return res.status(400).json({ success: false, message: 'Email is not registered.' }) }
        const result = await sendMail(email);
        if (!result?.success) { return res.status(500).json({ success: false, message: 'Failed to send OTP.', error: result?.error }) }
        const otp = result?.otpCode;
        const expires = new Date(Date.now() + 3 * 60000);

        isExist.otp = otp
        isExist.otpExpire = expires
        isExist.isOtpVerified = false
        await isExist.save()
        isExist.otp = null
        return res.status(201).json({ success: true, message: 'OTP sent successfully.', admin: isExist })
    } catch (error) {
        handleError(error, res)
    }
}


const verifyOtp = async (req, res) => {
    try {
        const { email, firebaseToken } = req?.body
        if (!email) { return res.status(400).json({ success: false, message: 'Email is required.' }) }
        if (!firebaseToken) { return res.status(400).json({ success: false, message: 'Firebase token is required.' }) }
        let isExist = await Admin.findOne({ email })
        if (!isExist) { return res.status(400).json({ success: false, message: 'Email is not registered.' }) }
        const { otp, otpExpire } = isExist
        if (otpExpire < Date.now()) { return res.status(400).json({ success: false, message: 'OTP expired.' }) }
        if (otp !== req?.body?.otp) { return res.status(400).json({ success: false, message: 'Invalid OTP.' }) }
        const token = generateToken(isExist._id, "90d");

        isExist.otp = ""
        isExist.isOtpVerified = true
        await isExist.save()
        return res.status(200).json({ success: true, message: "OTP verified successfully", token, admin: isExist, })


    } catch (error) {
        handleError(error, res)
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req?.body
        if (!email) { return res.status(400).json({ success: false, message: 'Email is required.' }) }
        let isExist = await Admin.findOne({ email })
        if (!isExist) { return res.status(400).json({ success: false, message: 'Email is not registered.' }) }
        if (isExist?.password !== password) { return res.status(400).json({ success: false, message: 'Incorrect Password.' }) }
        const token = generateToken(isExist._id, "90d");
        return res.status(200).json({ success: true, message: "Logged Successfully", token, admin: isExist, })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    sendOtp, verifyOtp, Login
}