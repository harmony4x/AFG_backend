const express = require('express')
const router = express.Router()
const { getHomePage, createUser, updateUser, deleteUser, uploadSingle, uploadMultipleAPI } = require('../controllers/apiController')
const { createCustomerUser, createArrayUser } = require('../controllers/customerController')


router.get('/user', getHomePage)
router.post('/user', createUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
router.post('/upload-file', uploadSingle)
router.post('/upload-files', uploadMultipleAPI)


router.post('/customer', createCustomerUser);
router.post('/customers', createArrayUser);

module.exports = router;