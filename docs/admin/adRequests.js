/**
 * @openapi
 * /admin/get-ad:
 *   get:
 *     summary: Retrieve a paginated list of rental or gadget ads by status (admin only).
 *     tags:
 *       - Ad Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [rental, gadget]
 *         description: Type of ad to fetch (rental or gadget).
 *       - in: query
 *         name: filter
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Rejected]
 *         description: Filter by approval status.
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search ads by name (case-insensitive).
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of ads per page.
 *     responses:
 *       200:
 *         description: Ads fetched successfully.
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
 *                       _id:
 *                         type: string
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
 *                       category:
 *                         type: string
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
 *                   example: Invalid Type
 *       401:
 *         description: Unauthorized. Admin access required.
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
 * /admin/get-ad-details:
 *   get:
 *     summary: Get detailed information about a rental or gadget ad (admin only).
 *     tags:
 *       - Ad Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [rental, gadget]
 *         description: The type of the ad (rental or gadget).
 *       - in: query
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ad to fetch.
 *     responses:
 *       200:
 *         description: Ad details fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ad Details
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     brandName:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     paymentType:
 *                       type: string
 *                       enum: [perHour, perWeek, perMonth, perYear]
 *                     categoryId:
 *                       type: string
 *                     lat:
 *                       type: string
 *                     lng:
 *                       type: string
 *                     description:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     specification:
 *                       type: array
 *                       items:
 *                         type: string
 *                     approveStatus:
 *                       type: string
 *                       enum: [Pending, Approved, Rejected]
 *                     isBlocked:
 *                       type: boolean
 *                     rejectReason:
 *                       type: string
 *                     category:
 *                       type: string
 *                       description: Name of the category
 *                     seller:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         dialCode:
 *                           type: string
 *                         number:
 *                           type: string
 *                         image:
 *                           type: string
 *       400:
 *         description: Missing or invalid parameters, or item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: _id is required
 *       401:
 *         description: Unauthorized. Admin access required.
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
 * /admin/take-ad-action:
 *   post:
 *     summary: Take action on a rental or gadget ad (Approve, Reject, Block) — Admin only.
 *     tags:
 *       - Ad Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - _id
 *               - type
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [Approve, Reject, Block, Unblock]
 *                 description: The action to be taken on the ad.
 *                 example: Approve
 *               _id:
 *                 type: string
 *                 description: The ID of the rental or gadget ad.
 *                 example: 661a4b4ff2c1b7462d3e23c1
 *               type:
 *                 type: string
 *                 enum: [rental, gadget]
 *                 description: Type of the ad (rental or gadget).
 *                 example: rental
 *               reason:
 *                 type: string
 *                 description: Required if action is "Reject". The reason for rejection.
 *                 example: "The image quality is too poor for listing."
 *     responses:
 *       200:
 *         description: Action taken successfully on the ad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item Approved Successfully
 *       400:
 *         description: Bad request due to missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Action is Required
 *       401:
 *         description: Unauthorized. Admin access required.
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
