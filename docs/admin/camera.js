/**
 * @openapi
 * /admin/add-camera:
 *   post:
 *     summary: Add a new camera
 *     tags:
 *       - Camera
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
 *                 description: Name of the camera (must be unique, case-insensitive)
 *                 example: "Canon EOS 90D"
 *     responses:
 *       200:
 *         description: Camera created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Camera Created
 *       400:
 *         description: Camera with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Camera is Already Exist
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
 * /admin/get-camera:
 *   get:
 *     summary: Retrieve a list of all cameras
 *     tags:
 *       - Camera
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of cameras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cameras
 *                 cameras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "663b1234a6f8f8001cf0a123"
 *                       name:
 *                         type: string
 *                         example: "Canon EOS 90D"
 *                       model:
 *                         type: string
 *                         example: "EOS 90D"
 *                       brand:
 *                         type: string
 *                         example: "Canon"
 *                       price:
 *                         type: number
 *                         example: 1299.99
 *                       description:
 *                         type: string
 *                         example: "High-resolution DSLR camera with 32.5MP sensor"
 *                       specs:
 *                         type: object
 *                         example:
 *                           sensor: "APS-C"
 *                           resolution: "32.5MP"
 *                           video: "4K"
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
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
 * /admin/update-camera:
 *   post:
 *     summary: Update an existing camera's name
 *     tags:
 *       - Camera
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
 *               - name
 *             properties:
 *               _id:
 *                 type: string
 *                 description: MongoDB ObjectId of the camera to update
 *                 example: "663b1234a6f8f8001cf0a123"
 *               name:
 *                 type: string
 *                 description: New name for the camera (must be unique, case-insensitive)
 *                 example: "Canon EOS R6 Mark II"
 *     responses:
 *       200:
 *         description: Camera updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Camera Updated
 *       400:
 *         description: Validation error or duplicate camera name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Camera is Already Exist
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
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
 * /admin/delete-camera:
 *   post:
 *     summary: Delete a camera by its ID
 *     tags:
 *       - Camera
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
 *                 description: MongoDB ObjectId of the camera to be deleted
 *                 example: "663b1234a6f8f8001cf0a123"
 *     responses:
 *       200:
 *         description: Camera deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Camera Deleted
 *       400:
 *         description: Missing _id or camera not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: _id is required
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
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
