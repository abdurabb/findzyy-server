const { handleError } = require('../../handler/handleError')
const User = require('../../models/user/userSchema')
const UserDataCollection = require('../../models/user/userDataCollection')
const Category = require('../../models/admin/category')
const { sentOtp } = require('../../handler/sentOtp')
const { generateToken } = require("../../handler/jwtGenerate");

const register = async (req, res) => {
    try {
        const isExist = await User.findOne({ dialCode: req?.body?.dialCode, number: req?.body?.number })
        if (isExist) { return res.status(400).json({ message: 'User Already Exist' }) }
        const result = await sentOtp(req?.body?.dialCode, req?.body?.number);
        if (!result?.success) { return res.status(500).json({ success: false, message: result?.message, error: result?.error }) }
        const otp = result?.otpCode;
        const expires = new Date(Date.now() + 3 * 60000);
        const { lng, lat } = req.body;

        const userData = {
            ...req?.body,
            otp,
            otpExpire: expires
        };
        // Only add locationPoint if both lat and lng are valid
        if (lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))) {
            userData.locationPoint = {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            };
        }

        await User.create(userData);
        return res.status(200).json({ message: 'Otp Sent Successfully', dialCode: req?.body?.dialCode, number: req?.body?.number })
    } catch (error) {
        console.log(error.message)
        handleError(error, res)
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { dialCode, number } = req?.body;
        const user = await User.findOne({ dialCode, number })
        if (!user) { return res.status(400).json({ message: 'User not Fount' }) }

        const { otp, otpExpire } = user
        if (otpExpire < Date.now()) { return res.status(400).json({ success: false, message: 'OTP expired.' }) }
        if (otp !== req?.body?.otp) { return res.status(400).json({ success: false, message: 'Invalid OTP.' }) }
        const token = generateToken(user._id, "90d");

        user.isOtpVerified = true;
        user.otp = ""
        await user.save()

        const categories = []
        if ((user?.role == 'vendor') && (user?.categories)) {
            for (const cat of user?.categories) {
                const category = await Category.findById(cat).select('name')
                if (category) {
                    categories.push({
                        _id: cat,
                        name: category.name
                    })
                }
            }
        }
        const updatedUser = {
            ...user?.toObject(),
            categories
        }

        return res.status(200).json({ message: "OTP verified successfully", token, user: updatedUser })
    } catch (error) {
        handleError(error, res)
    }
}

const sendOtp = async (req, res) => {
    try {
        const { dialCode, number } = req?.body;
        const user = await User.findOne({ dialCode, number })
        if (!user) { return res.status(400).json({ message: 'User not Registered' }) }


        const result = await sentOtp(req?.body?.dialCode, req?.body?.number);
        if (!result?.success) { return res.status(500).json({ success: false, message: result?.message, error: result?.error }) }
        const otp = result?.otpCode;
        const expires = new Date(Date.now() + 3 * 60000);

        user.otp = otp
        user.otpExpire = expires
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({ message: 'Otp Sent Successfully' })

    } catch (error) {
        handleError(error, res)
    }
}


const userDataCollect = async (req, res) => {
    try {
        // const result = await sentOtp("+91", req?.body?.number);
        // if (!result?.success) { return res.status(500).json({ success: false, message: result?.message, error: result?.error }) }
        const otp = "";
        const expires = new Date(Date.now() + 3 * 60000);
        const lat = '11.868373089750637'
        const lng = '75.36468496786063'
        let isExist = false
        const findData = await UserDataCollection.findOne({ dialCode: "+91", number: req?.body?.number })
        const findUser = await User.findOne({ dialCode: "+91", number: req?.body?.number })
        if (findData || findUser) {
            isExist = true
        }
        if (isExist == true) { return res.status(400).json({ message: 'User Already Exist', success: false }) }

        const userData = {
            ...req?.body,
            dialCode: "+91",
            otp,
            gender: 'Male',
            image: "https://res.cloudinary.com/fouvtycloud/image/upload/v1750066510/Fittor/logo_ckubjr.png",
            role: 'user',
            otpExpire: expires,
            isOtpVerified: true,
        };
        // Only add locationPoint if both lat and lng are valid
        if (lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))) {
            userData.locationPoint = {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            };
        }

        await User.create(userData);
        await UserDataCollection.create({
            ...req?.body,
            dialCode: "+91",
            otp,
            otpExpire: expires,
            isOtpVerified: true,
        })

        return res.status(200).json({ message: "Successfully Registered", success: true })

    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

const userDataCollectionOtpVerification = async (req, res) => {
    try {
        const dialCode = "+91"
        const { number } = req?.body;
        const user = await User.findOne({ dialCode, number })
        const userDataCollection = await UserDataCollection.findOne({ dialCode, number })
        if (!userDataCollection) { return res.status(400).json({ message: 'User not Fount in Data collection', success: false }) }
        if (!user) { return res.status(400).json({ message: 'User not Fount', success: false }) }

        const { otp, otpExpire } = userDataCollection
        console.log(otpExpire)
        console.log(new Date())

        if (otpExpire < new Date()) { return res.status(400).json({ success: false, message: 'OTP expired.', }) }
        if (otp !== req?.body?.otp) { return res.status(400).json({ success: false, message: 'Invalid OTP.', }) }

        userDataCollection.isOtpVerified = true;
        userDataCollection.otp = ""
        user.isOtpVerified = true;
        user.otp = ""
        await userDataCollection.save()
        await user.save()

        return res.status(200).json({ message: 'Otp Verified', success: true })
    } catch (error) {
        handleError(error, res)
    }
}


module.exports = {
    register, verifyOtp, sendOtp, userDataCollect, userDataCollectionOtpVerification
}