const express = require('express')
const adminAuth =require('../middleware/adminAuth')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const {getSlider} =require('../controller/slider.controller')
router.get('/get/:theaterlocation',getSlider)
module.exports =router