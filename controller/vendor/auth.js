const { handleError } = require('../../handler/handleError')
const Plan = require('../../models/admin/plan')
const Coupon = require('../../models/admin/coupon')
const Category = require('../../models/admin/category')
const PlanPurchaseHistory = require('../../models/user/planPurchaseHistory')
const Payment = require('../../models/user/payment')
const CouponUsageHistory = require('../../models/user/couponUsageHistory')

const getArtistPlan = async (req, res) => {
    try {
        const { categories, couponCode } = req?.body;
        let { plan, planPrice, planOfferPrice, gst, discount, total, success, message } = await categoryPlanFind(categories, res)
        if (success == false) { return res.status(400).json({ success, message }) }
        if (plan == null) { return res.status(400).json({ message: 'Plan not Fount' }) }

        // category Checking
        for (const cat of categories) {
            const category = await Category.findById(cat)
            if (!category) { return res.status(400).json({ message: 'Category Not Fount' }) }
        }

        if (couponCode && couponCode !== '' && couponCode !== null && couponCode !== undefined) {
            const { coupon, couponDiscount, success, message } = await isCouponApply(planOfferPrice, couponCode, req, res)
            if (success == false) { return res.status(400).json({ success, message }) }
            discount = couponDiscount
        }

        total = planOfferPrice + gst - discount
        return res.status(200).json({
            message, plan, planPrice, planOfferPrice, gst, discount, total,
            currency: process.env.CURRENCY,
            country: process.env.COUNTRY,
            currencySymbol: process.env.CURRENCY_SYMBOL
        })
    } catch (error) {
        handleError(error, res)
    }
}

const purchasePlan = async (req, res) => {
    try {
        const { categories, couponCode } = req?.body;
        let { plan, planPrice, planOfferPrice, gst, discount, total, success, message } = await categoryPlanFind(categories, res)
        if (success == false) { return res.status(400).json({ success, message }) }
        if (plan == null) { return res.status(400).json({ message: 'Plan not Fount' }) }

        // category Checking
        let categoryData = []
        for (const cat of categories) {
            const category = await Category.findById(cat)
            if (!category) { return res.status(400).json({ message: 'Category Not Fount' }) }
            categoryData.push(category)
        }

        let isCoupon = false
        let couponId = null
        if (couponCode && couponCode !== '' && couponCode !== null && couponCode !== undefined) {
            const { coupon, couponDiscount, success, message } = await isCouponApply(planOfferPrice, couponCode, req, res)
            if (success == false) { return res.status(400).json({ success, message }) }
            isCoupon = true
            couponId = coupon?._id
            discount = couponDiscount
        }
        total = planOfferPrice + gst - discount

        const payment = new Payment({
            planId: plan?._id,
            coupon: couponId,
            categories: categories,
            sessionId: "",
            user: req?.userId,
            paymentType: 'stripe',
            price: planPrice,
            offerPrice: planOfferPrice,
            tax: gst,
            discount,
            total,
            isCoupon,
        })

        // after payment success

        // coupon usage history & count of the usage in the coupon schema
        let couponUsageHistory = null
        const coupon = await Coupon.findById(couponId)
        if (coupon) {
            coupon.usedUsers.push(req?.user?._id)
            couponUsageHistory = new CouponUsageHistory({
                planId: plan?._id,
                coupon: couponId,
                paymentId: payment?._id,
                userId: req?.user?._id,
                userName: req?.user?.name,
                dialCode: req?.user?.dialCode,
                number: req?.user?.number,
                planName: plan?.name,
                planPrice: plan?.price,
                planOfferPrice: plan?.offerPrice,
                couponDiscount: discount,
                discountPrice: plan?.offerPrice - discount,
                tax: gst,
                total
            })
        }


        const category = await Category.findById(plan?.category).select('name')
        const planPurchaseHistory = new PlanPurchaseHistory({
            user: req?.user?._id,
            planId: plan?._id,
            name: plan?.name,
            price: planPrice,
            offerPrice: planOfferPrice,
            tax: gst,
            discount,
            total,
            isCoupon,
            category: plan?.category,
            categoryName: category?.name,
            specifications: plan?.specifications,
            paymentId: payment?._id
        })

        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        req.user.isPlan = true;
        req.user.plan = plan?._id;
        req.user.planEndDate = oneYearFromNow;
        req.user.role = 'vendor';
        req.user.categories = categories


        payment.paymentStatus = 'completed'
        if (couponUsageHistory) await couponUsageHistory.save()
        await payment.save()
        await planPurchaseHistory.save()
        await req.user.save();
        return res.status(200).json({ message: 'Plan Purchased', categories: categoryData })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    getArtistPlan, purchasePlan
}


const categoryPlanFind = async (categories, res) => {
    try {
        if (!categories || categories == "" || categories?.length == 0) {
            return { success: false, message: "Categories are required" }
        }

        let plan = null;
        let planPrice = 0;
        let planOfferPrice = 0;
        let gst = 0
        let discount = 0
        let total = 0

        const categoryDocs = await Promise.all(categories.map(cat => Category.findById(cat)));
        const invalidCategoryIndex = categoryDocs.findIndex(cat => !cat);
        if (invalidCategoryIndex !== -1) {
            return { success: false, message: `Category not found: ${categories[invalidCategoryIndex]}` }
        }
        for (let i = 0; i < categoryDocs.length; i++) {
            const category = categoryDocs[i];
            const categoryId = categories[i];
            const categoryPlan = await Plan.findOne({ category: categoryId });
            if (categoryPlan && categoryPlan.price >= planPrice) {
                planPrice = categoryPlan.price;
                planOfferPrice = categoryPlan?.offerPrice
                gst = categoryPlan?.tax
                plan = categoryPlan;
            }
        }

        return {
            success: true, message: `Plan Fetched`,
            plan, planPrice, planOfferPrice, gst, discount, total
        }
    } catch (error) {
        return { success: false, message: error?.message, }
    }
}

const isCouponApply = async (planOfferPrice, couponCode, req, res) => {
    try {
        const coupon = await Coupon.findOne({ couponCode: couponCode?.toUpperCase() })
        if (!coupon) { return { success: false, message: 'Coupon not Fount' } }
        if (planOfferPrice < coupon?.minimumPurchase) { return { success: false, message: `Minimum purchase of ₹${coupon?.minimumPurchase} required to apply this coupon.` } }
        if (coupon?.startDate > new Date()) {
            return {
                success: false,
                message: `This coupon is not active yet. It will be valid from ${coupon?.startDate.toDateString()}.`
            }
        }
        if (coupon?.endDate < new Date()) {
            return {
                success: false,
                message: `This coupon has expired on ${coupon?.endDate.toDateString()}.`
            }
        }

        const usedCount = coupon?.usedUsers?.filter(
            (usr) => usr?.toString() === req?.userId?.toString()
        ) || [];

        if (usedCount.length >= coupon?.usageLimit) {
            return {
                success: false,
                message: `You have already used this coupon the maximum number of times allowed.`
            }

        }

        return {
            success: true, message: 'Coupon Applied',
            couponDiscount: coupon?.discount, coupon
        }



    } catch (error) {
        return { success: false, message: error?.message, }
    }
}