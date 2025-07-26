const { decode } = require('jsonwebtoken');
const { verifyToken } = require('../handler/jwtGenerate');
const Admin = require('../models/admin/adminSchema')
const User = require('../models/user/userSchema')
const { planChecking } = require('../handler/planChecking')



const protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (token) {
                const decoded = verifyToken(token);
                const admin = await Admin.findById(decoded.id).select('-password');
                if (!admin) {
                    return res.status(404).json({ status: false, message: 'Admin not found' });
                }
                req.admin = admin;
                req.adminId = admin?._id
                next();
            }
        } catch (error) {
            if (error.message == 'jwt expired') {
                return res.status(399).json({ status: false, message: 'Token expired' });
            } else {
                return res.status(403).json({ status: false, message: 'Invalid token' });
            }
        }
    }
    if (!token) {
        return res.status(401).json({ status: false, message: 'Token not found' });
    }
}


const protectCommonUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.id).select('-password');

            if (!user) return res.status(404).json({ status: false, message: 'User not found' });
            if (user.isOtpVerified === false) return res.status(400).json({ message: 'Please Verify OTP' });
            await planChecking(user)
            req.user = user;
            req.userId = user._id;

        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(399).json({ status: false, message: 'Token expired' });
            } else {
                return res.status(405).json({ status: false, message: 'Invalid token' });
            }
        }
    }
    next();
};


const protectUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (token) {
                const decoded = verifyToken(token);
                const user = await User.findById(decoded.id).select('-password');
                if (!user) { return res.status(404).json({ status: false, message: 'User not found' }); }
                if (user?.isOtpVerified == false) { return res.status(400).json({ message: 'Please Verify OTP' }) }
                await planChecking(user)
                req.user = user;
                req.userId = user?._id
                next();
            }
        } catch (error) {
            if (error.message == 'jwt expired') {
                return res.status(399).json({ status: false, message: 'Token expired' });
            } else {
                return res.status(403).json({ status: false, message: 'Invalid token' });
            }
        }
    }
    if (!token) {
        return res.status(401).json({ status: false, message: 'Token not found' });
    }
}

const protectVendor = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (token) {
                const decoded = verifyToken(token);
                const user = await User.findById(decoded.id).select('-password');
                if (!user) { return res.status(404).json({ status: false, message: 'User not found' }); }
                if (user?.isOtpVerified == false) { return res.status(400).json({ message: 'Please Verify OTP' }) }
                await planChecking(user)
                if (user?.role !== 'vendor') { return res.status(400).json({ message: 'Your Not Authorized, Please Purchase the Plan' }) }
                req.user = user;
                req.userId = user?._id
                next();
            }
        } catch (error) {
            if (error.message == 'jwt expired') {
                return res.status(399).json({ status: false, message: 'Token expired' });
            } else {
                return res.status(403).json({ status: false, message: 'Invalid token' });
            }
        }
    }
    if (!token) {
        return res.status(401).json({ status: false, message: 'Token not found' });
    }
}



module.exports = {
    protectAdmin, protectUser, protectCommonUser, protectVendor
}

const getLocation = (ip) => {
    try {
        const geo = geoip.lookup(ip);
        if (geo && geo.ll) {
            return { lat: geo.ll[0], lng: geo.ll[1], country: geo.country };
        } else {
            console.log('Geo lookup failed');
            return null;
        }
    } catch (error) {
        console.log('GeoIP error:', error);
        return null;
    }
};