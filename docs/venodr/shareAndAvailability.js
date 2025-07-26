/**
 * @openapi
 * /vendor/create-share-and-availability:
 *   post:
 *     summary: Create a new share and availability entry for the authenticated vendor.
 *     tags:
 *       - Share And Availability
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Share and availability data to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - description
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the share and availability.
 *                 example: "2025-06-16T00:00:00.000Z"
 *               description:
 *                 type: string
 *                 description: Description of the share and availability.
 *                 example: "Available for outdoor shoots on weekends."
 *               lat:
 *                 type: string
 *                 description: Latitude location (optional).
 *                 example: "37.7749"
 *               lng:
 *                 type: string
 *                 description: Longitude location (optional).
 *                 example: "-122.4194"
 *               status:
 *                 type: string
 *                 description: Status of the entry (optional).
 *                 enum: [Created, Completed, Deleted]
 *                 default: Created
 *                 example: "Created"
 *     responses:
 *       200:
 *         description: Share and availability created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Created Share And Availability"
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
 * /vendor/get-share-and-availability:
 *   get:
 *     summary: Get paginated share and availability entries filtered by status for the authenticated vendor.
 *     tags:
 *       - Share And Availability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Created, Completed, Deleted]
 *         required: true
 *         description: Status filter for share and availability entries.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of items per page for pagination (default is 10).
 *     responses:
 *       200:
 *         description: Paginated list of share and availability entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Help Desk"
 *                 shareAndAvailability:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f9b1e8e001f8e4b7a"
 *                       vendorId:
 *                         type: string
 *                         example: "60c72a559b1e8e001f8e4b75"
 *                       status:
 *                         type: string
 *                         enum: [Created, Completed, Deleted]
 *                         example: "Created"
 *                       lat:
 *                         type: string
 *                         example: "37.7749"
 *                       lng:
 *                         type: string
 *                         example: "-122.4194"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-16T00:00:00.000Z"
 *                       description:
 *                         type: string
 *                         example: "Available for outdoor shoots on weekends."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T12:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-10T12:00:00.000Z"
 *                 totalPage:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Invalid status provided.
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
 * /vendor/change-share-and-availability-status:
 *   post:
 *     summary: Change the status of a Share And Availability entry for the authenticated vendor.
 *     tags:
 *       - Share And Availability
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The ID of the Share And Availability entry and the new status.
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
 *                 description: The ID of the Share And Availability entry to update.
 *                 example: "60c72b2f9b1e8e001f8e4b7a"
 *               status:
 *                 type: string
 *                 description: The new status for the entry.
 *                 enum: [Completed, Deleted]
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Status changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status Changed"
 *       400:
 *         description: Invalid request data or entry not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "_id is required  // or Invalid Status or Share And Availability Not Fount"
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
