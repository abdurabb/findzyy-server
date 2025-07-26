const { handleError } = require('../../handler/handleError')
const Category = require('../../models/admin/category')
const SubCategory = require('../../models/admin/subCategory')
const Camera = require('../../models/admin/camera')
const WishList = require('../../models/user/wishlist')


const getProfile = async (req, res) => {
    try {
        const categoryNames = await Category.find({ _id: { $in: req?.user?.categories || [] } }).distinct('name');
        const subCategoryNames = await SubCategory.find({ _id: { $in: req?.user?.subCategories || [] } })
        const cameras = await Camera.find({ _id: { $in: req?.user?.camera || [] } }).select('name')

        const profile = {
            ...req.user._doc,
            categories: categoryNames,
            subCategories: subCategoryNames,
            camera: cameras,
            viewers: req?.user?.viewers?.length,
            wishListCount: await WishList.countDocuments({ itemId: req?.user?._id })
        };
        return res.status(200).json({ message: 'Profile Data', profile });
    } catch (error) {
        handleError(error, res);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { image, name, dialCode, number, gender, about, camera, lens, lights, experience, drivingLicense, mobile, software, gears, instagram, faceBook, pinterest,
            webSite, youTube, companyName, email, lat, lng, location,
        } = req.body;
        const user = req.user;
        if (image) user.image = image;
        if (name) user.name = name;
        if (dialCode) user.dialCode = dialCode;
        if (number) user.number = number;
        if (gender) user.gender = gender;
        if (about) user.about = about;
        if (experience !== undefined) user.experience = experience;
        if (drivingLicense) user.drivingLicense = drivingLicense;
        if (software) user.software = Array.isArray(software) ? software.join(', ') : software;;
        if (instagram) user.instagram = instagram;
        if (faceBook) user.faceBook = faceBook;
        if (pinterest) user.pinterest = pinterest;
        if (webSite) user.webSite = webSite;
        if (youTube) user.youTube = youTube;
        if (companyName) user.companyName = companyName;
        if (email) user.email = email;
        if (lat) user.lat = lat;
        if (lng) user.lng = lng;
        if (location) user.location = location
        if (lat && lng) {
            user.locationPoint = {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        }

        // Assign array fields (replace existing arrays only if input is an array)
        if (Array.isArray(camera)) {
            for (const cam of camera) {
                const isExist = await Camera.findById(cam)
                if (!isExist) { return res.status(400).json({ message: 'Camera not fount' }) }
            }
            user.camera = camera;
        }
        if (Array.isArray(lens)) user.lens = lens;
        if (Array.isArray(lights)) user.lights = lights;
        if (Array.isArray(mobile)) user.mobile = mobile;
        if (Array.isArray(gears)) user.gears = gears;

        await user.save()
        return res.status(200).json({ message: 'Profile Updated Successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    getProfile, updateProfile
}