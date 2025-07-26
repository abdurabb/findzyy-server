/**
 * @openapi
 * /user/get-artist-plans:
 *   post:
 *     summary: Get the most suitable artist plan based on selected categories and optional coupon.
 *     tags:
 *       - Plan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categories
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of category IDs selected by the user.
 *                 example: ["6239f38b1a2f3d001c8a7e8d", "6239f38b1a2f3d001c8a7e8f"]
 *               couponCode:
 *                 type: string
 *                 description: Optional coupon code to apply discount.
 *                 example: "WELCOME20"
 *     responses:
 *       200:
 *         description: Plan calculated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plans"
 *                 plan:
 *                   type: object
 *                   description: Selected plan details.
 *                 planPrice:
 *                   type: number
 *                   example: 4999
 *                 planOfferPrice:
 *                   type: number
 *                   example: 4499
 *                 gst:
 *                   type: number
 *                   example: 810
 *                 discount:
 *                   type: number
 *                   example: 500
 *                 total:
 *                   type: number
 *                   example: 4809
 *                 currency:
 *                   type: string
 *                   example: "INR"
 *                 country:
 *                   type: string
 *                   example: "India"
 *                 currencySymbol:
 *                   type: string
 *                   example: "₹"
 *       400:
 *         description: Bad request due to validation errors or invalid coupon.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Minimum purchase of ₹5000 required to apply this coupon."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */


/**
 * @openapi
 * /user/purchase-artist-plan:
 *   post:
 *     summary: Purchase a plan for an artist based on selected categories and optional coupon.
 *     tags:
 *       - Plan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categories
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of selected category IDs.
 *                 example: ["6239f38b1a2f3d001c8a7e8d", "6239f38b1a2f3d001c8a7e8f"]
 *               couponCode:
 *                 type: string
 *                 description: Optional coupon code to apply discount.
 *                 example: "SAVE20"
 *     responses:
 *       200:
 *         description: Plan purchased successfully and applied to user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plan purchased successfully."
 *                 plan:
 *                   type: object
 *                   description: Purchased plan details.
 *                 planOfferPrice:
 *                   type: number
 *                   example: 4499
 *                 gst:
 *                   type: number
 *                   example: 810
 *                 discount:
 *                   type: number
 *                   example: 500
 *                 total:
 *                   type: number
 *                   example: 4809
 *                 planEndDate:
 *                   type: string
 *                   format: date
 *                   example: "2026-05-17"
 *                 role:
 *                   type: string
 *                   example: "vendor"
 *       400:
 *         description: Bad request due to invalid coupon or purchase conditions not met.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Minimum purchase of ₹5000 required to apply this coupon."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @openapi
 * /vendor/add-details:
 *   post:
 *     summary: Add or update vendor-specific details for the authenticated vendor.
 *     tags:
 *       - Add Vendor Details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *                 example: 40.7128
 *               lng:
 *                 type: number
 *                 example: -74.0060
 *               about:
 *                 type: string
 *                 example: "Professional event photographer based in NYC."
 *               camera:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Canon EOS R5", "Nikon Z6"]
 *               lens:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["24-70mm", "85mm"]
 *               lights:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Godox AD200", "LED Panel"]
 *               experience:
 *                 type: number
 *                 example: 7
 *               drivingLicense:
 *                 type: boolean
 *                 example: true
 *               mobile:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["iPhone 14 Pro", "Samsung Galaxy S22"]
 *               software:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Photoshop", "Lightroom"]
 *               gears:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tripod", "Gimbal"]
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/vendorprofile"
 *               faceBook:
 *                 type: string
 *                 example: "https://facebook.com/vendorprofile"
 *               pinterest:
 *                 type: string
 *                 example: "https://pinterest.com/vendorprofile"
 *               webSite:
 *                 type: string
 *                 example: "https://vendorportfolio.com"
 *               youTube:
 *                 type: string
 *                 example: "https://youtube.com/@vendorchannel"
 *     responses:
 *       200:
 *         description: Vendor details added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Details Added"
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */


