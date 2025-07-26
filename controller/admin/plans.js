const { handleError } = require('../../handler/handleError')
const Plan = require('../../models/admin/plan')
const Category = require('../../models/admin/category')

const createPlans = async (req, res) => {
    try {
        if (req?.body?.offerPrice > req?.body?.price) { return res.status(400).json({ message: 'OfferPrice Must be Less than price' }) }
        // if (req?.body?.price == 0) { return res.status(400).json({ message: 'Price is required' }) }
        let offerPrice = req?.body?.offerPrice
        // if (offerPrice == 0) { offerPrice = req?.body?.price }
        const categoryExist = await Category.findById(req?.body?.category)
        if (!categoryExist) { return res.status(400).json({ message: 'Category not Fount' }) }

        await Plan.create({
            ...req?.body,
            offerPrice
        })
        return res.status(200).json({ message: 'Plan Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getPlans = async (req, res) => {
    try {
        const page = req?.query?.page || 1
        const limit = req?.query?.limit || 10
        const skip = (page - 1) * limit

        const plans = await Plan.find({}).skip(skip).limit(limit).lean()
        const total = await Plan.countDocuments({})
        return res.status(200).json({ message: 'Plan Fetched Successfully', plans, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const updatePlan = async (req, res) => {
    try {
        const { _id, name, price, offerPrice, category, specifications, tax } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "_id is required" });
        }

        const plan = await Plan.findById(_id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        if (name) plan.name = name;

        if (typeof price !== 'undefined') {
            if (price <= 0) {
                return res.status(400).json({ message: "Price must be greater than zero" });
            }
            plan.price = price;
        }

        if (typeof offerPrice !== 'undefined') {
            const effectivePrice = typeof price !== 'undefined' ? price : plan.price;
            if (offerPrice > effectivePrice) {
                return res.status(400).json({ message: "Offer price must be less than or equal to price" });
            }
            plan.offerPrice = offerPrice === 0 ? effectivePrice : offerPrice;
        }

        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).json({ message: "Category not found" });
            }
            plan.category = category;
        }

        if (specifications) plan.specifications = specifications;
        if (tax) plan.tax = tax;

        await plan.save();
        return res.status(200).json({ message: "Plan updated successfully" });

    } catch (error) {
        handleError(error, res);
    }
};

const deletePlan = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        await Plan.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Plan Deleted Successfully' })
    } catch (error) {
        handleError(error, res);
    }
}

module.exports = {
    createPlans, getPlans, updatePlan, deletePlan
}