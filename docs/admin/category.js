/**
 * @openapi
 * /admin/addCategory:
 *   post:
 *     summary: Add a new category (admin only).
 *     tags:
 *       - Category Management
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the new category.
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Created
 *       400:
 *         description: Category already exists or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Already Created in Same name
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
 * /admin/get-categories:
 *   get:
 *     summary: Get a paginated list of categories (admin only).
 *     tags:
 *       - Category Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of categories per page.
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categories
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60c72b2f9b1d8e001c8a7e8d
 *                       name:
 *                         type: string
 *                         example: Electronics
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-05-01T12:34:56.789Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-05-01T12:34:56.789Z
 *                 totalPages:
 *                   type: integer
 *                   example: 5
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
 * /admin/edit-category:
 *   post:
 *     summary: Edit an existing category by ID (admin only).
 *     tags:
 *       - Category Management
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
 *                 description: The ID of the category to update.
 *                 example: "60c72b2f9b1d8e001c8a7e8d"
 *               name:
 *                 type: string
 *                 description: The new name for the category.
 *                 example: "Updated Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Updated
 *       400:
 *         description: Invalid ID or category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Not Found
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
 * /admin/delete-category:
 *   post:
 *     summary: Delete a category by ID (admin only).
 *     tags:
 *       - Category Management
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
 *                 description: The ID of the category to delete.
 *                 example: "60c72b2f9b1d8e001c8a7e8d"
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Deleted Successfully
 *       400:
 *         description: Invalid ID or category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Not Found
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
 * /admin/add-sub-category:
 *   post:
 *     summary: Add a new sub-category under a category (admin only).
 *     tags:
 *       - SubCategory Management
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
 *               - image
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the new sub-category.
 *                 example: "Smartphones"
 *               image:
 *                 type: string
 *                 description: Image URL or path for the sub-category.
 *                 example: "https://example.com/images/smartphones.jpg"
 *               categoryId:
 *                 type: string
 *                 description: The ID of the parent category.
 *                 example: "60c72b2f9b1d8e001c8a7e8d"
 *     responses:
 *       200:
 *         description: Sub-category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sub Category Created
 *       400:
 *         description: Sub-category already exists or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sub Category Already Created in Same name
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
 * /admin/get-sub-category:
 *   get:
 *     summary: Get paginated sub-categories by category ID (admin only).
 *     tags:
 *       - SubCategory Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the parent category to filter sub-categories.
 *         example: "60c72b2f9b1d8e001c8a7e8d"
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
 *         description: Number of sub-categories per page.
 *     responses:
 *       200:
 *         description: Sub-categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categories
 *                 subCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f9b1d8e001c8a7e8e"
 *                       name:
 *                         type: string
 *                         example: "Smartphones"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/images/smartphones.jpg"
 *                       categoryId:
 *                         type: string
 *                         example: "60c72b2f9b1d8e001c8a7e8d"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Missing category ID or bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Id is required
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
 * /admin/edit-sub-category:
 *   post:
 *     summary: Edit an existing sub-category (admin only).
 *     tags:
 *       - SubCategory Management
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
 *                 description: The ID of the sub-category to update.
 *                 example: "60c72b2f9b1d8e001c8a7e8e"
 *               name:
 *                 type: string
 *                 description: The new name for the sub-category (optional).
 *                 example: "Updated Smartphones"
 *               image:
 *                 type: string
 *                 description: The new image URL or path for the sub-category (optional).
 *                 example: "https://example.com/images/updated-smartphones.jpg"
 *     responses:
 *       200:
 *         description: Sub-category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sub Category Updated
 *       400:
 *         description: Invalid ID or sub-category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sub Category not found
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
 * /admin/delete-sub-category:
 *   post:
 *     summary: Delete a sub-category by ID (admin only).
 *     tags:
 *       - SubCategory Management
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
 *                 description: The ID of the sub-category to delete.
 *                 example: "60c72b2f9b1d8e001c8a7e8e"
 *     responses:
 *       200:
 *         description: Sub-category deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: SubCategory Deleted Successfully
 *       400:
 *         description: Invalid ID or sub-category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Not Found
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




