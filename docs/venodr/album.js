/**
 * @openapi
 * /vendor/create-album:
 *   post:
 *     summary: Create a new album with photos and videos for the authenticated vendor.
 *     tags:
 *       - Vendor Album
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
 *               - coverImage
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wedding Highlights"
 *               coverImage:
 *                 type: string
 *                 example: "https://example.com/cover.jpg"
 *               location:
 *                 type: string
 *                 example: "Paris, France"
 *               photos:
 *                 type: array
 *                 description: Array of photo objects.
 *                 items:
 *                   type: object
 *                   required: [imageInfo]
 *                   properties:
 *                     imageInfo:
 *                       type: object
 *                       required: [public_id, secure_url, bytes, signature]
 *                       properties:
 *                         public_id:
 *                           type: string
 *                           example: "photo123"
 *                         secure_url:
 *                           type: string
 *                           example: "https://example.com/photo.jpg"
 *                         bytes:
 *                           type: integer
 *                           example: 1048576
 *                         signature:
 *                           type: string
 *                           example: "abc123signature"
 *               videos:
 *                 type: array
 *                 description: Array of video objects.
 *                 items:
 *                   type: object
 *                   required: [videoInfo]
 *                   properties:
 *                     videoInfo:
 *                       type: object
 *                       required: [public_id, secure_url, playback_url, bytes, signature, duration]
 *                       properties:
 *                         public_id:
 *                           type: string
 *                           example: "video123"
 *                         secure_url:
 *                           type: string
 *                           example: "https://example.com/video.mp4"
 *                         playback_url:
 *                           type: string
 *                           example: "https://example.com/video-playback.mp4"
 *                         bytes:
 *                           type: integer
 *                           example: 52428800
 *                         duration:
 *                           type: number
 *                           example: 120.5
 *                         signature:
 *                           type: string
 *                           example: "xyz789signature"
 *     responses:
 *       200:
 *         description: Album created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Album Created"
 *       400:
 *         description: Validation error (e.g., missing fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing Image Required Data"
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
 * /vendor/get-my-album:
 *   get:
 *     summary: Retrieve paginated list of albums created by the authenticated vendor.
 *     tags:
 *       - Vendor Album
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
 *     responses:
 *       200:
 *         description: Vendor albums retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Albums"
 *                 albums:
 *                   type: array
 *                   description: Array of album objects.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7f9a8e13f4b3a2c8d4e99"
 *                       vendorId:
 *                         type: string
 *                         example: "60f7f9a8e13f4b3a2c8d4e88"
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             image:
 *                               type: string
 *                               example: "https://example.com/photo.jpg"
 *                             imageInfo:
 *                               type: object
 *                               properties:
 *                                 public_id:
 *                                   type: string
 *                                 secure_url:
 *                                   type: string
 *                                 bytes:
 *                                   type: integer
 *                                 signature:
 *                                   type: string
 *                                 fileInMb:
 *                                   type: number
 *                                 fileInGb:
 *                                   type: number
 *                       videos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             video:
 *                               type: string
 *                               example: "https://example.com/video.mp4"
 *                             videoInfo:
 *                               type: object
 *                               properties:
 *                                 public_id:
 *                                   type: string
 *                                 secure_url:
 *                                   type: string
 *                                 playback_url:
 *                                   type: string
 *                                 bytes:
 *                                   type: integer
 *                                 signature:
 *                                   type: string
 *                                 duration:
 *                                   type: number
 *                                 fileInMb:
 *                                   type: number
 *                                 fileInGb:
 *                                   type: number
 *                                 durationFormatted:
 *                                   type: string
 *                                   example: "2m"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-16T12:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-16T12:30:00.000Z"
 *                 totalPages:
 *                   type: integer
 *                   example: 5
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
 * /vendor/delete-album:
 *   post:
 *     summary: Delete an album by its ID (vendor only).
 *     tags:
 *       - Vendor Album
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
 *                 description: ID of the album to be deleted.
 *                 example: "60f7f9a8e13f4b3a2c8d4e99"
 *     responses:
 *       200:
 *         description: Album deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Album Deleted"
 *       400:
 *         description: Missing album ID or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "_id is required"
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
 * /vendor/add-photo:
 *   post:
 *     summary: Add photos to an existing album for the authenticated vendor.
 *     tags:
 *       - Vendor Album
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
 *               - photos
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Album ID to which photos will be added.
 *                 example: "60d21b4667d0d8992e610c85"
 *               photos:
 *                 type: array
 *                 description: Array of photo objects to add.
 *                 items:
 *                   type: object
 *                   required: [imageInfo]
 *                   properties:
 *                     imageInfo:
 *                       type: object
 *                       required: [public_id, secure_url, bytes, signature]
 *                       properties:
 *                         public_id:
 *                           type: string
 *                           example: "photo123"
 *                         secure_url:
 *                           type: string
 *                           example: "https://example.com/photo.jpg"
 *                         bytes:
 *                           type: integer
 *                           example: 1048576
 *                         signature:
 *                           type: string
 *                           example: "abc123signature"
 *     responses:
 *       200:
 *         description: Photos successfully added to the album.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Photos Added"
 *       400:
 *         description: Validation error (e.g., missing album ID or photo data).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "_id is required"
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
 * /vendor/add-video:
 *   post:
 *     summary: Add videos to an existing album for the authenticated vendor.
 *     tags:
 *       - Vendor Album
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
 *               - videos
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Album ID to which videos will be added.
 *                 example: "60d21b4667d0d8992e610c85"
 *               videos:
 *                 type: array
 *                 description: Array of video objects to add.
 *                 items:
 *                   type: object
 *                   required: [videoInfo]
 *                   properties:
 *                     videoInfo:
 *                       type: object
 *                       required: [public_id, secure_url, bytes, signature, playback_url, duration]
 *                       properties:
 *                         public_id:
 *                           type: string
 *                           example: "video123"
 *                         secure_url:
 *                           type: string
 *                           example: "https://example.com/video.mp4"
 *                         playback_url:
 *                           type: string
 *                           example: "https://example.com/video-playback.mp4"
 *                         bytes:
 *                           type: integer
 *                           example: 52428800
 *                         duration:
 *                           type: number
 *                           description: Duration in seconds
 *                           example: 120.5
 *                         signature:
 *                           type: string
 *                           example: "xyz789signature"
 *     responses:
 *       200:
 *         description: Videos successfully added to the album.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Videos Added"
 *       400:
 *         description: Validation error (e.g., missing album ID or video data).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "_id is required"
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
