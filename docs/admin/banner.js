/**
 * @openapi
 * /admin/add-banner:
 *   post:
 *     summary: Add a new banner (image or video) with a date range.
 *     tags:
 *       - Banner Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileType
 *               - file
 *               - startDate
 *               - endDate
 *             properties:
 *               fileType:
 *                 type: string
 *                 enum: [video, image]
 *                 description: The type of the banner file.
 *                 example: image
 *               file:
 *                 type: string
 *                 description: URL or path to the banner file.
 *                 example: "https://example.com/banners/banner1.jpg"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date for the banner display (inclusive).
 *                 example: "2025-05-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date for the banner display (inclusive).
 *                 example: "2025-05-10"
 *     responses:
 *       200:
 *         description: Banner added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner Added Successfully
 *       400:
 *         description: Missing required fields like startDate or endDate.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Start Date is Required
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
 * /admin/edit-banner:
 *   post:
 *     summary: Edit an existing banner's details such as file, type, or date range.
 *     tags:
 *       - Banner Management
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
 *                 description: The ID of the banner to be edited.
 *                 example: "6636dfeee12bfa28fc4bff63"
 *               fileType:
 *                 type: string
 *                 enum: [video, image]
 *                 description: The type of the banner file.
 *                 example: image
 *               file:
 *                 type: string
 *                 description: URL or path to the banner file.
 *                 example: "https://example.com/banners/updated-banner.jpg"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The new start date for banner visibility (optional).
 *                 example: "2025-05-05"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The new end date for banner visibility (optional).
 *                 example: "2025-05-15"
 *     responses:
 *       200:
 *         description: Banner updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner Updated Successfully
 *       400:
 *         description: Banner not found or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner not found
 *       500:
 *         description: Internal server error while updating the banner.
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
 * /admin/delete-banner:
 *   post:
 *     summary: Delete a banner by its ID.
 *     tags:
 *       - Banner Management
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
 *                 description: The ID of the banner to delete.
 *                 example: "6636e0a5e12bfa28fc4bff68"
 *     responses:
 *       200:
 *         description: Banner deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner Deleted successfully
 *       400:
 *         description: Banner not found or _id not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner not found
 *       500:
 *         description: Server error while deleting the banner.
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
 * /admin/get-banners:
 *   get:
 *     summary: Retrieve a list of banners with pagination.
 *     tags:
 *       - Banner Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of banners per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of banners retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "banners"
 *                 banners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the banner.
 *                         example: "6239f38b1a2f3d001c8a7e8d"
 *                       fileType:
 *                         type: string
 *                         enum: ["video", "image"]
 *                         description: The type of the banner file.
 *                         example: "image"
 *                       file:
 *                         type: string
 *                         description: The URL or path to the banner file.
 *                         example: "http://example.com/banner.jpg"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         description: The start date for the banner's display.
 *                         example: "2025-05-05T00:00:00Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         description: The end date for the banner's display.
 *                         example: "2025-06-05T23:59:59Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the banner.
 *                         example: "2025-05-05T10:00:00Z"
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages based on the pagination settings.
 *                   example: 5
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
