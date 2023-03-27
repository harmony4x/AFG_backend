const express = require('express')
const router = express.Router()
const { getHomePage, createUser, getAllUser, uploadFile } = require('../controllers/homeController')


router.get('/', getHomePage)
router.post('/create-user', createUser)
router.get('/get-all-user', getAllUser)

module.exports = router;