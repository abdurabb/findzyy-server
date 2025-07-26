const { handleError } = require('../../handler/handleError')
const User = require('../../models/user/userSchema')
const Category = require('../../models/admin/category')
const WishList = require('../../models/user/wishlist')
const RentalService = require('../../models/user/rentalService')
const Gadget = require('../../models/user/gadget')
const Album = require('../../models/vendor/album')
const Review = require('../../models/user/review')
const Event = require('../../models/vendor/event')
const subCategory = require('../../models/admin/subCategory')
const Camera = require('../../models/admin/camera')


const getCommonVendors = async (req, res) => {
    try {
        let { search, category, camera, subCategory, startDate, startTime, endDate, endTime, lat, lng } = req.query;

        let query = {
            role: 'vendor',
            isFullDayOff: false
        }
        if (req?.userId) {
            query._id = { $ne: req?.userId }
        }

        if (camera) {
            if (typeof camera == 'string') {
                camera = camera.split(',');
            }
            query.camera = { $in: camera }
        }

        if (category) {
            if (typeof category == 'string') {
                category = category.split(',');
            }
        }
        if (subCategory) {
            if (typeof subCategory == 'string') {
                subCategory = subCategory.split(',')
            }
        }

        if (category?.length) {
            query.categories = { $in: category };
        }
        if (subCategory?.length) {
            query.subCategories = { $in: subCategory };
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' }
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

        if (startDate && startTime && endDate && endTime) {
            const start = new Date(`${startDate}T${startTime}`);
            const end = new Date(`${endDate}T${endTime}`);

            const unavailableVendorIds = await Event.find({
                $or: [
                    {
                        startDate: { $lte: end },
                        endDate: { $gte: start }
                    }
                ]
            }).distinct('vendorId');
            const excludedVendors = [
                ...unavailableVendorIds.map(id => id.toString()),
                req?.userId?.toString()
            ];

            console.log(excludedVendors)

            query._id = { $nin: excludedVendors };
        }


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let vendors = await User.find(query).skip(skip).limit(limit).lean()
        const total = await User.countDocuments(query)

        const photoGraphersWithCategories = await Promise.all(vendors.map(async (vendor) => {
            const categories = await Category.find({ _id: { $in: vendor?.categories } }).distinct('name');
            return {
                ...vendor,
                categories
            }
        }))
        vendors = photoGraphersWithCategories

        vendors = await Promise.all(vendors.map(async (vendor) => {
            const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: vendor?._id, itemType: 'vendor' })
            return {
                ...vendor,
                isFavorite: favoriteFind ? true : false
            }
        }))

        return res.status(200).json({ message: 'Vendors', vendors, totalPage: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

const getGadget = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let gadgets = []

        let { category, search, lat, lng } = req?.query;
        let query = { isSoldOut: false, isBlocked: false, approveStatus: 'Approved' }
        if (req?.userId) {
            query.createdBy = { $ne: req?.userId }
        }

        if (category) {
            query.categoryId = category
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brandName: { $regex: search, $options: 'i' } }
            ];
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

        gadgets = await Gadget.find(query).select('coverImage name brandName images lat lng location amount paymentType categoryId description condition specification createdBy').sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
        const total = await Gadget.countDocuments(query)
        if (req?.userId) {
            gadgets = await Promise.all(gadgets.map(async (gad) => {
                const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: gad?._id, itemType: 'gadget' })
                return {
                    ...gad,
                    isFavorite: favoriteFind ? true : false
                }
            }))
        } else {
            gadgets = await Promise.all(gadgets.map(async (gad) => {
                return {
                    ...gad,
                    isFavorite: false
                }
            }))
        }

        // seller details
        gadgets = await Promise.all(gadgets.map(async (gad) => {
            const seller = await User.findById(gad?.createdBy).select('name image dialCode number')
            return {
                ...gad,
                seller
            }
        }))

        return res.status(200).json({ message: 'gadgets', gadgets, totalPage: Math.ceil(total / limit) })

    } catch (error) {
        handleError(error, res)
    }
}

