/**
 * @openapi
 * /admin/create-plans:
 *   post:
 *     summary: Create a new subscription plan
 *     tags:
 *       - Plan Management
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
 *               - price
 *               - category
 *               - specifications
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the plan
 *                 example: "Premium Plan"
 *               price:
 *                 type: number
 *                 description: Base price of the plan
 *                 example: 100
 *               offerPrice:
 *                 type: number
 *                 description: Discounted price (must be less than or equal to price)
 *                 example: 80
 *               category:
 *                 type: string
 *                 description: MongoDB ObjectId of the category this plan belongs to
 *                 example: "663ab90a0f3e6e001cbcad99"
 *               specifications:
 *                 type: array
 *                 description: List of specifications or features included in the plan
 *                 items:
 *                   type: string
 *                 example: ["Feature A", "Feature B"]
 *               tax:
 *                 type: number
 *                 description: Optional tax percentage or amount
 *                 example: 5
 *     responses:
 *       200:
 *         description: Plan Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan Created
 *       400:
 *         description: Invalid input such as offerPrice greater than price or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OfferPrice Must be Less than price
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
 * /admin/getPlans:
 *   get:
 *     summary: Fetch a paginated list of all subscription plans
 *     tags:
 *       - Plan Management
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
 *         description: Number of plans per page (default is 10)
 *         example: 10
 *     responses:
 *       200:
 *         description: Plans fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan Fetched Successfully
 *                 plans:
 *                   type: array
 *                   description: Array of plan objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "663abae1e96e1a001c132d4a"
 *                       name:
 *                         type: string
 *                         example: "Premium Plan"
 *                       price:
 *                         type: number
 *                         example: 100
 *                       offerPrice:
 *                         type: number
 *                         example: 80
 *                       category:
 *                         type: string
 *                         example: "663ab90a0f3e6e001cbcad99"
 *                       specifications:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Feature A", "Feature B"]
 *                       tax:
 *                         type: number
 *                         example: 5
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
 * /admin/update-plan:
 *   post:
 *     summary: Update an existing subscription plan
 *     tags:
 *       - Plan Management
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
 *                 description: MongoDB ObjectId of the plan to update
 *                 example: "663abae1e96e1a001c132d4a"
 *               name:
 *                 type: string
 *                 description: Updated name of the plan
 *                 example: "Updated Premium Plan"
 *               price:
 *                 type: number
 *                 description: Updated base price of the plan (must be greater than 0)
 *                 example: 120
 *               offerPrice:
 *                 type: number
 *                 description: Updated offer price (must be less than or equal to price)
 *                 example: 100
 *               category:
 *                 type: string
 *                 description: Updated category ID
 *                 example: "663ab90a0f3e6e001cbcad99"
 *               specifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of plan specifications
 *                 example: ["New Feature A", "New Feature B"]
 *               tax:
 *                 type: number
 *                 description: Updated tax percentage or amount
 *                 example: 10
 *     responses:
 *       200:
 *         description: Plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan updated successfully
 *       400:
 *         description: Validation error or missing fields (e.g., _id, price <= 0, offerPrice > price)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Offer price must be less than or equal to price
 *       404:
 *         description: Plan or Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan not found
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
 * /admin/delete-plan:
 *   post:
 *     summary: Delete a subscription plan by its ID
 *     tags:
 *       - Plan Management
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
 *                 description: MongoDB ObjectId of the plan to be deleted
 *                 example: "663abae1e96e1a001c132d4a"
 *     responses:
 *       200:
 *         description: Plan deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan Deleted Successfully
 *       400:
 *         description: Missing required _id field
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
