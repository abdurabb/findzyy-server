const express = require('express')
const router = express.Router()

const { register, verifyOtp, sendOtp, userDataCollect, userDataCollectionOtpVerification } = require('../controller/user/auth')
const { getHome, getSubCategories, getCategories, getAllSubCategories, getAllCameras, getRentalAndGadgetCategories } = require('../controller/user/mainPage')
const { protectCommonUser, protectUser } = require('../middleware/auth')
const { createAd, updateAd, getMyAds, addAvailabilityRental, markAsSold, deleteAd } = require('../controller/user/ad')
const { getProfile, updateProfile } = require('../controller/user/profile')
const { wishListAction, getWishList } = require('../controller/user/wishlist')

// vendor- photographer - visual artist
const { getArtistPlan, purchasePlan } = require('../controller/vendor/auth')
const { getCommonVendors, getGadget, getRentalServices, getSellerDetails, getVendorDetails, addReview } = require('../controller/user/vendor')
const { getNotification } = require('../controller/user/notification')

router.post('/register', register)
router.post('/verify-otp', verifyOtp)
router.post('/send-otp', sendOtp)

// home
router.get('/get-home', protectCommonUser, getHome)
router.get('/get-categories', protectCommonUser, getCategories)
router.get('/get-rentalAndGadget-categories', protectCommonUser, getRentalAndGadgetCategories)
router.get('/get-all-subCategories-based-on-multiple-category', protectCommonUser, getAllSubCategories)
router.get('/get-all-cameras', protectCommonUser, getAllCameras)
router.get('/get-sub-categories', protectCommonUser, getSubCategories)
router.get('/get-all-subCategories', protectCommonUser,)

// get vendors
router.get('/get-vendors', protectCommonUser, getCommonVendors)
router.get('/get-gadget', protectCommonUser, getGadget)
router.get('/get-rental-services', protectCommonUser, getRentalServices)
router.get('/get-seller-details', protectCommonUser, getSellerDetails)
router.get('/get-vendor-details', protectCommonUser, getVendorDetails)
router.post('/add-review', protectUser, addReview)

// profile
router.get('/get-profile', protectUser, getProfile)
router.post('/update-profile', protectUser, updateProfile)

// wishList
router.post('/wishlist', protectUser, wishListAction)
router.get('/get-wish-list', protectUser, getWishList)

// become a photographer / vendor
router.post('/get-artist-plans', protectUser, getArtistPlan)
router.post('/purchase-artist-plan', protectUser, purchasePlan)

// notification
router.get('/get-notification', protectUser, getNotification)

// ad gadgets and rental
router.post('/create-ad', protectUser, createAd)
router.post('/update-ad', protectUser, updateAd)
router.post('/delete-ad', protectUser, deleteAd)
router.get('/get-my-ads', protectUser, getMyAds)
router.post('/addAvailability-rental-service', protectUser, addAvailabilityRental)
router.post('/mark-as-gadgetSold', protectUser, markAsSold)



// data collection
router.post('/user-data-collect', userDataCollect)
router.post('/user-data-collect-otp-verification', userDataCollectionOtpVerification)


module.exports = router