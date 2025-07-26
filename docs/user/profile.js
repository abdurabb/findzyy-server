/**
 * @openapi
 * /user/get-profile:
 *   get:
 *     summary: Retrieve the authenticated user's profile data.
 *     tags:
 *       - User Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile Data"
 *                 profile:
 *                   type: object
 *                   description: Authenticated user's profile data.
 *                   example:
 *                     _id: "60f7f9a8e13f4b3a2c8d4e99"
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     role: "user"
 *                     createdAt: "2025-01-01T00:00:00.000Z"
 *                     updatedAt: "2025-06-01T12:00:00.000Z"
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
 * /user/update-profile:
 *   post:
 *     summary: Update the authenticated user's profile.
 *     tags:
 *       - User Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               dialCode:
 *                 type: string
 *                 example: "+1"
 *               number:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 example: "female"
 *               about:
 *                 type: string
 *                 example: "Professional photographer based in NYC."
 *               experience:
 *                 type: number
 *                 example: 5
 *               drivingLicense:
 *                 type: boolean
 *                 example: true
 *               software:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Photoshop", "Lightroom"]
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/janedoe"
 *               faceBook:
 *                 type: string
 *                 example: "https://facebook.com/janedoe"
 *               pinterest:
 *                 type: string
 *                 example: "https://pinterest.com/janedoe"
 *               webSite:
 *                 type: string
 *                 example: "https://janedoe.com"
 *               youTube:
 *                 type: string
 *                 example: "https://youtube.com/janedoe"
 *               companyName:
 *                 type: string
 *                 example: "Jane Doe Photography"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               lat:
 *                 type: number
 *                 example: 40.7128
 *               lng:
 *                 type: number
 *                 example: -74.0060
 *               camera:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Canon EOS R5"]
 *               lens:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["24-70mm", "50mm"]
 *               lights:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Godox AD200"]
 *               mobile:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["iPhone 14 Pro"]
 *               gears:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tripod", "Gimbal"]
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile Updated Successfully"
 *       400:
 *         description: Bad request. Invalid or missing data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
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
