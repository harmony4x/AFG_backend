const express = require('express')
const router = express.Router()
const { getHomePage } = require('../controllers/apiController')


router.get('/', getHomePage)


module.exports = router;