const Movie =require('../models/movies')
const mongoose =require('mongoose')
const Admin =require('../models/admin')
const addMovie = async(req,res)=>{

    const movie = new Movie({...req.body,email:req.admin.email})
  const ress = await movie.save()
  
   res.send(ress)
}
const getMovie = async (req,res)=>{
  const ress = await Movie.find({email:req.admin.email})
  res.send(ress)
}
const getAllMovie =async (req,res)=>{
  const {theaterlocation} =req.params
 
  const email = await Admin.findOne({location:theaterlocation}).select('email')
  const ress =await Movie.find({email:email.email})
  res.send(ress)
}
const getMovieByDay = async (req,res)=>{
  const ress = await Movie.find({day:req.params.day})
  res.send(ress)
}
const getMovieWithShows =async (req,res)=>{

  if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).json({ error: 'Invalid ObjectId' });
}

  const ress =await Movie.findById(req.params.id)
 await ress.populate('shows')

  res.send({movie:ress,shows:ress.shows})


}
const getMovieByName =async(req,res)=>{
  const {theaterlocation} =req.params
  const searchValue = req.query.search
  const email = await Admin.findOne({location:theaterlocation}).select('email')
  const movies = await Movie.find({ email:email.email,$text:{$search: searchValue}})
  res.send(movies)
}

module.exports ={addMovie,getMovie,getMovieByDay,getMovieWithShows,getMovieByName,getAllMovie}