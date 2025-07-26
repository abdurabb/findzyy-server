/**
 * @openapi
 * /user/wishlist:
 *   post:
 *     summary: Toggle an item in the user's wishlist. Adds if not present, removes if already exists.
 *     tags:
 *       - WishList
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
 *               - itemId
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of item to add/remove from the wishlist.
 *                 enum: [gadget, rental, vendor]
 *                 example: "gadget"
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to add/remove from the wishlist.
 *                 example: "60f7f9a8e13f4b3a2c8d4e99"
 *     responses:
 *       200:
 *         description: Wishlist action completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "WishList Action completed"
 *       400:
 *         description: Missing or invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     missingType:
 *                       summary: Type is missing
 *                       value: "Type is required"
 *                     invalidType:
 *                       summary: Invalid type value
 *                       value: "Invalid Type"
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



/**
 * @openapi
 * /user/get-wish-list:
 *   get:
 *     summary: Retrieve the user's wishlist items by type with optional filtering and pagination.
 *     tags:
 *       - WishList
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [gadget, rental, vendor]
 *           example: gadget
 *         required: true
 *         description: Type of wishlist items to retrieve.
 *       - in: query
 *         name: itemId
 *         schema:
 *           type: string
 *           example: "60f7f9a8e13f4b3a2c8d4e77"
 *         required: false
 *         description: Optional specific item ID to filter by.
 *     responses:
 *       200:
 *         description: Wishlist items retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "WishList"
 *                 wishList:
 *                   type: array
 *                   description: Array of wishlist items.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7f9a8e13f4b3a2c8d4e99"
 *                       userId:
 *                         type: string
 *                         example: "60f7f9a8e13f4b3a2c8d4e88"
 *                       itemId:
 *                         type: string
 *                         example: "60f7f9a8e13f4b3a2c8d4e77"
 *                       itemType:
 *                         type: string
 *                         enum: [gadget, rental, vendor]
 *                         example: "gadget"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-15T10:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-15T10:00:00.000Z"
 *                 totalPage:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Missing or invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     missingType:
 *                       summary: Missing type parameter
 *                       value: "Type is required"
 *                     invalidType:
 *                       summary: Invalid type value
 *                       value: "Invalid Type"
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

