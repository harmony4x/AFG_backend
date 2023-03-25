const express = require('express')
const router = express.Router()
const { getHomePage, createUser, updateUser, deleteUser } = require('../controllers/apiController')


router.get('/user', getHomePage)
router.post('/user', createUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
module.exports = router;