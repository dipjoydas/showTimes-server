const express = require('express')
const {logIn,getsubAdmin} = require('../controller/subAdmin.controller')
const {uploadImage,upload} =require('../controller/uploadImage')
// const getsubAdmin = require('../controller/subAdmin.controller')
const subAdminAuth =require('../middleware/subAdminAuth')
const router = express.Router()
const cors = require('cors')
router.use(cors())

router.post('subadmin/login',logIn)
router.get('/getsubAdmin',subAdminAuth,getsubAdmin)



module.exports = router