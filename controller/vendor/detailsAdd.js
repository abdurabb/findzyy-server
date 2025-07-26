const { handleError } = require('../../handler/handleError')
const Album = require('../../models/vendor/album')
const SubCategory = require('../../models/admin/subCategory')
const Camera = require('../../models/admin/camera')
const { convertBytesToMb, convertBytesToGb, convertSecToMinute } = require('../../handler/fileConverter')

const addDetails = async (req, res) => {
    try {
        const { lat, lng, location, about, camera, lens, subCategories, lights, experience, drivingLicense, mobile, software, gears, instagram, faceBook, pinterest, webSite, youTube } = req?.body;
        //  sub category checking
        for (const cat of subCategories) {
            const findSub = await SubCategory.findById(cat)
            if (!findSub) { return res.status(400).json({ message: 'Sub Category not fount' }) }
        }


        const user = req?.user
        if (lat) user.lat = lat;
        if (lng) user.lng = lng;
        if (location) user.location = location
        if (about) user.about = about;
        if (camera) {
            // checking
            for (const cam of camera) {
                const isExist = await Camera.findById(cam)
                if (!isExist) { return res.status(400).json({ message: 'Camera not fount' }) }
            }
            user.camera = camera;
        }
        if (lens) user.lens = lens;
        if (lights) user.lights = lights;
        if (experience) user.experience = experience;
        if (drivingLicense) user.drivingLicense = drivingLicense;
        if (mobile) user.mobile = mobile;
        if (software) user.software = Array.isArray(software) ? software.join(', ') : software;
        if (gears) user.gears = gears;
        if (instagram) user.instagram = instagram;
        if (faceBook) user.faceBook = faceBook;
        if (pinterest) user.pinterest = pinterest;
        if (webSite) user.webSite = webSite;
        if (youTube) user.youTube = youTube;
        if (subCategories) {
            if (subCategories?.length) user.subCategories = subCategories;
        }


        user.isDetailsAdded = true

        if (lat && lng) {
            user.locationPoint = {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        }
        await user.save()

        return res.status(200).json({ message: 'Details Added' })
    } catch (error) {
        handleError(error, res)
    }
}

const createAlbum = async (req, res) => {
    try {
        const { photos, videos } = req?.body
        let photosArray = [], videosArray = []

        for (const photo of photos) {
            if (!photo?.imageInfo || !photo?.imageInfo?.public_id || !photo?.imageInfo?.secure_url || !photo?.imageInfo?.bytes || !photo?.imageInfo?.signature) {
                return res.status(400).json({ message: 'Missing Image Required Data' })
            }
            let image = photo.imageInfo?.secure_url
            const imageFileInMb = convertBytesToMb(photo?.imageInfo?.bytes)
            const imageFileInGb = convertBytesToGb(photo?.imageInfo?.bytes)
            let imageInfo = {
                ...photo?.imageInfo,
                fileInMb: imageFileInMb,
                fileInGb: imageFileInGb
            }
            photosArray.push({
                image,
                imageInfo
            })
        }

        for (const video of videos) {
            if (!video?.videoInfo || !video?.videoInfo?.public_id || !video?.videoInfo?.secure_url || !video?.videoInfo?.bytes || !video?.videoInfo?.signature || !video?.videoInfo?.playback_url || !video?.videoInfo?.duration) {
                return res.status(400).json({ message: 'Missing Image Required Data' })
            }

            let videoFileInMb = convertBytesToMb(video?.videoInfo?.bytes)
            let videoFileInGb = convertBytesToGb(video?.videoInfo?.bytes)

            // duration
            let durationFormatted = ""
            let durationInMin = convertSecToMinute(video?.videoInfo?.duration);
            if (durationInMin >= 60) {
                const hours = Math.floor(durationInMin / 60);
                const minutes = Math.round(durationInMin % 60);
                durationFormatted = `${hours}h ${minutes}m`;
            } else {
                durationFormatted = `${Math.round(durationInMin)}m`;
            }

            let videoInfo = {
                ...video?.videoInfo,
                fileInMb: videoFileInMb,
                fileInGb: videoFileInGb,
                durationFormatted
            }
            let videoUrl = video?.videoInfo?.playback_url


            videosArray.push({
                video: videoUrl,
                videoInfo
            })
        }

        await Album.create({
            ...req?.body,
            vendorId: req?.userId,
            photos: photosArray,
            videos: videosArray
        })
        return res.status(200).json({ message: 'Album Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getAlbum = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit;

        const albums = await Album.find({ vendorId: req?.userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const total = await Album.countDocuments({ vendorId: req?.userId })
        return res.status(200).json({ message: 'Albums', albums, totalPages: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const editAlbum = async (req, res) => {
    try {
        const { _id, name, coverImage, location, } = req.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const album = await Album.findById(_id)
        if (!album) { return res.status(400).json({ message: 'Album not Fount' }) }
        if (name) album.name = name
        if (coverImage) album.coverImage = coverImage
        if (location) album.location = location
        await album.save()
        return res.status(200).json({ message: 'Album Updated' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        await Album.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Album Deleted' })
    } catch (error) {
        handleError(error, res)
    }
}

const addPhotos = async (req, res) => {
    try {
        const { _id, photos } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const album = await Album.findById(_id)
        if (!album) { return res.status(400).json({ message: 'Album not Fount' }) }

        for (const photo of photos) {
            if (!photo?.imageInfo || !photo?.imageInfo?.public_id || !photo?.imageInfo?.secure_url || !photo?.imageInfo?.bytes || !photo?.imageInfo?.signature) {
                return res.status(400).json({ message: 'Missing Image Required Data' })
            }
            let image = photo.imageInfo?.secure_url
            const imageFileInMb = convertBytesToMb(photo?.imageInfo?.bytes)
            const imageFileInGb = convertBytesToGb(photo?.imageInfo?.bytes)
            let imageInfo = {
                ...photo?.imageInfo,
                fileInMb: imageFileInMb,
                fileInGb: imageFileInGb
            }
            album.photos.push({
                image,
                imageInfo
            })
        }
        await album.save()
        return res.status(200).json({ message: 'Photos Added' })

    } catch (error) {
        handleError(error, res)
    }
}

const addVideos = async (req, res) => {
    try {
        const { _id, videos } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const album = await Album.findById(_id)
        if (!album) { return res.status(400).json({ message: 'Album not Fount' }) }

        for (const video of videos) {
            if (!video?.videoInfo || !video?.videoInfo?.public_id || !video?.videoInfo?.secure_url || !video?.videoInfo?.bytes || !video?.videoInfo?.signature || !video?.videoInfo?.playback_url || !video?.videoInfo?.duration) {
                return res.status(400).json({ message: 'Missing Image Required Data' })
            }

            let videoFileInMb = convertBytesToMb(video?.videoInfo?.bytes)
            let videoFileInGb = convertBytesToGb(video?.videoInfo?.bytes)

            // duration
            let durationFormatted = ""
            let durationInMin = convertSecToMinute(video?.videoInfo?.duration);
            if (durationInMin >= 60) {
                const hours = Math.floor(durationInMin / 60);
                const minutes = Math.round(durationInMin % 60);
                durationFormatted = `${hours}h ${minutes}m`;
            } else {
                durationFormatted = `${Math.round(durationInMin)}m`;
            }

            let videoInfo = {
                ...video?.videoInfo,
                fileInMb: videoFileInMb,
                fileInGb: videoFileInGb,
                durationFormatted
            }
            let videoUrl = video?.videoInfo?.playback_url


            album.videos.push({
                video: videoUrl,
                videoInfo
            })
        }

        await album.save()
        return res.status(200).json({ message: 'Videos Added' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    addDetails, createAlbum, getAlbum, editAlbum, deleteAlbum, addPhotos, addVideos
}