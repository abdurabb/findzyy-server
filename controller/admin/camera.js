const { handleError } = require('../../handler/handleError')
const Camera = require('../../models/admin/camera')
const User = require('../../models/user/userSchema')

const addCamera = async (req, res) => {
    try {
        const isExist = await Camera.findOne({
            name: { $regex: `^${req?.body?.name}$`, $options: 'i' }
        });
        if (isExist) { return res.status(400).json({ message: 'Camera is Already Exist' }) }
        await Camera.create(req?.body)
        return res.status(200).json({ message: 'Camera Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getCamera = async (req, res) => {
    try {
        const cameras = await Camera.find({})
        return res.status(200).json({ message: 'Cameras', cameras })
    } catch (error) {
        handleError(error, res)
    }
}

const updateCamera = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const camera = await Camera.findById(_id)
        if (!camera) { return res.status(400).json({ message: 'Camera not Fount' }) }
        const isExist = await Camera.findOne({
            _id: { $ne: _id }, // Correct syntax for "not equal"
            name: { $regex: `^${req?.body?.name}$`, $options: 'i' } // Case-insensitive match
        });
        if (isExist) { return res.status(400).json({ message: 'Camera is Already Exist' }) }
        camera.name = req?.body?.name
        await camera.save()
        return res.status(200).json({ message: 'Camera Updated' })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteCamera = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) { return res.status(400).json({ message: '_id is required' }) }
        const camera = await Camera.findById(_id)
        if (!camera) { return res.status(400).json({ message: 'Camera not Fount' }) }

        await User.updateMany(
            { categories: { $in: _id } },
            { $pull: { categories: _id } }
        );
        await Camera.deleteOne({ _id: _id })
        return res.status(200).json({ message: 'Camera Deleted' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    addCamera, getCamera, updateCamera, deleteCamera
}