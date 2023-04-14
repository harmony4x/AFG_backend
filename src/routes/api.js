const express = require('express')
const router = express.Router()
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
} = require('../controllers/customerController')
const { register, login, refreshToken, logout } = require('../controllers/authController')
const { verifyAccessToken, verifyRefreshToken } = require('../middleware/jwtService')
const createError = require('http-errors');
const { authPage } = require('../middleware/auth')
const { createRole, getAllRole, updateARole, deleteARole } = require('../controllers/roleController')
const { createCategory, getAllCategory, updateACategory, deleteACategory } = require('../controllers/categoryController')
const { deleteACategoryService } = require('../services/categoryService')

router.get('/user', getHomePage)
router.post('/user', createUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
router.post('/upload-file', uploadSingle)
router.post('/upload-files', uploadMultipleAPI)


router.post('/customer', createCustomerUser);
router.post('/customers', createArrayUser);
router.get('/customers', getAllCustomers);
router.put('/customers', updateACustomer);
router.delete('/customers', deleteACustomer);
router.delete('/customers-many', deleteArrayCustomer);



router.post('/role', createRole);
router.get('/role', getAllRole);
router.put('/role', updateARole);
router.delete('/role', deleteARole);



router.post('/categories', createCategory);
router.get('/categories', getAllCategory);
router.put('/categories', updateACategory);
router.delete('/categories', deleteACategory);





router.post('/register', register);
router.post('/login', login);
router.get('/check-token', verifyAccessToken, authPage('ADMIN'), getHomePage);
router.post('/refresh-token', refreshToken);

router.delete('/logout', logout)


module.exports = router;