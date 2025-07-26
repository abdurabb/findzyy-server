const { handleError } = require('../../handler/handleError')
const RentalAdnGadgetCategory = require('../../models/admin/rentalAndGadgetCategory')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')
const User = require('../../models/user/userSchema')
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

const addRentalAndGadgetCategory = async (req, res) => {
    try {
        const isExist = await RentalAdnGadgetCategory.findOne({ name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } });
        if (isExist) { return res.status(400).json({ message: 'Category Already Created in Same name' }) }
        await RentalAdnGadgetCategory.create(req?.body)
        return res.status(200).json({ message: 'Category Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getRentalAndGadgetCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const categories = await RentalAdnGadgetCategory.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
        const total = await RentalAdnGadgetCategory.countDocuments({})

        return res.status(200).json({ message: 'Categories', categories, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const updateRentalAndGadgetCategory = async (req, res) => {
    try {
        const { _id, name } = req?.body;
        const category = await RentalAdnGadgetCategory.findById(_id)
        if (!category) { return res.status(400).json({ message: 'Category Not Fount' }) }
        if (name) {
            category.name = name
        }
        await category.save()
        return res.status(200).json({ message: 'Category Updated' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteRentalAndGadgetCategory = async (req, res) => {
    try {
        const { _id } = req?.body;
        const category = await RentalAdnGadgetCategory.findById(_id)
        if (!category) { return res.status(400).json({ message: 'Sub Category Not Fount' }) }
        await RentalService.deleteMany({ categoryId: _id })
        await Gadget.deleteMany({ categoryId: _id })
        await RentalAdnGadgetCategory.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Category Deleted Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

const getAd = async (req, res) => {
    try {
        const { type, filter, search, vendorId } = req?.query
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
            approveStatus: filter
        }
        if (search) {
            query.name = { $regex: new RegExp(search, 'i') };
        }

        if (vendorId && isValidObjectId(vendorId)) {
            query.createdBy = vendorId;
          }

        let data = []
        let total = 0
        if (type == 'rental') {
            data = await RentalService.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
                .select('coverImage name images brandName categoryId lat lng location amount')
            total = await RentalService.countDocuments(query)
        } else {
            data = await Gadget.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
                .select('coverImage name images brandName categoryId lat lng location amount')
            total = await Gadget.countDocuments(query)
        }

        const dataWithCategoryAndLocation = await Promise.all(data.map(async (dat) => {
            const categoryFind = await RentalAdnGadgetCategory.findById(dat?.categoryId).select('name')
            return {
                ...dat,
                category: categoryFind?.name
            }
        }))
        return res.status(200).json({ message: 'Ad Fetch', data: dataWithCategoryAndLocation, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

const getAdDetails = async (req, res) => {
    try {
        const { type, _id } = req?.query;
        if (!type) { return res.status(400).json({ message: '_id is required' }) }
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const typeEnum = ['rental', 'gadget']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        let data;
        if (type == 'rental') {
            data = await RentalService.findById(_id).lean()
        } else {
            data = await Gadget.findById(_id).lean()
        }
        if (!data) { return res.status(400).json({ message: 'Item not Fount' }) }

        const categoryFind = await RentalAdnGadgetCategory.findById(data?.categoryId).select('name')
        const seller = await User.findById(data?.createdBy).select('name dialCode number image')
        data = {
            ...data,
            category: categoryFind?.name,
            seller: seller
        }
        return res.status(200).json({ message: 'Ad Details', data })
    } catch (error) {
        handleError(error, res)
    }
}

const takeAdAction = async (req, res) => {
    try {
        const { action, _id, type, reason } = req?.body
        if (!action) { return res.status(400).json({ message: 'Action is Required' }) }
        const actionEnum = ['Approve', 'Reject', 'Block', 'Unblock']
        if (!actionEnum.includes(action)) { return res.status(400).json({ message: 'Invalid Action' }) }

        if (!type) { return res.status(400).json({ message: '_id is required' }) }
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const typeEnum = ['rental', 'gadget']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        let item = type == 'rental' ? RentalService : Gadget
        let data = await item.findById(_id)
        if (!data) { return res.status(400).json({ message: 'Item not Fount' }) }
        if (action == 'Approve') {
            data.approveStatus = "Approved"
            data.approveDate = new Date()
        } else if (action == 'Reject') {
            if (!reason) { return res.status(400).json({ message: 'Reason is Required' }) }
            data.rejectReason = reason
            data.approveStatus = "Rejected"
            data.rejectDate = new Date()
        } else if (action == 'Unblock') {
            data.isBlocked = false;
            data.blockDate = null
        } else {
            data.isBlocked = true;
            data.blockDate = new Date()
        }

        await data.save()
        return res.status(200).json({ message: `Item ${action}ed Successfully` })
    } catch (error) {
        handleError(error, res)
    }
}



module.exports = {
    addRentalAndGadgetCategory, getRentalAndGadgetCategories, updateRentalAndGadgetCategory, deleteRentalAndGadgetCategory,
    getAd, getAdDetails, takeAdAction
}