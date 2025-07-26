const { handleError } = require('../../handler/handleError')
const Banner = require('../../models/admin/banner')

const addBanner = async (req, res) => {
    try {
        if (!req?.body?.startDate) { return res.status(400).json({ message: 'Start Date is Required' }) }
        if (!req?.body?.endDate) { return res.status(400).json({ message: 'End Date is Required' }) }

        let startDate = new Date(req?.body?.startDate)
        let endDate = new Date(req?.body?.endDate)
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        await Banner.create({
            ...req?.body,
            startDate,
            endDate
        })
        return res.status(200).json({ message: 'Banner Added Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

const editBanner = async (req, res) => {
    try {
        const { _id, fileType, file, startDate, endDate } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const banner = await Banner.findById(_id)
        if (!banner) { return res.status(400).json({ message: 'Banner not fount' }) }

        if (fileType) { banner.fileType = fileType }
        if (file) { banner.file = file }
        if (startDate) {
            let start = new Date(startDate)
            start.setHours(0, 0, 0, 0);
            banner.startDate = start
        }
        if (endDate) {
            let end = new Date(endDate)
            end.setHours(23, 59, 59, 999);
            banner.endDate = end
        }
        await banner.save()
        return res.status(200).json({ message: 'Banner Updated Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const banner = await Banner.findById(_id)
        if (!banner) { return res.status(400).json({ message: 'Banner not fount' }) }
        await Banner.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Banner Deleted successfully' })

    } catch (error) {
        handleError(error, res)
    }
}

const getBanners = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const banners = await Banner.find({}).skip(skip).limit(limit).sort({ createdAt: -1 })
        const total = await Banner.countDocuments({})
        return res.status(200).json({ message: 'banners', banners, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    addBanner, editBanner, deleteBanner, getBanners
}