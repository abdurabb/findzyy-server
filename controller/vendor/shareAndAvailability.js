const { handleError } = require('../../handler/handleError')
const ShareAndAvailability = require('../../models/vendor/shareAndAvailability')
const VendorNotification = require('../../models/vendor/notificationSchema')
const User = require('../../models/user/userSchema')

const createShareAndAvailability = async (req, res) => {
    try {

        const newAvailabilityAdding = new ShareAndAvailability({
            ...req?.body,
            date: new Date(req?.body?.date),
            vendorId: req?.userId
        })

        const { lat, lng } = req?.body;
        let query = {
            role: 'vendor',
            // isFullDayOff: false,
            _id: { $ne: req?.userId }
        }

        if (lat && lng) {
            const radiusInKm = parseFloat(process.env.FILTER_RADIUS) || 10; // in km
            const earthRadiusInKm = 6378.1;

            query.locationPoint = {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(lng), parseFloat(lat)],
                        radiusInKm / earthRadiusInKm // radius in radians
                    ]
                }
            };
        }

        let vendors = await User.find(query).distinct('_id')
        await VendorNotification.create({
            sender: req?.userId,
            receivers: vendors,
            type: "shareAndAvailability",
            shareAndAvailabilityId: newAvailabilityAdding?._id
        })
        await newAvailabilityAdding.save()
        return res.status(200).json({ message: 'Created Share And Availability' })
    } catch (error) {
        handleError(error, res)
    }
}

const getShareAndAvailability = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit;

        const status = req.query.status
        const statusEnum = ['Created', 'Completed', 'Deleted']
        if (!statusEnum.includes(status)) { return res.status(400).json({ message: 'Invalid Status' }) }

        const shareAndAvailability = await ShareAndAvailability.find({ vendorId: req?.userId, status }).skip(skip).limit(limit)
        const total = await ShareAndAvailability.countDocuments({ vendorId: req?.userId, status })
        return res.status(200).json({ message: 'Help Desk', shareAndAvailability, totalPage: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

const changeShareAndAvailabilityStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }

        const statusEnum = ['Completed', 'Deleted']
        if (!statusEnum.includes(status)) { return res.status(400).json({ message: 'Invalid Status' }) }

        const shareAndAvailability = await ShareAndAvailability.findById(_id)
        if (!shareAndAvailability) { return res.status(400).json({ message: 'Share And Availability Not Fount' }) }
        shareAndAvailability.status = status
        await shareAndAvailability.save()
        return res.status(200).json({ message: 'Status Changed' })
    } catch (error) {
        handleError(error, res)
    }
}


module.exports = {
    createShareAndAvailability, getShareAndAvailability, changeShareAndAvailabilityStatus
}