/**
 * @openapi
 * /vendor/create-help-desk:
 *   post:
 *     summary: Create a new help desk ticket for the authenticated vendor.
 *     tags:
 *       - Vendor Help Desk
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - problem
 *               - date
 *             properties:
 *               problem:
 *                 type: string
 *                 description: Description of the problem.
 *                 example: "Camera malfunction during shoot."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the problem occurrence.
 *                 example: "2025-06-16T10:00:00Z"
 *               status:
 *                 type: string
 *                 enum: [Created, Completed, Removed]
 *                 description: Status of the help desk ticket (optional).
 *                 example: "Created"
 *               lat:
 *                 type: string
 *                 description: Latitude of the location related to the problem (optional).
 *                 example: "37.7749"
 *               lng:
 *                 type: string
 *                 description: Longitude of the location related to the problem (optional).
 *                 example: "-122.4194"
 *     responses:
 *       200:
 *         description: Help Desk ticket created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Help Desk Created"
 *       400:
 *         description: Validation error or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Problem is required"
 *       401:
 *         description: Unauthorized. Vendor token is missing or invalid.
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
 * /vendor/get-help-desk:
 *   get:
 *     summary: Retrieve paginated help desk tickets for the authenticated vendor filtered by status.
 *     tags:
 *       - Vendor Help Desk
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
 *         description: Number of items per page.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Created, Completed, Removed]
 *         required: true
 *         description: Filter help desk tickets by status.
 *     responses:
 *       200:
 *         description: List of help desk tickets with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Help Desk"
 *                 helpDesk:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109ca"
 *                       vendorId:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cb"
 *                       problem:
 *                         type: string
 *                         example: "Camera malfunction during shoot."
 *                       status:
 *                         type: string
 *                         example: "Created"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-16T10:00:00Z"
 *                       lat:
 *                         type: string
 *                         example: "37.7749"
 *                       lng:
 *                         type: string
 *                         example: "-122.4194"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-15T08:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-15T08:30:00Z"
 *                 totalPage:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Invalid status query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Status"
 *       401:
 *         description: Unauthorized. Vendor token is missing or invalid.
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
 * /vendor/change-help-desk-status:
 *   post:
 *     summary: Change the status of a help desk ticket for the authenticated vendor.
 *     tags:
 *       - Vendor Help Desk
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Help desk ticket ID and new status.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - status
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the help desk ticket.
 *                 example: "60d0fe4f5311236168a109ca"
 *               status:
 *                 type: string
 *                 description: New status to set (must be either "Completed" or "Removed").
 *                 enum: [Completed, Removed]
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status Changed"
 *       400:
 *         description: Bad request due to missing ID or invalid status or help desk not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Status"
 *       401:
 *         description: Unauthorized. Vendor token is missing or invalid.
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
