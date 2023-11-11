const express = require('express')
const adminAuth =require('../middleware/adminAuth')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const {addMovie,getMovie,getMovieByDay,getMovieWithShows,getMovieByName,getAllMovie} =require('../controller/movie.controller')
router.post('/add',adminAuth,addMovie)
router.get('/get',adminAuth,getMovie)
// router.get('/get/:day',getMovieByDay)
router.get('/getbyname/:theaterlocation',getMovieByName)
router.get('/get/:id',getMovieWithShows)
router.get('/getall/:theaterlocation',getAllMovie)
module.exports= router