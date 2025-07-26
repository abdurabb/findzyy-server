/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Register a new user or Vendor.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dialCode
 *               - number
 *               - gender
 *               - role
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: "John Doe"
 *               dialCode:
 *                 type: string
 *                 description: The dial code for the user's phone number.
 *                 example: "+1"
 *               number:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: "5551234567"
 *               gender:
 *                 type: string
 *                 description: The gender of the user.
 *                 example: "Male"
 *               role:
 *                 type: string
 *                 enum: ["user", "Vendor"]
 *                 description: The role of the user, either "user" or "Vendor".
 *                 example: "user"
 *               image:
 *                 type: string
 *                 description: The URL or path of the user's profile image.
 *                 example: "https://example.com/images/user-profile.jpg"
 *     responses:
 *       200:
 *         description: OTP sent successfully for phone number verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP Sent Successfully
 *                 dialCode:
 *                   type: string
 *                   example: "+1"
 *                 number:
 *                   type: string
 *                   example: "5551234567"
 *       500:
 *         description: Failed to send OTP or internal error.
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
 *                   example: "Failed to send OTP."
 *                 error:
 *                   type: string
 *                   example: "Internal error message"
 */


/**
 * @openapi
 * /user/verify-otp:
 *   post:
 *     summary: Verify OTP for user registration or authentication.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dialCode
 *               - number
 *               - otp
 *             properties:
 *               dialCode:
 *                 type: string
 *                 description: The dial code for the user's phone number.
 *                 example: "+1"
 *               number:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: "5551234567"
 *               otp:
 *                 type: string
 *                 description: The OTP received by the user.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully.
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
 *                   description: The JWT token for the authenticated user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjI0YzZkYS0xYzE3LTQ3YTktYWVjMC1kZmY4YTI1Y2RmZGQiLCJpYXQiOjE2MjU1NTY3MTAsImV4cCI6MTYyNTU2MDMxMH0.Kg6dfdEwz0eeujgkwTXf-K08sfBXX7kCXjWogxVVu6I"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1d8e001c8a7e8d"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     dialCode:
 *                       type: string
 *                       example: "+1"
 *                     number:
 *                       type: string
 *                       example: "5551234567"
 *                     gender:
 *                       type: string
 *                       example: "Male"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/images/user-profile.jpg"
 *       400:
 *         description: Invalid OTP, OTP expired, or user not found.
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
 *                   example: "Invalid OTP."
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
 *                   example: "Internal server error."
 */


/**
 * @openapi
 * /user/send-otp:
 *   post:
 *     summary: Send OTP for user registration or phone number verification.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dialCode
 *               - number
 *             properties:
 *               dialCode:
 *                 type: string
 *                 description: The dial code for the user's phone number.
 *                 example: "+1"
 *               number:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: "5551234567"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP Sent Successfully
 *       400:
 *         description: User not found in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not Found
 *       500:
 *         description: Failed to send OTP due to server error.
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
 *                   example: "Failed to send OTP."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
