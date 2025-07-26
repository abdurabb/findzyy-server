const express = require('express')
const router = express.Router()
const { protectAdmin } = require('../middleware/auth')
const { addCategory, getCategories, getAllCategories, editCategory, deleteCategory, addSubCategory, getSubCategory, editSubCategory, deleteSubCategory } = require('../controller/admin/category')
const { sendOtp, verifyOtp, Login } = require('../controller/admin/auth')
const { addBanner, editBanner, deleteBanner, getBanners } = require('../controller/admin/banner')
const { addRentalAndGadgetCategory, getRentalAndGadgetCategories, updateRentalAndGadgetCategory, deleteRentalAndGadgetCategory,
    getAd, getAdDetails, takeAdAction
} = require('../controller/admin/rentalAndGadget')
const { createPlans, getPlans, updatePlan, deletePlan } = require('../controller/admin/plans')
const { createCoupon, getCoupons, deleteCoupon, updateCoupon, couponUsageHistory } = require('../controller/admin/coupon')
const { addCamera, getCamera, updateCamera, deleteCamera } = require('../controller/admin/camera')
const { getSubscribers, getSubScriberDetails, getVendorGallery } = require('../controller/admin/subscribers')
const { getDashBoard } = require('../controller/admin/dashBoard')

// login
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/login', Login)

// dashBoard
router.get('/get-dash-board', protectAdmin, getDashBoard)

// category
router.post('/addCategory', protectAdmin, addCategory)
router.get('/get-categories', protectAdmin, getCategories)
router.get('/get-all-categories', protectAdmin, getAllCategories)
router.post('/edit-category', protectAdmin, editCategory)
router.post('/delete-category', protectAdmin, deleteCategory)

// sub category
router.post('/add-sub-category', protectAdmin, addSubCategory)
router.get('/get-sub-category', protectAdmin, getSubCategory)
router.post('/edit-sub-category', protectAdmin, editSubCategory)
router.post('/delete-sub-category', protectAdmin, deleteSubCategory)

// rental and gadget category
router.post('/add-rentalAndGadget-category', protectAdmin, addRentalAndGadgetCategory)
router.get('/get-rental-gadget-categories', protectAdmin, getRentalAndGadgetCategories)
router.post('/edit-rental-gadget-category', protectAdmin, updateRentalAndGadgetCategory)
router.post('/delete-rental-gadget-category', protectAdmin, deleteRentalAndGadgetCategory)

// ad requests
router.get('/get-ad', protectAdmin, getAd)
router.get('/get-ad-details', protectAdmin, getAdDetails)
router.post('/take-ad-action', protectAdmin, takeAdAction)


// banner
router.post('/add-banner', protectAdmin, addBanner)
router.post('/edit-banner', protectAdmin, editBanner)
router.post('/delete-banner', protectAdmin, deleteBanner)
router.get('/get-banners', protectAdmin, getBanners)

// plans
router.post('/create-plans', protectAdmin, createPlans)
router.get('/getPlans', protectAdmin, getPlans)
router.post('/update-plan', protectAdmin, updatePlan)
router.post('/delete-plan', protectAdmin, deletePlan)

// coupons
router.post('/create-coupon', protectAdmin, createCoupon)
router.get('/get-coupons', protectAdmin, getCoupons)
router.post('/update-coupon', protectAdmin, updateCoupon)
router.post('/delete-coupon', protectAdmin, deleteCoupon)
router.get('/coupon-usage-history', protectAdmin, couponUsageHistory)

// camera
router.post('/add-camera', protectAdmin, addCamera)
router.get('/get-camera', protectAdmin, getCamera)
router.post('/update-camera', protectAdmin, updateCamera)
router.post('/delete-camera', protectAdmin, deleteCamera)

// subscribers
router.get('/get-subScribers', protectAdmin, getSubscribers)
router.get('/get-subscriber-details', protectAdmin, getSubScriberDetails)
router.get('/get-vendor-gallery', protectAdmin, getVendorGallery)






module.exports = router