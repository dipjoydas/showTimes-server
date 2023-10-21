const express = require('express')
const adminAuth =require('../middleware/adminAuth')
const router = express.Router()
const {addScreen,getScreen}=require('../controller/screen.controller')
router.post('/add',adminAuth,addScreen)
router.get('/get',adminAuth,getScreen)
module.exports =router
