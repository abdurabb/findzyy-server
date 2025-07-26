const { handleError } = require('../../handler/handleError')
const Coupon = require('../../models/admin/coupon')
const CouponUsageHistory = require('../../models/user/couponUsageHistory')


const createCoupon = async (req, res) => {
    try {
        let start = new Date(req?.body?.startDate)
        let end = new Date(req?.body?.endDate)
        console.log(req?.body?.couponCode)
        const isExist = await Coupon.findOne({ couponCode: req?.body?.couponCode.toUpperCase() })
        if (isExist) { return res.status(400).json({ message: 'Coupon code is Exist' }) }
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        await Coupon.create({
            ...req?.body,
            startDate: start,
            endDate: end,
            couponCode: req?.body?.couponCode?.toUpperCase()
        });
        return res.status(200).json({ message: 'Coupon Created Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

const getCoupons = async (req, res) => {
    try {

        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit
        const { search } = req?.query;
        let query = {}
        if (search) {
            query.name = { $regex: new RegExp(search, 'i') };
        }
        const coupons = await Coupon.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const total = await Coupon.countDocuments(query)
        return res.status(200).json({ message: 'Coupons', coupons, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

const updateCoupon = async (req, res) => {
    try {
        const { _id, name, couponCode, discount, usageLimit, minimumPurchase, startDate, endDate } = req?.body;
        if (!_id) return res.status(400).json({ message: "_id is required" })
        const coupon = await Coupon.findById(_id)
        if (!coupon) { return res.status(400).json({ message: 'Coupon not fount' }) }
        if (name) coupon.name = name
        if (couponCode) {
            const isExist = await Coupon.findOne({ _id: { $ne: _id }, couponCode: req?.body?.couponCode.toUpperCase() })
            if (isExist) { return res.status(400).json({ message: 'Coupon code is Exist' }) }
            coupon.couponCode = couponCode?.toUpperCase()
        }
        if (discount) coupon.discount = discount
        if (usageLimit) coupon.usageLimit = usageLimit
        if (minimumPurchase) coupon.minimumPurchase = minimumPurchase
        if (startDate) {
            let start = new Date(startDate)
            start.setHours(0, 0, 0, 0);
            coupon.startDate = start
        }
        if (endDate) {
            let end = new Date(endDate)
            end.setHours(23, 59, 59, 999);
            coupon.endDate = endDate
        }
        await coupon.save()
        return res.status(200).json({ message: 'Coupon Updated Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteCoupon = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) return res.status(400).json({ message: "_id is required" })
        await CouponUsageHistory.deleteMany({coupon:_id})
        await Coupon.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Coupon Deleted Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

const couponUsageHistory = async (req, res) => {
    try {
        const { couponId, search } = req?.query;
        if (!couponId) { return res.status(400).json({ message: 'Coupon Id is required' }) }
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit

        let query = {
            coupon: couponId
        }
        if (search) {
            query.userName = { $regex: new RegExp(search, 'i') };
        }

        const history = await CouponUsageHistory.find(query).skip(skip).limit(limit).select('userName dialCode number planName planPrice planOfferPrice couponDiscount discountPrice createdAt')
        const total = await CouponUsageHistory.countDocuments(query)

        return res.status(200).json({ message: 'Coupon history', history, total, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}


module.exports = {
    createCoupon, getCoupons, deleteCoupon, updateCoupon, couponUsageHistory
}