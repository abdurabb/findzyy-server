const { handleError } = require('../../handler/handleError')
const HelpDesk = require('../../models/vendor/helpDesk')
const VendorNotification = require('../../models/vendor/notificationSchema')
const User = require('../../models/user/userSchema')


const createHelpDesk = async (req, res) => {
    try {
        const helpDesk = new HelpDesk({
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
            type: "helpDesk",
            helpDeskId: helpDesk?._id
        })
        await helpDesk.save()
        return res.status(200).json({ message: 'Help Desk Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getHelpDesk = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit;

        const status = req.query.status
        const statusEnum = ['Created', 'Completed', 'Removed']
        if (!statusEnum.includes(status)) { return res.status(400).json({ message: 'Invalid Status' }) }

        const helpDesk = await HelpDesk.find({ vendorId: req?.userId, status }).skip(skip).limit(limit)
        const total = await HelpDesk.countDocuments({ vendorId: req?.userId, status })
        return res.status(200).json({ message: 'Help Desk', helpDesk, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}
const changeHelpDeskStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }

        const statusEnum = ['Completed', 'Removed']
        if (!statusEnum.includes(status)) { return res.status(400).json({ message: 'Invalid Status' }) }

        await VendorNotification.deleteMany({ helpDeskId: _id, type: "helpDesk" })
        const help = await HelpDesk.findById(_id)
        if (!help) { return res.status(400).json({ message: 'Help Desk Not Fount' }) }
        help.status = status
        await help.save()
        return res.status(200).json({ message: 'Status Changed' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    createHelpDesk, getHelpDesk, changeHelpDeskStatus
}