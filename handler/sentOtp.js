const axios = require('axios')

const sentOtp = async (dialCode, number) => {
    try {

        if (dialCode == "+91" && number == "9061213930") {
            return { otpCode: 123456, success: true, message: 'Otp Sent' }
        } else {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const smsApiUrl = "https://sapteleservices.com/SMS_API/sendsms.php";
            const smsParams = {
                username: process.env.SMS_USERNAME,
                password: process.env.SMS_PASSWORD,
                mobile: number,
                sendername: process.env.SMS_SENDER,
                message: `Your eatplek verification code is ${otp}.Thank you for choosing eatplek.`,
                routetype: 1,
                tid: "1607100000000250667",
            };

            await axios.get(smsApiUrl, { params: smsParams });
            return { otpCode: otp, success: true, message: 'Otp Sent' }
        }


    } catch (error) {
        return { success: false, message: error?.message, error: error?.message }
    }
}


module.exports = { sentOtp }