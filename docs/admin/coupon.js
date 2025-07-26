

/**
 * @openapi
 * /admin/create-coupon:
 *   post:
 *     summary: Create a new discount coupon
 *     tags:
 *       - Coupon Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - couponCode
 *               - discount
 *               - usageLimit
 *               - minimumPurchase
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the coupon
 *                 example: "Summer Discount"
 *               couponCode:
 *                 type: string
 *                 description: Unique coupon code (case-insensitive)
 *                 example: "SUMMER25"
 *               discount:
 *                 type: number
 *                 description: Discount percentage or fixed amount
 *                 example: 25
 *               usageLimit:
 *                 type: string
 *                 description: Maximum number of times this coupon can be used
 *                 example: "100"
 *               minimumPurchase:
 *                 type: number
 *                 description: Minimum order value required to apply the coupon
 *                 example: 500
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date (inclusive) of the coupon validity
 *                 example: "2025-06-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date (inclusive) of the coupon validity
 *                 example: "2025-06-30"
 *     responses:
 *       200:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon Created Successfully
 *       400:
 *         description: Coupon code already exists or missing/invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon code is Exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @openapi
 * /admin/get-coupons:
 *   get:
 *     summary: Get a paginated list of all coupons
 *     tags:
 *       - Coupon Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of coupons per page (default is 10)
 *         example: 10
 *     responses:
 *       200:
 *         description: Coupons fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupons
 *                 coupons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "663b1234a6f8f8001cf0a123"
 *                       name:
 *                         type: string
 *                         example: "Holiday Discount"
 *                       couponCode:
 *                         type: string
 *                         example: "HOLIDAY50"
 *                       discount:
 *                         type: number
 *                         example: 50
 *                       usageLimit:
 *                         type: string
 *                         example: "100"
 *                       minimumPurchase:
 *                         type: number
 *                         example: 300
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T00:00:00.000Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-30T23:59:59.999Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @openapi
 * /admin/update-coupon:
 *   post:
 *     summary: Update an existing coupon by its ID
 *     tags:
 *       - Coupon Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: MongoDB ObjectId of the coupon to update
 *                 example: "663b1234a6f8f8001cf0a123"
 *               name:
 *                 type: string
 *                 description: Updated name of the coupon
 *                 example: "Spring Discount"
 *               couponCode:
 *                 type: string
 *                 description: Updated coupon code (must be unique)
 *                 example: "SPRING25"
 *               discount:
 *                 type: number
 *                 description: Updated discount amount or percentage
 *                 example: 25
 *               usageLimit:
 *                 type: string
 *                 description: Updated usage limit
 *                 example: "150"
 *               minimumPurchase:
 *                 type: number
 *                 description: Updated minimum purchase amount
 *                 example: 400
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Updated start date (will be normalized to midnight)
 *                 example: "2025-06-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Updated end date (will be normalized to end of day)
 *                 example: "2025-06-30"
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon Updated Successfully
 *       400:
 *         description: Validation error, missing _id, or duplicate coupon code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon code is Exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @openapi
 * /admin/delete-coupon:
 *   post:
 *     summary: Delete a coupon by its ID
 *     tags:
 *       - Coupon Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: MongoDB ObjectId of the coupon to be deleted
 *                 example: "663b1234a6f8f8001cf0a123"
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon Deleted Successfully
 *       400:
 *         description: Missing _id field in the request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: _id is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
