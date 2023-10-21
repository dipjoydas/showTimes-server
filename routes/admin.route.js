const express = require('express')
const {logIn,getadmin,addUser,changePassword} = require('../controller/admin.controller')
const {uploadImage,upload} =require('../controller/uploadImage')
// const getadmin = require('../controller/admin.controller')
const adminAuth =require('../middleware/adminAuth')
const router = express.Router()

router.post('/login',logIn)
router.post('/changeadminpassword',adminAuth,changePassword)
router.get('/getadmin',adminAuth,getadmin)
router.post('/adduser',adminAuth,addUser)
module.exports = router