const { handleError } = require('../../handler/handleError')
const WishList = require('../../models/user/wishlist')
const User = require('../../models/user/userSchema')
const Category = require('../../models/admin/category')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')

const wishListAction = async (req, res) => {
    try {
        const { type, itemId } = req.body;
        if (!type) { return res.status(400).json({ message: 'Type is required' }) }
        const typeEnum = ['gadget', 'rental', 'vendor']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        const isExist = await WishList.findOne({ userId: req?.userId, itemId, itemType: type })
        if (!isExist) {
            await WishList.create({
                userId: req?.userId,
                itemId,
                itemType: type
            })
        } else {
            await WishList.deleteOne({
                userId: req?.userId,
                itemId,
                itemType: type
            })
        }
        return res.status(200).json({ message: 'WishList Action completed' })
    } catch (error) {
        handleError(error, res)
    }
}

const getWishList = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit;

        const { type, itemId } = req.query;
        if (!type) { return res.status(400).json({ message: 'Type is required' }) }
        const typeEnum = ['gadget', 'rental', 'vendor']
        if (!typeEnum.includes(type)) { return res.status(400).json({ message: 'Invalid Type' }) }
        let query = { userId: req?.userId, itemType: type }
        let wishList = await WishList.find(query).skip(skip).limit(limit).lean()

        wishList = await Promise.all(wishList.map(async (wl) => {
            let data = null;

            if (type === 'gadget') {
                data = await Gadget.findById(wl.itemId)
                    .select('coverImage name brandName images lat lng location amount paymentType categoryId description condition specification createdBy')
                    .lean();

                if (data) {
                    const seller = await User.findById(data?.createdBy)
                        .select('name image dialCode number')
                        .lean();
                    data.seller = seller || null;
                }

            } else if (type === 'rental') {
                data = await RentalService.findById(wl.itemId)
                    .select('coverImage name brandName images lat lng location amount paymentType categoryId description specification createdBy')
                    .lean();

                if (data) {
                    const seller = await User.findById(data?.createdBy)
                        .select('name image dialCode number')
                        .lean();
                    data.seller = seller || null;
                }

            } else if (type === 'vendor') {
                data = await User.findById(wl.itemId)
                    .select('image name lat lng location categories')
                    .lean();

                if (data) {
                    const categories = await Category.find({ _id: { $in: data.categories } }).distinct('name');
                    data.categories = categories;
                }
            }


            return {
                // ...wl,
                ...data,
                isFavorite: true
            };
        }));

        const total = await WishList.countDocuments(query)
        return res.status(200).json({ message: 'WishList ', wishList, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    wishListAction, getWishList
}