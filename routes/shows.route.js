const express = require('express')
const adminAuth =require('../middleware/adminAuth')
const router = express.Router()
const {addShows,getShowsByMovieId}=require('../controller/shows.controller')
router.post('/add',adminAuth,addShows)
router.get('/get/:id/:date',getShowsByMovieId)
module.exports=router