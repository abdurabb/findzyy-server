/**
 * @openapi
 * /admin/send-otp:
 *   post:
 *     summary: Send an OTP to a registered admin email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the admin to receive the OTP.
 *                 example: "admin@example.com"
 *     responses:
 *       201:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully.
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60c72b2f9b1d8e001c8a7e8d
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *                     role:
 *                       type: string
 *                       example: superAdmin
 *                     isOtpVerified:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Missing or unregistered email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email is required.
 *       500:
 *         description: Failed to send OTP or internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to send OTP.
 *                 error:
 *                   type: string
 *                   example: Mail service unavailable.
 */


/**
 * @openapi
 * /admin/verify-otp:
 *   post:
 *     summary: Verify the OTP sent to the admin's email and return an authentication token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - firebaseToken
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the admin.
 *                 example: admin@example.com
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the email.
 *                 example: "123456"
 *               firebaseToken:
 *                 type: string
 *                 description: Firebase device token for push notifications.
 *                 example: "fcmDeviceToken123"
 *     responses:
 *       200:
 *         description: OTP verified successfully and token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60c72b2f9b1d8e001c8a7e8d
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *                     role:
 *                       type: string
 *                       example: superAdmin
 *                     isOtpVerified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Missing fields, invalid OTP, or expired OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid OTP.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */
