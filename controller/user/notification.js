const VendorNotification = require('../../models/vendor/notificationSchema')
const { handleError } = require('../../handler/handleError')

const getNotification = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const notification = await VendorNotification.find({ receivers: { $in: req?.userId } })
            .populate({
                path: 'helpDeskId',
                populate: {
                    path: 'vendorId',
                    select: 'name image dialCode number'
                }
            })
            .populate({
                path: 'shareAndAvailabilityId',
                populate: {
                    path: 'vendorId',
                    select: 'name image dialCode number'
                }
            })
            .select('-sender -receivers ')
            .skip(skip).limit(limit)
        const total = await VendorNotification.countDocuments({ receivers: { $in: req?.userId } })
        console.log(req?.userId)
        return res.status(200).json({ message: 'notification', notification, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    getNotification
}