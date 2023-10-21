const Movie =require('../models/movies')
const mongoose =require('mongoose')
const addMovie = async(req,res)=>{
  // console.log()
    const movie = new Movie({...req.body,email:req.admin.email})
  const ress = await movie.save()
  
   res.send(ress)
}
const getMovie = async (req,res)=>{
  const ress = await Movie.find({email:req.admin.email})
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
 console.log(ress.shows)
  res.send({movie:ress,shows:ress.shows})


}
module.exports ={addMovie,getMovie,getMovieByDay,getMovieWithShows}