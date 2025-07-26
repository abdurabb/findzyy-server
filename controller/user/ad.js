
const { handleError } = require('../../handler/handleError')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')
const RentalAndGadgetCategory = require('../../models/admin/rentalAndGadgetCategory')
const { getLocationFromCoordinates } = require('../../handler/getLocationFromCoordinates')

const createAd = async (req, res) => {
    try {
        const { type, lat, lng } = req?.body;
        if (!type) { return res.status(400).json({ message: 'Type is Required' }) }
        const typeEnum = ['rental', 'gadget']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        const category = await RentalAndGadgetCategory.findById(req?.body?.categoryId)
        if (!category) { return res.status(400).json({ message: 'This Category not Available Now' }) }
        let item = type == 'rental' ? RentalService : Gadget
        await item.create({
            ...req?.body,
            createdBy: req.userId,
            locationPoint: {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        })
        return res.status(200).json({ message: 'Item Created, Please Wait For Admin Verification' })
    } catch (error) {
        handleError(error, res)
    }
}

const updateAd = async (req, res) => {
    try {
        const { type, _id } = req?.body;
        if (!type) { return res.status(400).json({ message: 'Type is Required' }) }
        const typeEnum = ['rental', 'gadget']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        let item = type == 'rental' ? RentalService : Gadget
        let data = await item.findById(_id)
        if (!data) { return res.status(400).json({ message: 'Item not Fount' }) }
        const { coverImage, name, brandName, amount, paymentType, categoryId, lat, lng, location, description, images, specification, condition } = req?.body;
        if (coverImage) data.coverImage = coverImage;
        if (name) data.name = name
        if (brandName) data.brandName = brandName
        if (amount) data.amount = amount
        if (paymentType) data.paymentType = paymentType
        if (categoryId) {
            const category = await RentalAndGadgetCategory.findById(categoryId)
            if (!category) { return res.status(400).json({ message: 'This Category not Available Now' }) }
            data.categoryId = categoryId
        }
        if (lat) data.lat = lat
        if (lng) data.lng = lng
        if (location) data.location = location
        if (description) data.description = description
        if (images) data.images = images
        if (specification) data.specification = specification
        if (condition) data.condition = condition

        if (lat && lng) {
            data.locationPoint = {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        }

        await data.save()
        return res.status(200).json({ message: 'Item Updated' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteAd = async (req, res) => {
    try {
        const { _id, type } = req.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        if (!type) { return res.status(400).json({ message: 'Type is Required' }) }
        const typeEnum = ['rental', 'gadget']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        let item = type == 'rental' ? RentalService : Gadget
        let data = await item.findById(_id)
        if (!data) { return res.status(400).json({ message: 'Item not Fount' }) }
        await item.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Item deleted' })
    } catch (error) {
        handleError(error, res)
    }
}

const getMyAds = async (req, res) => {
    try {

        const { type, filter } = req?.query
        if (!type) { return res.status(400).json({ message: 'Type is Required' }) }
        if (!filter) { return res.status(400).json({ message: 'Filter is required' }) }
        const typeEnum = ['rental', 'gadget']
        const filterEnum = ['Pending', 'Approved', 'Rejected']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        if (!filterEnum.includes(filter)) { return res.status(400).json({ message: 'Invalid Filter' }) }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let query = {
            approveStatus: filter,
            createdBy: req?.userId
        }
        let data = []
        let total = 0
        let item = type == 'rental' ? RentalService : Gadget
        data = await item.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
        // .select('coverImage name images brandName categoryId lat lng location amount description approveStatus isAvailableNow rejectReason rejectDate approveDate pendingDate ')
        total = await item.countDocuments(query)
        return res.status(200).json({ message: 'Ad Fetch', data, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

const addAvailabilityRental = async (req, res) => {
    try {
        const { _id } = req?.body;
        const item = await RentalService.findOne({ _id, createdBy: req?.userId })
        if (!item) { return res.status(400).json({ message: 'Item not Fount' }) }
        item.isAvailableNow = !item.isAvailableNow
        await item.save()
        return res.status(200).json({ message: 'Item Availability updated' })

    } catch (error) {
        handleError(error, res)
    }
}

const markAsSold = async (req, res) => {
    try {
        const { _id } = req?.body;
        const item = await Gadget.findOne({ _id, createdBy: req?.userId })
        if (!item) { return res.status(400).json({ message: 'Item not Fount' }) }
        item.isSoldOut = true;
        await item.save()
        return res.status(200).json({ message: 'Item Sold out Updated' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    createAd, getMyAds, addAvailabilityRental, markAsSold, updateAd, deleteAd
}