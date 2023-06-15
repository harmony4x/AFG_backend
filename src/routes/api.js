const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../helpers/asyncHandler')

const { getHomePage,
    createUser,
    updateUser,
    deleteUser,
    uploadSingle,
    uploadMultipleAPI
} = require('../controllers/apiController')
const { createCustomerUser,
    createArrayUser,
    getAllCustomers,
    updateACustomer,
    deleteACustomer,
    deleteArrayCustomer,
    getACustomers,
    getACustomerByEmail,
} = require('../controllers/customerController')
const { register, login, refreshToken, logout } = require('../controllers/authController')
const { verifyAccessToken, verifyRefreshToken } = require('../middleware/jwtService')
const createError = require('http-errors');
const { authPage } = require('../middleware/auth')
const { createRole, getAllRole, updateARole, deleteARole } = require('../controllers/roleController')
const { createCategory, getAllCategory, updateACategory, deleteACategory } = require('../controllers/categoryController')
const { deleteACategoryService } = require('../services/categoryService')
const { createSeries, getAllSeries, updateASeries, deleteASeries, getSeriesById } = require('../controllers/seriesController')
const uploadCloud = require('../middleware/cloudinary')
const PostController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const notificationController = require('../controllers/notificationController')

router.get('/user', getHomePage)
router.post('/user', createUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
router.post('/upload-file', uploadSingle)
router.post('/upload-files', uploadMultipleAPI)


router.post('/customer', verifyAccessToken, authPage('admin'), uploadCloud.single('image'), createCustomerUser);
router.post('/customers', createArrayUser);
router.get('/customers', verifyAccessToken, authPage('admin'), getAllCustomers);
router.post('/customerbyId', getACustomers);
router.get('/customer/:email', getACustomerByEmail);



router.put('/customers', uploadCloud.single('image'), updateACustomer);
router.delete('/customers', verifyAccessToken, authPage('admin'), deleteACustomer);
router.delete('/customers-many', deleteArrayCustomer);



router.post('/role', verifyAccessToken, authPage('admin'), createRole);
router.get('/role', verifyAccessToken, authPage('admin'), getAllRole);
router.put('/role', verifyAccessToken, authPage('admin'), updateARole);
router.delete('/role', verifyAccessToken, authPage('admin'), deleteARole);



router.post('/categories', verifyAccessToken, authPage('admin'), createCategory);
router.get('/categories', getAllCategory);
router.put('/categories', verifyAccessToken, authPage('admin'), updateACategory);
router.delete('/categories', verifyAccessToken, authPage('admin'), deleteACategory);



router.post('/series', createSeries);
router.get('/series', getAllSeries);
router.get('/series/:userId', getSeriesById);

router.put('/series', updateASeries);
router.delete('/series', deleteASeries);





router.post('/register', register);
router.post('/login', login);
router.get('/check-token', verifyAccessToken, getHomePage);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout)


router.get('/posts', asyncHandler(PostController.findAllPost));
router.get('/posts/:slug', asyncHandler(PostController.findPostBySlug));
router.get('/user/:userId', asyncHandler(PostController.findPostByUser));


router.post('/notification', asyncHandler(notificationController.createNotification));
router.get('/notification/:userId', asyncHandler(notificationController.findNotificationByPost));

router.use(verifyAccessToken)
router.post('/posts', uploadCloud.single('image'), asyncHandler(PostController.createPost));
router.patch('/posts', uploadCloud.single('image'), asyncHandler(PostController.updatePost));
router.delete('/posts', asyncHandler(PostController.deletePost));


router.post('/comments', asyncHandler(commentController.createComment));
router.patch('/comments', asyncHandler(commentController.updateComment));
router.get('/comments/:postId', asyncHandler(commentController.findCommentByPost));
router.delete('/comments', asyncHandler(commentController.DeleteCommentByPost));

module.exports = router;