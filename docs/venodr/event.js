/**
 * @openapi
 * /vendor/add-event:
 *   post:
 *     summary: Create a new event with specified start and end date-times.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventName
 *               - clientName
 *               - startDate
 *               - startTime
 *               - endDate
 *               - endTime
 *               - description
 *             properties:
 *               eventName:
 *                 type: string
 *                 description: Name of the event.
 *                 example: "Wedding Photoshoot"
 *               clientName:
 *                 type: string
 *                 description: Name of the client.
 *                 example: "Alice Johnson"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Event start date (YYYY-MM-DD).
 *                 example: "2025-12-24"
 *               startTime:
 *                 type: string
 *                 description: Event start time in 24h format (HH:mm).
 *                 example: "04:30"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Event end date (YYYY-MM-DD).
 *                 example: "2025-12-24"
 *               endTime:
 *                 type: string
 *                 description: Event end time in 24h format (HH:mm).
 *                 example: "13:30"
 *               lat:
 *                 type: string
 *                 description: Latitude of the event location.
 *                 example: "12.9716"
 *               lng:
 *                 type: string
 *                 description: Longitude of the event location.
 *                 example: "77.5946"
 *               description:
 *                 type: string
 *                 description: Detailed description of the event.
 *                 example: "Full day outdoor wedding shoot."
 *     responses:
 *       200:
 *         description: Event Created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event Created"
 *       400:
 *         description: Bad request due to missing required data or invalid date/time format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required data"
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
 * /vendor/get-event:
 *   get:
 *     summary: Retrieve vendor's events filtered by upcoming, past, or specific date.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: true
 *         description: Type of events to fetch—either upcoming or past.
 *         schema:
 *           type: string
 *           enum: [upcoming, past]
 *           example: "upcoming"
 *       - name: date
 *         in: query
 *         required: false
 *         description: Specific date to filter events within that day (YYYY-MM-DD). Overrides filter logic if present.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-06-16"
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Events"
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109ce"
 *                       eventName:
 *                         type: string
 *                         example: "Wedding Shoot"
 *                       clientName:
 *                         type: string
 *                         example: "Bob Smith"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-24T04:30:00.000Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-24T13:30:00.000Z"
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-24T04:30:00.000Z"
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-24T13:30:00.000Z"
 *                       lat:
 *                         type: string
 *                         example: "12.9716"
 *                       lng:
 *                         type: string
 *                         example: "77.5946"
 *                       description:
 *                         type: string
 *                         example: "Full day outdoor wedding shoot."
 *                 totalPage:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Bad request due to invalid filter value.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Filter"
 *       401:
 *         description: Unauthorized, bearer token missing or invalid.
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
 * /vendor/update-event:
 *   post:
 *     summary: Update an existing event's details.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID of the event to update.
 *                 example: "650c3b2f84a5f528d34e5cb1"
 *               eventName:
 *                 type: string
 *                 description: Updated event name.
 *                 example: "Engagement Shoot"
 *               clientName:
 *                 type: string
 *                 description: Updated client name.
 *                 example: "Emma Watson"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: New start date (YYYY-MM-DD). Must be accompanied by startTime.
 *                 example: "2025-12-25"
 *               startTime:
 *                 type: string
 *                 description: New start time (HH:mm, 24h). Required when startDate is provided.
 *                 example: "10:00"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: New end date (YYYY-MM-DD). Must be accompanied by endTime.
 *                 example: "2025-12-25"
 *               endTime:
 *                 type: string
 *                 description: New end time (HH:mm, 24h). Required when endDate is provided.
 *                 example: "14:00"
 *               lat:
 *                 type: string
 *                 description: New latitude for the event location.
 *                 example: "12.9716"
 *               lng:
 *                 type: string
 *                 description: New longitude for the event location.
 *                 example: "77.5946"
 *               description:
 *                 type: string
 *                 description: Updated description of the event.
 *                 example: "Half-day outdoor engagement shoot."
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event updated"
 *       400:
 *         description: Bad request due to missing ID, timestamps, or invalid filter logic.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "start time is missing"
 *       401:
 *         description: Unauthorized – vendor authentication failed.
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
 * /vendor/deleteEvent:
 *   post:
 *     summary: Delete an event by its identifier.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: Unique identifier of the event to delete.
 *                 example: "650c3b2f84a5f528d34e5cb1"
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event Deleted"
 *       400:
 *         description: Bad request due to missing or invalid `eventId`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "EventId is missing"
 *       401:
 *         description: Unauthorized, vendor authentication failed.
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
 * /vendor/off-full-day:
 *   post:
 *     summary: Toggle the full-day off status for the authenticated vendor.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full-day off status toggled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Full Day Off"
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
