const mongoose = require('mongoose')
const { Schema } = mongoose;
const movieSchema =new Schema({
  email:String,
    movieName:String,
    serialNumber:Number,
    date:Date,
    hour:String,
minutes:String,
producerName:String,
directorName:String,
musicDirectorName:String,
cast:String,
    categories:String,
    videoLink:String,
    img:String,
    description:String,
    reviews:[
        {
            name:String,
            rating:Number ,
            des:String
        }
    ],
 


})
movieSchema.virtual('shows',{
  ref:'Show',
  localField:'_id',
  foreignField:'movieId'
})

const Movie = mongoose.model('Movie',movieSchema)
Movie.collection.createIndex({movieName:'text'},(err) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index created on the title field.');
    }})
module.exports = Movie
// const products =new product({
//     title:'this is big deal'
// })

