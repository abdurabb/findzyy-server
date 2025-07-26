/**
 * @openapi
 * /user/get-notification:
 *   get:
 *     summary: Retrieve notifications for the logged-in user.
 *     tags:
 *       - Notifications
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
 *         description: Number of notifications per page.
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: notification
 *                 notification:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6655b2f2e123ab456c789abc"
 *                       title:
 *                         type: string
 *                         example: "Event Booking Confirmed"
 *                       description:
 *                         type: string
 *                         example: "Your event has been confirmed for June 25th."
 *                       receivers:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "6655a1f4e123ab456c789abc"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-17T10:30:00.000Z"
 *                       helpDeskId:
 *                         type: object
 *                         nullable: true
 *                         description: Help desk reference (if populated).
 *                 totalPage:
 *                   type: integer
 *                   example: 2
 *       401:
 *         description: Unauthorized. User token missing or invalid.
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
