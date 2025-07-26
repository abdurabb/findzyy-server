const express = require('express')
const router = express.Router()
const { protectVendor } = require('../middleware/auth')
const { addDetails, createAlbum, getAlbum, editAlbum, deleteAlbum, addPhotos, addVideos } = require('../controller/vendor/detailsAdd')
const { createHelpDesk, getHelpDesk, changeHelpDeskStatus } = require('../controller/vendor/helpDesk')
const { createShareAndAvailability, getShareAndAvailability, changeShareAndAvailabilityStatus } = require('../controller/vendor/shareAndAvailability')
const { addEvent, getEvent, updateEvent, deleteEvent, fullDayOff } = require('../controller/vendor/event')


router.post('/add-details', protectVendor, addDetails)
router.post('/create-album', protectVendor, createAlbum)
router.get('/get-my-album', protectVendor, getAlbum)
router.post('/edit-album', protectVendor, editAlbum)
router.post('/delete-album', protectVendor, deleteAlbum)
router.post('/add-photo', protectVendor, addPhotos)
router.post('/add-video', protectVendor, addVideos)

// helpDesk
router.post('/create-help-desk', protectVendor, createHelpDesk)
router.get('/get-help-desk', protectVendor, getHelpDesk)
router.post('/change-help-desk-status', protectVendor, changeHelpDeskStatus)

// share & availability
router.post('/create-share-and-availability', protectVendor, createShareAndAvailability)
router.get('/get-share-and-availability', protectVendor, getShareAndAvailability)
router.post('/change-share-and-availability-status', protectVendor, changeShareAndAvailabilityStatus)

// events
router.post('/add-event', protectVendor, addEvent)
router.get('/get-event', protectVendor, getEvent)
router.post('/update-event', protectVendor, updateEvent)
router.post('/deleteEvent', protectVendor, deleteEvent)
router.post('/off-full-day', protectVendor, fullDayOff)




module.exports = router