const getRentalServices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let { category, search, lat, lng } = req?.query;
        let query = { approveStatus: 'Approved', isAvailableNow: true, isBlocked: false, }
        if (req?.userId) {
            query.createdBy = { $ne: req?.userId }
        }

        if (category) {
            query.categoryId = category
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brandName: { $regex: search, $options: 'i' } }
            ];
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

        let rental = [];
        rental = await RentalService.find(query).select('coverImage name brandName images lat lng location amount paymentType categoryId description specification createdBy ').sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
        const total = await RentalService.countDocuments(query)

        if (req?.userId) {
            rental = await Promise.all(rental.map(async (rent) => {
                const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: rent?._id, itemType: 'rental' })
                return {
                    ...rent,
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
        }

        // seller details
        rental = await Promise.all(rental.map(async (rent) => {
            const seller = await User.findById(rent?.createdBy).select('name image dialCode number')
            return {
                ...rent,
                seller
            }
        }))
        return res.status(200).json({ message: 'rental', rental, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const getVendorDetails = async (req, res) => {
    try {
        const { vendorId, status } = req?.query;
        if (!vendorId) { return res.status(400).json({ message: 'Vendor id is required' }) }
        const vendor = await User.findById(vendorId)
        if (!vendor) { return res.status(400).json({ message: 'vendor not fount' }) }
        const statusEnum = ['about', 'gallery', 'reviews']
        if (!statusEnum.includes(status)) { return res.status(400).json({ message: 'Invalid status' }) }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let data, total = 0
        if (status == 'about') {
            const cameras = await Camera.find({ _id: { $in: vendor?.camera } }).distinct('name');
            data = {
                ...vendor.toObject(),
                camera: cameras
            }
        } else if (status == 'gallery') {
            data = await Album.find({ vendorId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
            total = await Album.countDocuments({ vendorId })
        } else {
            data = await Review.find({ vendorId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
            total = await Review.countDocuments({ vendorId })
        }

        if (req?.userId) {
            const isExist = vendor.viewers.find((viw) => viw?.toString() === req?.userId?.toString());
            if (!isExist) {
                vendor.viewers.push(req?.userId);
                await vendor.save();
            }
        }


        const categories = await Category.find({ _id: { $in: vendor?.categories } }).distinct('name');
        const subCategories = await subCategory.find({ _id: { $in: vendor?.subCategories } }).distinct('name')
        const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: vendor?._id, itemType: 'vendor' })



        return res.status(200).json({ message: 'Vendor', data, vendorName: vendor?.name, vendorImage: vendor?.image, categories, subCategories, isFavorite: favoriteFind ? true : false, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const addReview = async (req, res) => {
    try {

        const userId = req?.user?._id;
        const { vendorId, rating, review, images } = req?.body;
        const vendor = await User.findById(vendorId)
        if (!vendor) { return res.status(400).json({ message: "Vendor not fount" }) }

        const reviewFound = await Review.findOne({
            vendorId,
            userId,
        });
        if (reviewFound) {
            return res.status(400).json({
                success: false,
                message: "Review already added",
            });
        }
        const addReview = new Review({
            userId,
            vendorId,
            rating,
            review,
            images,
        });


        // Update vendor's rating and review count
        vendor.reviewLength = vendor?.reviewLength + 1;
        const totalReviews = vendor?.reviewLength + 1;
        const newRating = ((vendor?.rating * vendor?.reviewLength) + rating) / totalReviews;
        vendor.rating = newRating;
        vendor.reviewLength = totalReviews;
        await vendor.save()
        await addReview.save();
        return res.status(200).json({
            success: true,
            message: "Review added successfully",
        });
    } catch (error) {
        handleError(error, res)
    }
}


const getSellerDetails = async (req, res) => {
    try {
        const { vendorId } = req.query;
        if (!vendorId) { return res.status(400).json({ message: "Vendor Id is required" }) }
        const user = await User.findById(vendorId).select('name image about ')
        if (!user) { return res.status(400).json({ message: 'Vendor Not fount' }) }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = req.query.filter
        const filterEnum = ['Gadget', 'Rental']
        if (!filterEnum.includes(filter)) { return res.status(400).json({ message: 'Invalid Filter' }) }

        const totalGadget = await Gadget.countDocuments({ createdBy: vendorId, isSoldOut: false, isBlocked: false, approveStatus: 'Approved' })
        const totalRental = await RentalService.countDocuments({ createdBy: vendorId, approveStatus: 'Approved', isBlocked: false, })
        let total = filter == 'Gadget' ? totalGadget : totalRental
        let data = []
        if (filter == 'Gadget') {
            data = await Gadget.find({ createdBy: vendorId, isSoldOut: false, isBlocked: false, approveStatus: 'Approved' }).select('coverImage name brandName images lat lng location amount paymentType categoryId description condition specification createdBy').sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
        } else {
            data = await RentalService.find({ createdBy: vendorId, approveStatus: 'Approved', isBlocked: false, }).select('coverImage name brandName images lat lng location amount paymentType categoryId description specification createdBy ').sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
        }

        if (req?.userId) {
            data = await Promise.all(data.map(async (dt) => {
                const favoriteFind = await WishList.findOne({ userId: req?.userId, itemId: dt?._id })
                return {
                    ...dt,
                    isFavorite: favoriteFind ? true : false
                }
            }))
        } else {
            data = await Promise.all(data.map(async (dt) => {
                return {
                    ...dt,
                    isFavorite: false
                }
            }))
        }

        // seller details
        data = await Promise.all(data.map(async (dt) => {
            const seller = await User.findById(dt?.createdBy).select('name image dialCode number')
            return {
                ...dt,
                seller
            }
        }))


        return res.status(200).json({ message: 'Seller Details', user, totalGadget, totalRental, data, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}


module.exports = {
    getCommonVendors, getGadget, getRentalServices, getVendorDetails, addReview, getSellerDetails
}