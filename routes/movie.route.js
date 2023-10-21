const express = require('express')
const adminAuth =require('../middleware/adminAuth')
const router = express.Router()
const {addMovie,getMovie,getMovieByDay,getMovieWithShows} =require('../controller/movie.controller')
router.post('/add',adminAuth,addMovie)
router.get('/get',adminAuth,getMovie)
// router.get('/get/:day',getMovieByDay)
router.get('/get/:id',getMovieWithShows)
module.exports= router