/**
 * @openapi
 * /user/get-home:
 *   get:
 *     summary: Retrieve data for the home page.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: false
 *         description: Latitude for location-based filtering of vendors, rentals, and gadgets.
 *         schema:
 *           type: number
 *           example: 12.9716
 *       - name: lng
 *         in: query
 *         required: false
 *         description: Longitude for location-based filtering of vendors, rentals, and gadgets.
 *         schema:
 *           type: number
 *           example: 77.5946
 *     responses:
 *       200:
 *         description: Data for the home page retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Home Page"
 *                 data:
 *                   type: object
 *                   properties:
 *                     banners:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           fileType:
 *                             type: string
 *                             example: "image"
 *                           file:
 *                             type: string
 *                             format: uri
 *                             example: "https://example.com/banner.jpg"
 *                           startDate:
 *                             type: string
 *                             format: date-time
 *                           endDate:
 *                             type: string
 *                             format: date-time
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                     photoGraphers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           image:
 *                             type: string
 *                             example: "https://example.com/vendor.jpg"
 *                           name:
 *                             type: string
 *                           lat:
 *                             type: string
 *                           lng:
 *                             type: string
 *                           location:
 *                             type: string
 *                           categories:
 *                             type: array
 *                             items:
 *                               type: string
 *                           isFavorite:
 *                             type: boolean
 *                     rental:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           coverImage:
 *                             type: string
 *                           name:
 *                             type: string
 *                           brandName:
 *                             type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           lat:
 *                             type: string
 *                           lng:
 *                             type: string
 *                           location:
 *                             type: string
 *                           amount:
 *                             type: number
 *                           paymentType:
 *                             type: string
 *                           isFavorite:
 *                             type: boolean
 *                     gadgets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           coverImage:
 *                             type: string
 *                           name:
 *                             type: string
 *                           brandName:
 *                             type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           lat:
 *                             type: string
 *                           lng:
 *                             type: string
 *                           location:
 *                             type: string
 *                           amount:
 *                             type: number
 *                           paymentType:
 *                             type: string
 *                           isFavorite:
 *                             type: boolean
 *                     user:
 *                       type: string
 *                       example: "John Doe"
 *                     dialCode:
 *                       type: string
 *                       example: "+91"
 *                     number:
 *                       type: string
 *                       example: "9876543210"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/user.jpg"
 *                     upcomingEvents:
 *                       type: integer
 *                       example: 3
 *                     completedEvents:
 *                       type: integer
 *                       example: 12
 *                     todayEvents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           startDate:
 *                             type: string
 *                             format: date-time
 *                           endDate:
 *                             type: string
 *                             format: date-time
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
 * /user/get-categories:
 *   get:
 *     summary: Retrieve a list of categories with optional search filter.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter categories by name.
 *     responses:
 *       200:
 *         description: Successfully retrieved categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categories
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f5a3dc2b1e8d001f0c1e3a"
 *                       name:
 *                         type: string
 *                         example: "Photography"
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
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

/**
 * @openapi
 * /user/get-all-subCategories-based-on-multiple-category:
 *   get:
 *     summary: Retrieve a list of subcategories filtered by optional search and multiple category IDs.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter subcategories by name.
 *       - in: query
 *         name: categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60f5a3dc2b1e8d001f0c1e3a", "60f5a3dc2b1e8d001f0c1e3b"]
 *         style: form
 *         explode: false
 *         required: false
 *         description: Array of category IDs to filter subcategories.
 *     responses:
 *       200:
 *         description: Successfully retrieved subcategories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sub Categories
 *                 subCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f5a3dc2b1e8d001f0c1e3c"
 *                       name:
 *                         type: string
 *                         example: "Nature Photography"
 *                       categoryId:
 *                         type: string
 *                         example: "60f5a3dc2b1e8d001f0c1e3a"
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
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

/**
 * @openapi
 * /user/get-all-cameras:
 *   get:
 *     summary: Retrieve a list of all cameras with optional search filter
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter cameras by name (case-insensitive)
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
 *                         example: "Canon EOS R7"
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
 * /user/get-rentalAndGadget-categories:
 *   get:
 *     summary: Get Rental and Gadget categories with optional search filter.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter rental and gadget categories by name.
 *     responses:
 *       200:
 *         description: Successfully retrieved rental and gadget categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rental And Gadget Categories
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f5a3dc2b1e8d001f0c1e3a"
 *                       name:
 *                         type: string
 *                         example: "Camera Gear"
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
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


/**
 * @openapi
 * /user/get-sub-categories:
 *   get:
 *     summary: Retrieve sub-categories by category.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         required: true
 *         description: The ID of the category for which the sub-categories should be fetched.
 *         schema:
 *           type: string
 *           example: "6239f38b1a2f3d001c8a7e8d"
 *       - name: page
 *         in: query
 *         description: The page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of items per page for pagination (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Sub-categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categories"
 *                 subCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6239f38b1a2f3d001c8a7e8e"
 *                       name:
 *                         type: string
 *                         example: "Mobile Phones"
 *                       categoryId:
 *                         type: string
 *                         example: "6239f38b1a2f3d001c8a7e8d"
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Bad request, category ID is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category Id is required"
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
 * /user/get-vendors:
 *   get:
 *     summary: Retrieve vendors filtered by category, sub-category, camera, availability, and location.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search vendors by name (case-insensitive).
 *         schema:
 *           type: string
 *           example: "John"
 *       - name: category
 *         in: query
 *         required: false
 *         description: Category ID or list of IDs to filter vendors.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60d0fe4f5311236168a109ca"]
 *       - name: subCategory
 *         in: query
 *         required: false
 *         description: Sub-category ID or list of IDs to filter vendors.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60d0fe4f5311236168a109cb"]
 *       - name: camera
 *         in: query
 *         required: false
 *         description: Camera ID or list of camera IDs to filter vendors.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["6640fe4f5311236168a1f9db"]
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Start date to filter vendors based on availability.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *       - name: startTime
 *         in: query
 *         required: false
 *         description: Start time to filter vendors based on availability.
 *         schema:
 *           type: string
 *           example: "10:00"
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: End date to filter vendors based on availability.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-06-30"
 *       - name: endTime
 *         in: query
 *         required: false
 *         description: End time to filter vendors based on availability.
 *         schema:
 *           type: string
 *           example: "18:00"
 *       - name: lat
 *         in: query
 *         required: false
 *         description: Latitude to filter vendors by location.
 *         schema:
 *           type: number
 *           example: 12.9716
 *       - name: lng
 *         in: query
 *         required: false
 *         description: Longitude to filter vendors by location.
 *         schema:
 *           type: number
 *           example: 77.5946
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of vendors per page (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Vendors retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vendors"
 *                 vendors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cb"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Photography", "Videography"]
 *                       isFavorite:
 *                         type: boolean
 *                         example: true
 *                 totalPage:
 *                   type: integer
 *                   example: 5
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
 * /user/get-gadget:
 *   get:
 *     summary: Retrieve available gadgets listed by other users with optional filters.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of items per page for pagination (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: category
 *         in: query
 *         description: Filter gadgets by category ID.
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109aa"
 *       - name: search
 *         in: query
 *         description: Search gadgets by name or brand name.
 *         schema:
 *           type: string
 *           example: "iPhone"
 *       - name: lat
 *         in: query
 *         description: User latitude for possible future location-based filtering.
 *         schema:
 *           type: number
 *           example: 12.9716
 *       - name: lng
 *         in: query
 *         description: User longitude for possible future location-based filtering.
 *         schema:
 *           type: number
 *           example: 77.5946
 *     responses:
 *       200:
 *         description: Gadgets retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "gadgets"
 *                 gadgets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cc"
 *                       coverImage:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       name:
 *                         type: string
 *                         example: "iPhone 13 Pro"
 *                       brandName:
 *                         type: string
 *                         example: "Apple"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                       lat:
 *                         type: number
 *                         example: 12.9716
 *                       lng:
 *                         type: number
 *                         example: 77.5946
 *                       amount:
 *                         type: number
 *                         example: 85000
 *                       paymentType:
 *                         type: string
 *                         example: "UPI"
 *                       isFavorite:
 *                         type: boolean
 *                         example: true
 *                 totalPage:
 *                   type: integer
 *                   example: 4
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
 * /user/get-rental-services:
 *   get:
 *     summary: Retrieve available rental services listed by other users with optional filters.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of items per page for pagination (default is 10).
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: category
 *         in: query
 *         description: Filter rental services by category ID.
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109aa"
 *       - name: search
 *         in: query
 *         description: Search rental services by name or brand name.
 *         schema:
 *           type: string
 *           example: "Camera"
 *       - name: lat
 *         in: query
 *         description: User latitude (optional, reserved for future use).
 *         schema:
 *           type: number
 *           example: 12.9716
 *       - name: lng
 *         in: query
 *         description: User longitude (optional, reserved for future use).
 *         schema:
 *           type: number
 *           example: 77.5946
 *     responses:
 *       200:
 *         description: Rental services retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "rental"
 *                 rental:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cd"
 *                       coverImage:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       name:
 *                         type: string
 *                         example: "Camera Rental Service"
 *                       brandName:
 *                         type: string
 *                         example: "Canon"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                       lat:
 *                         type: number
 *                         example: 12.9716
 *                       lng:
 *                         type: number
 *                         example: 77.5946
 *                       amount:
 *                         type: number
 *                         example: 1500
 *                       paymentType:
 *                         type: string
 *                         example: "Cash"
 *                       isFavorite:
 *                         type: boolean
 *                         example: true
 *                 totalPage:
 *                   type: integer
 *                   example: 3
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
 * /user/get-seller-details:
 *   get:
 *     summary: Retrieve details of a vendor and their listings (gadgets or rentals).
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: vendorId
 *         in: query
 *         required: true
 *         description: The vendor's user ID.
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109cc"
 *       - name: filter
 *         in: query
 *         required: true
 *         description: Filter type to fetch either 'Gadget' or 'Rental' listings.
 *         schema:
 *           type: string
 *           enum: [Gadget, Rental]
 *           example: Gadget
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
 *         description: Vendor and listings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seller Details"
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                     about:
 *                       type: string
 *                       example: "Professional camera gear rental expert."
 *                 totalGadget:
 *                   type: integer
 *                   example: 12
 *                 totalRental:
 *                   type: integer
 *                   example: 7
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cd"
 *                       name:
 *                         type: string
 *                         example: "Canon EOS R5"
 *                       brandName:
 *                         type: string
 *                         example: "Canon"
 *                       coverImage:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                       lat:
 *                         type: number
 *                         example: 12.9716
 *                       lng:
 *                         type: number
 *                         example: 77.5946
 *                       location:
 *                         type: string
 *                         example: "Bangalore"
 *                       amount:
 *                         type: number
 *                         example: 2000
 *                       paymentType:
 *                         type: string
 *                         example: "UPI"
 *                       categoryId:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109aa"
 *                       description:
 *                         type: string
 *                         example: "High-end mirrorless camera perfect for photography."
 *                       specification:
 *                         type: string
 *                         example: "45MP, 8K video, Dual Pixel AF"
 *                       condition:
 *                         type: string
 *                         example: "Like New"
 *                       createdBy:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109cc"
 *                       isFavorite:
 *                         type: boolean
 *                         example: true
 *                 totalPage:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vendor Id is required"
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid.
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
 *                   example: "Internal server error"
 */



