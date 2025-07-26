const { handleError } = require('../../handler/handleError')
const Category = require('../../models/admin/category')
const SubCategory = require('../../models/admin/subCategory')
const Plan = require('../../models/admin/plan')
const User = require('../../models/user/userSchema')

const addCategory = async (req, res) => {
    try {
        const isExist = await Category.findOne({ name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } });
        if (isExist) { return res.status(400).json({ message: 'Category Already Created in Same name' }) }
        await Category.create(req?.body)
        return res.status(200).json({ message: 'Category Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const categories = await Category.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }).lean()
        const categoryWithSubCount = await Promise.all(categories.map(async (cat) => {
            const subCount = await SubCategory.countDocuments({ categoryId: cat?._id })
            return {
                ...cat,
                sucCategories: subCount
            }
        }))

        const total = await Category.countDocuments({})

        return res.status(200).json({ message: 'Categories', categories: categoryWithSubCount, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).select('name')
        return res.status(200).json({ message: 'Categories', categories })
    } catch (error) {
        handleError(error, res)
    }
}

const editCategory = async (req, res) => {
    try {
        const { _id, name } = req?.body;
        const category = await Category.findById(_id)
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

const deleteCategory = async (req, res) => {
    try {
        const { _id } = req?.body;
        const category = await Category.findById(_id)
        if (!category) { return res.status(400).json({ message: 'Category Not Fount' }) }
        const subCategories = await SubCategory.find({ categoryId: _id })
        const subCategoryIds = subCategories.map(sub => sub._id);

        await User.updateMany(
            {
                $or: [
                    { categories: { $in: [_id] } },
                    { subCategories: { $in: subCategoryIds } }
                ]
            },
            {
                $pull: {
                    categories: _id,
                    subCategories: { $in: subCategoryIds }
                }
            }
        );


        await SubCategory.deleteMany({ categoryId: _id });
        await Plan.deleteMany({ category: _id })
        await Category.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Category Deleted Successfully' })

    } catch (error) {
        handleError(error, res)
    }
}

// sub Category
const addSubCategory = async (req, res) => {
    try {
        const isExist = await SubCategory.findOne({ name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } })
        if (isExist) { return res.status(400).json({ message: 'Sub Category Already Created in Same name' }) }
        await SubCategory.create(req.body)
        return res.status(200).json({ message: 'Sub Category Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getSubCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { categoryId } = req.query;
        if (!categoryId) { return res.status(400).json({ message: 'Category Id is required' }) }
        let query = { categoryId }
        const subCategories = await SubCategory.find(query).skip(skip).sort({ createdAt: -1 }).limit(limit)
        const total = await SubCategory.countDocuments(query)
        return res.status(200).json({ message: 'Categories', subCategories, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const editSubCategory = async (req, res) => {
    try {
        const { _id, name, image } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const subCategory = await SubCategory.findById(_id)
        if (!subCategory) { return res.status(400).json({ message: 'Sub Category not fount' }) }
        if (name) subCategory.name = name
        if (image) subCategory.image = image
        await subCategory.save()
        return res.status(200).json({ message: 'Sub Category Updated' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const { _id } = req?.body;
        const category = await SubCategory.findById(_id)
        if (!category) { return res.status(400).json({ message: 'Sub Category Not Fount' }) }

        // need delete more things
        await User.updateMany(
            { subCategories: { $in: _id } },
            { $pull: { subCategories: _id } }
        );
        await SubCategory.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'SubCategory Deleted Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}



module.exports = {
    addCategory, getCategories, editCategory, deleteCategory, addSubCategory, getSubCategory, editSubCategory, deleteSubCategory, getAllCategories
}