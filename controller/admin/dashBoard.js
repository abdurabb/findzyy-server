const { handleError } = require('../../handler/handleError')
const User = require('../../models/user/userSchema')
const Payment = require('../../models/user/payment')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')
const couponUsageHistory = require('../../models/user/couponUsageHistory')
const Coupon = require('../../models/admin/coupon')
const Plan = require('../../models/admin/plan')

const getDashBoard = async (req, res) => {
    try {
        const { gFilter, sFilter } = req?.query;
        const gFilterEnum = ['This Year', 'Last Year']
        const sFilterEnum = ['This Week', 'This Month', 'This Year']
        if (!gFilterEnum.includes(gFilter)) { return res.status(400).json({ message: 'Invalid Graph Filter' }) }
        if (!sFilterEnum.includes(sFilter)) { return res.status(400).json({ message: 'Invalid  Filter' }) }

        const { sStart, sEnd, graphStartDate, graphEndDate } = getDateRange(sFilter, gFilter)
        let sQuery = { createdAt: { $gte: sStart, $lte: sEnd } }
        const subscription = await User.countDocuments({ role: 'vendor', createdAt: { $gte: sStart, $lte: sEnd } })
        const users = await User.countDocuments({ role: 'user', createdAt: { $gte: sStart, $lte: sEnd } })
        const rental = await RentalService.countDocuments(sQuery)
        const gadget = await Gadget.countDocuments(sQuery)
        const redemptions = await couponUsageHistory.countDocuments(sQuery)
        const plans = await Plan.countDocuments(sQuery)
        const coupons = await Coupon.countDocuments(sQuery)

        // 📌 Income aggregation
        const incomeResult = await Payment.aggregate([
            {
                $match: {
                    createdAt: { $gte: sStart, $lte: sEnd },
                    paymentStatus: 'completed',
                    isRefunded: false,
                },
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: '$total' },
                },
            },
        ]);

        const income = incomeResult[0]?.totalIncome || 0;

        // Graph data 
        const result = await getGraphData(graphStartDate, graphEndDate)

        return res.status(200).json({
            message: 'DashBoard Data',
            subscription,
            users,
            rental,
            gadget,
            redemptions,
            plans,
            coupons,
            income,
            chartData: result
        })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    getDashBoard
}


function getDateRange(sFilter, gFilter) {
    const now = new Date();

    // stats Filter
    let sStart, sEnd = new Date();
    if (sFilter === 'This Week') {
        const currentDay = now.getDay();
        const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
        sStart = new Date(now.setDate(diff));
        sStart.setHours(0, 0, 0, 0);
    } else if (sFilter === 'This Month') {
        sStart = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (sFilter === 'This Year') {
        sStart = new Date(now.getFullYear(), 0, 1);
    } else {
        throw new Error('Invalid sFilter value');
    }
    sEnd.setHours(23, 59, 59, 999);

    // Graph Filter Dates
    let graphStartDate, graphEndDate;
    if (gFilter === 'This Year') {
        graphStartDate = new Date(now.getFullYear(), 0, 1);
        graphEndDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    } else if (gFilter === 'Last Year') {
        graphStartDate = new Date(now.getFullYear() - 1, 0, 1);
        graphEndDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
    } else {
        throw new Error('Invalid gFilter');
    }

    return {
        sStart,
        sEnd,
        graphStartDate,
        graphEndDate
    };
}

const getGraphData = async (startDate, endDate) => {
    const monthlyIncome = await Payment.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
                paymentStatus: 'completed',
                isRefunded: false,
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                value: { $sum: '$total' },
            },
        },
        {
            $project: {
                _id: 0,
                month: '$_id',
                value: 1,
            },
        },
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result = monthNames.map((name, index) => {
        const found = monthlyIncome.find(item => item.month === index + 1);
        return {
            name,
            value: found ? found.value : 0,
        };
    });

    return result;
};