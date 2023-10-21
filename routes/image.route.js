const express = require('express')
const {uploadImage,upload} =require('../controller/uploadImage')
const {getimage} =require('../controller/image.controller')
const adminAuth =require('../middleware/adminAuth')

const router = express.Router()
router.post('/upload',adminAuth,upload.single('image'),uploadImage)
router.get('/get/:id',getimage)
module.exports =router