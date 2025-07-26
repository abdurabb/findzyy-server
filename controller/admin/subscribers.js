const { handleError } = require('../../handler/handleError')
const User = require('../../models/user/userSchema')
const Category = require('../../models/admin/category')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')
const Camera = require('../../models/admin/camera')
const Album = require('../../models/vendor/album')

const getSubscribers = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { type, category, search } = req.query;
        if (!type) return res.status(400).json({ message: 'Type is required' })
        const typeEnum = ['user', 'vendor']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        let query = {
            role: type
        }

        if (category && category !== 'null' && category.trim() !== '') {
            query.categories = { $in: [category] };
        }

        if (search) {
            query.name = { $regex: new RegExp(search, 'i') };
        }

        const users = await User.find(query).skip(skip).limit(limit).select('image name dialCode number email categories location')
        const total = await User.countDocuments(query)
        const userWithCategory = await Promise.all(users.map(async (user) => {
            const categoryFind = await Category.find({ _id: { $in: user?.categories } }).distinct('name')
            return {
                ...user?.toObject(),
                category: categoryFind
            }
        }))

        return res.status(200).json({ message: 'Users', users: userWithCategory, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

const getSubScriberDetails = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId) { return res.status(400).json({ message: 'User Id is required' }) }
        const user = await User.findById({ _id: userId }).select('image name about categories lens lights camera experience dialCode number email location instagram faceBook pinterest webSite youTube')
        if (!user) { return res.status(400).json({ message: 'User not fount' }) }
        const categories = await Category.find({ _id: { $in: user?.categories } }).distinct('name')
        const camera = await Camera.find({ _id: { $in: user?.camera } }).distinct('name')
        const data = {
            ...user.toObject(),
            gadget: await Gadget.countDocuments({ createdBy: userId }),
            rental: await RentalService.countDocuments({ createdBy: userId }),
            categories,
            camera
        }

        return res.status(200).json({ message: 'User Details', user: data })
    } catch (error) {
        handleError(error, res)
    }
}

const getVendorGallery = async (req, res) => {
    try {
        const { userId } = req?.query;
        if (!userId) { return res.status(400).json({ message: 'UserId is Required' }) }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const albums = await Album.find({ vendorId: userId }).select('name coverImage location').skip(skip).limit(limit)
        const total = await Album.countDocuments({ vendorId: userId })
        return res.status(200).json({ message: 'Albums', albums, totalPages: Math.ceil(total / limit), total })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    getSubscribers, getSubScriberDetails, getVendorGallery
}