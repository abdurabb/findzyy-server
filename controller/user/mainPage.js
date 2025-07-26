const { handleError } = require('../../handler/handleError')
const Category = require('../../models/admin/category')
const RentalCategories = require('../../models/admin/rentalAndGadgetCategory')
const SubCategory = require('../../models/admin/subCategory')
const Banner = require('../../models/admin/banner')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')
const WishList = require('../../models/user/wishlist')
const User = require('../../models/user/userSchema')
const Event = require('../../models/vendor/event')
const Plan = require('../../models/admin/plan')
const Camera = require('../../models/admin/camera')


const getHome = async (req, res) => {
    try {
        const { lat, lng } = req.query
        let data = {}
        let photoGraphers = []
        let rental = []; let gadgets = []
        // banner
        const banners = await Banner.find({ endDate: { $gte: new Date() } }).sort({ cratedAt: -1 }).lean()
        // category
        const availableCategory = await Plan.find({}).distinct('category')
        const categories = await Category.find({ _id: { $in: availableCategory } }).sort({ createdAt: -1 }).lean()

        let photoGraphersQuery = { _id: { $ne: req?.userId }, role: 'vendor' }
        let rentalQuery = { createdBy: { $ne: req?.userId }, approveStatus: 'Approved', isAvailableNow: true, isBlocked: false, }
        let gadgetQuery = { createdBy: { $ne: req?.userId }, isSoldOut: false, isBlocked: false, approveStatus: 'Approved' }


        if (lat && lng) {
            const radiusInKm = parseFloat(process.env.FILTER_RADIUS) || 10; // in km
            const earthRadiusInKm = 6378.1;

            photoGraphersQuery.locationPoint = {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(lng), parseFloat(lat)],
                        radiusInKm / earthRadiusInKm // radius in radians
                    ]
                }
            };

            rentalQuery.locationPoint = {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(lng), parseFloat(lat)],
                        radiusInKm / earthRadiusInKm // radius in radians
                    ]
                }
            };

            gadgetQuery.locationPoint = {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(lng), parseFloat(lat)],
                        radiusInKm / earthRadiusInKm // radius in radians
                    ]
                }
            };


        }

        // photographers
        photoGraphers = await User.find(photoGraphersQuery).sort({ createdAt: -1 }).limit(4).select('image name lat lng location categories').lean()
        const photoGraphersWithCategories = await Promise.all(photoGraphers.map(async (vendor) => {
            const categories = await Category.find({ _id: { $in: vendor?.categories } }).distinct('name');
            return {
                ...vendor,
                categories
            }
        }))
        photoGraphers = photoGraphersWithCategories


        // rental and gadget
        rental = await RentalService.find(rentalQuery).select('coverImage name brandName images lat lng location amount paymentType categoryId description specification createdBy ').sort({ createdAt: -1 }).limit(4).lean()
        gadgets = await Gadget.find(gadgetQuery).select('coverImage name brandName images lat lng location amount paymentType categoryId description condition specification createdBy').sort({ createdAt: -1 }).limit(4).lean()



        // checking is Added in Favorite or not
        if (req?.userId) {
            rental = await Promise.all(rental.map(async (rent) => {
                const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: rent?._id, itemType: 'rental' })
                return {
                    ...rent,
                    isFavorite: favoriteFind ? true : false
                }
            }))


            gadgets = await Promise.all(gadgets.map(async (gad) => {
                const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: gad?._id, itemType: 'gadget' })
                return {
                    ...gad,
                    isFavorite: favoriteFind ? true : false
                }
            }))

            photoGraphers = await Promise.all(photoGraphers.map(async (vendor) => {
                const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: vendor?._id, itemType: 'vendor' })
                return {
                    ...vendor,
                    isFavorite: favoriteFind ? true : false
                }
            }))

        } else {
            rental = await Promise.all(rental.map(async (rent) => {
                return {
                    ...rent,
                    isFavorite: false
                }
            }))
            gadgets = await Promise.all(gadgets.map(async (gad) => {
                return {
                    ...gad,
                    isFavorite: false
                }
            }))

            photoGraphers = await Promise.all(photoGraphers.map(async (vendor) => {
                return {
                    ...vendor,
                    isFavorite: false
                }
            }))
        }
        //  seller details
        gadgets = await Promise.all(gadgets.map(async (gad) => {
            const seller = await User.findById(gad?.createdBy).select('name image dialCode number')
            return {
                ...gad,
                seller
            }
        }))

        rental = await Promise.all(rental.map(async (rent) => {
            const seller = await User.findById(rent?.createdBy).select('name image dialCode number')
            return {
                ...rent,
                seller
            }
        }))

        data.banners = banners
        data.categories = categories
        data.photoGraphers = photoGraphers
        data.rental = rental
        data.gadgets = gadgets
        data.user = req?.user?.name
        data.dialCode = req?.user?.dialCode
        data.number = req?.user?.number
        data.image = req?.user?.image

        // nearby photographers will come here

        if (req?.user && req?.user?.role == 'vendor') {

            const now = new Date();
            const startOfDay = new Date(now);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 999);
            console.log(req?.userId)

            data.upcomingEvents = await Event.countDocuments({ vendorId: req?.userId, endDate: { $gte: new Date() } });
            data.completedEvents = await Event.countDocuments({ vendorId: req?.userId, endDate: { $lt: new Date() } });
            data.todayEvents = data.todayEvents = await Event.find({
                vendorId: req.userId,
                startDate: { $lt: endOfDay },
                endDate: { $gt: startOfDay }
            });
        }
        return res.status(200).json({ message: 'Home Page', data })
    } catch (error) {
        handleError(error, res)
    }
}

const getSubCategories = async (req, res) => {
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

const getCategories = async (req, res) => {
    try {
        const search = req?.query?.search
        const availableCategory = await Plan.find({}).distinct('category')
        let query = {
            _id: { $in: availableCategory }
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const categories = await Category.find(query);
        res.status(200).json({ categories, message: 'Categories' });
    } catch (error) {
        handleError(error, res)
    }
}

const getAllSubCategories = async (req, res) => {
    try {
        const search = req?.query?.search
        let categories = req.query.categories
        let query = {}
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        let categoryData = []
        if (categories) {
            if (typeof categories == 'string') {
                categories = categories.split(',');
            } else {
                categories = [categories]
            }
            // query.categoryId = { $in: categories };
            for (const cat of categories) {
                const category = await Category.findById(cat)
                if (!category) { return res.status(400).json({ message: 'Category Not Fount' }) }
                query.categoryId = cat
                const categoriesFind = await SubCategory.find(query);
                categoryData.push({
                    category,
                    subCategories: categoriesFind
                })
            }
        }


        return res.status(200).json({ message: 'Sub Categories', subCategories: categoryData })
    } catch (error) {
        handleError(error, res)
    }
}

const getAllCameras = async (req, res) => {
    try {
        const search = req?.query?.search
        let query = {}
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const cameras = await Camera.find(query).select('name')
        return res.status(200).json({ message: 'Cameras', cameras })

    } catch (error) {
        handleError(error, res)
    }
}

const getRentalAndGadgetCategories = async (req, res) => {
    try {
        const search = req?.query?.search
        let query = {}
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const categories = await RentalCategories.find(query);
        res.status(200).json({ categories, message: 'Rental And Gadget Categories' });
    } catch (error) {
        handleError(error, res)
    }
}


module.exports = {
    getHome, getSubCategories, getCategories, getRentalAndGadgetCategories, getAllSubCategories, getAllCameras
}