/**
 * @openapi
 * /user/get-vendor-details:
 *   get:
 *     summary: Retrieve detailed information about a vendor (about, gallery, or reviews).
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: vendorId
 *         in: query
 *         required: true
 *         description: The ID of the vendor to fetch details for.
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *       - name: status
 *         in: query
 *         required: true
 *         description: "The type of detail to retrieve: about, gallery, or reviews."
 *         schema:
 *           type: string
 *           enum: [about, gallery, reviews]
 *           example: "about"
 *       - name: page
 *         in: query
 *         description: Page number for pagination (used for gallery and reviews).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page (used for gallery and reviews).
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Vendor data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vendor"
 *                 data:
 *                   oneOf:
 *                     - type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "60d0fe4f5311236168a109ca"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         role:
 *                           type: string
 *                           example: "vendor"
 *                     - type: array
 *                       items:
 *                         type: object
 *                 totalPage:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Bad request (missing or invalid parameters).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vendor id is required"
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
 * /user/add-review:
 *   post:
 *     summary: Add a review for a vendor.
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vendorId
 *               - rating
 *               - review
 *             properties:
 *               vendorId:
 *                 type: string
 *                 description: ID of the vendor to review.
 *                 example: "60d0fe4f5311236168a109ca"
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating value between 1 and 5.
 *                 example: 4.5
 *               review:
 *                 type: string
 *                 description: Review message content.
 *                 example: "Great service and very professional."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Optional list of image URLs or filenames.
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       200:
 *         description: Review added successfully.
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
 *                   example: "Review added successfully"
 *       400:
 *         description: Bad request (e.g., vendor not found or review already exists).
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
 *                   example: "Review already added"
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
