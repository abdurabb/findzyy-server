/**
 * @openapi
 * /user/create-ad:
 *   post:
 *     summary: Create a new rental or gadget ad (user only).
 *     tags:
 *       - Rental & Gadget Ads
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - name
 *               - brandName
 *               - amount
 *               - paymentType
 *               - categoryId
 *               - lat
 *               - lng
 *               - description
 *               - images
 *               - coverImage
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [rental, gadget]
 *                 description: Type of the ad.
 *                 example: rental
 *               name:
 *                 type: string
 *                 example: Canon DSLR Camera
 *               brandName:
 *                 type: string
 *                 example: Canon
 *               amount:
 *                 type: number
 *                 example: 150
 *               paymentType:
 *                 type: string
 *                 enum: [perHour, perWeek, perMonth, perYear]
 *                 example: perDay
 *               categoryId:
 *                 type: string
 *                 example: "663870d2f3c1b4a7d9f1c456"
 *               lat:
 *                 type: string
 *                 example: "40.7128"
 *               lng:
 *                 type: string
 *                 example: "-74.0060"
 *               description:
 *                 type: string
 *                 example: High-quality camera for rent.
 *               coverImage:
 *                 type: string
 *                 example: "https://example.com/images/camera.jpg"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://example.com/images/camera1.jpg"
 *                   - "https://example.com/images/camera2.jpg"
 *               specification:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "24MP"
 *                   - "WiFi enabled"
 *               condition:
 *                 type: string
 *                 enum: [Brand New, Like New, Fairly Used, Used]
 *                 description: Required only for `gadget` ads.
 *                 example: Like New
 *     responses:
 *       200:
 *         description: Ad created successfully, pending admin approval.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item Created, Please Wait For Admin Verification
 *       400:
 *         description: Validation error or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Type is Required
 *       401:
 *         description: Unauthorized. User access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */

/**
 * @openapi
 * /user/update-ad:
 *   post:
 *     summary: Update an existing rental or gadget ad (user only).
 *     tags:
 *       - Rental & Gadget Ads
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the ad to update.
 *                 example: "663870d2f3c1b4a7d9f1c999"
 *               type:
 *                 type: string
 *                 enum: [rental, gadget]
 *                 description: Type of the ad to update.
 *                 example: rental
 *               name:
 *                 type: string
 *                 example: Canon DSLR Camera Updated
 *               brandName:
 *                 type: string
 *                 example: Canon
 *               amount:
 *                 type: number
 *                 example: 180
 *               paymentType:
 *                 type: string
 *                 enum: [perHour, perDay, perWeek, perMonth, perYear]
 *                 example: perDay
 *               categoryId:
 *                 type: string
 *                 description: Must exist in RentalAndGadgetCategory.
 *                 example: "663870d2f3c1b4a7d9f1c456"
 *               lat:
 *                 type: string
 *                 example: "40.7128"
 *               lng:
 *                 type: string
 *                 example: "-74.0060"
 *               description:
 *                 type: string
 *                 example: Updated description for this high-quality camera.
 *               coverImage:
 *                 type: string
 *                 example: "https://example.com/images/camera.jpg"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://example.com/images/camera1.jpg"
 *                   - "https://example.com/images/camera2.jpg"
 *               specification:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "24MP"
 *                   - "Water-resistant"
 *               condition:
 *                 type: string
 *                 enum: [Brand New, Like New, Fairly Used, Used]
 *                 description: Required only for `gadget` ads.
 *                 example: Fairly Used
 *     responses:
 *       200:
 *         description: Ad updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item Updated
 *       400:
 *         description: Validation error or item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This Category not Available Now
 *       401:
 *         description: Unauthorized. User access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */


/**
 * @openapi
 * /user/delete-ad:
 *   post:
 *     summary: Delete an existing rental or gadget ad (user only).
 *     tags:
 *       - Rental & Gadget Ads
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
 *               - type
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the ad to be deleted.
 *                 example: "663870d2f3c1b4a7d9f1c999"
 *               type:
 *                 type: string
 *                 enum: [rental, gadget]
 *                 description: Type of the ad.
 *                 example: gadget
 *     responses:
 *       200:
 *         description: Ad deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item deleted
 *       400:
 *         description: Validation error or item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item not Fount
 *       401:
 *         description: Unauthorized. User access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */


/**
 * @openapi
 * /user/get-my-ads:
 *   get:
 *     summary: Get the logged-in user's rental or gadget ads.
 *     tags:
 *       - Rental & Gadget Ads
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: type
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [rental, gadget]
 *         description: Type of ads to retrieve.
 *       - name: filter
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Rejected]
 *         description: Filter ads by approval status.
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: Successfully fetched user's ads.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ad Fetch
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       coverImage:
 *                         type: string
 *                       name:
 *                         type: string
 *                       brandName:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       lat:
 *                         type: string
 *                       lng:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Type is Required
 *       401:
 *         description: Unauthorized. User access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */


/**
 * @openapi
 * /user/addAvailability-rental-service:
 *   post:
 *     summary: Toggle availability status of a rental service (user only).
 *     tags:
 *       - Rental & Gadget Ads
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
 *                 description: ID of the rental item to toggle availability.
 *                 example: "6638b4a5e2a0c27dfcb13571"
 *     responses:
 *       200:
 *         description: Rental item availability updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item Availability updated
 *       400:
 *         description: Rental item not found or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item not Fount
 *       401:
 *         description: Unauthorized. User access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */


/**
 * @openapi
 * /user/mark-as-gadgetSold:
 *   post:
 *     summary: Mark a gadget as sold out (user only).
 *     tags:
 *       - Rental & Gadget Ads
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
 *                 description: ID of the gadget to be marked as sold.
 *                 example: "6638b4a5e2a0c27dfcb13571"
 *     responses:
 *       200:
 *         description: Gadget marked as sold successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item Sold out Updated
 *       400:
 *         description: Gadget not found or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item not Fount
 *       401:
 *         description: Unauthorized. User access required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
