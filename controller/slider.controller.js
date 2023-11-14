const Shows = require('../models/shows')
const Admin =require('../models/admin')
const getSlider = async (req, res) => {
    const {theaterlocation} =req.params

    const email = await Admin.findOne({location:theaterlocation}).select('email')

    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);

    const todayShows = await Shows.find({
       email:email.email,
        
        date: {
            // $gte: previousDay,
            $gte: todayDate,
            $lt: new Date(todayDate.getTime() + 24 * 60 * 60 * 1000) // Less than tomorrow at 00:00:00
        }
    })
   
    for(let i of todayShows){
        await i.populate('movieId')
    }

   
    const tomorrowShows = await Shows.find({
        email:email.email,

        date: {
            $gte: tomorrowDate,
            $lt: new Date(tomorrowDate.getTime() + 24 * 60 * 60 * 1000)
        }
    })
    for(let i of tomorrowShows){
        await i.populate('movieId')
    }



    const todayMovies=[]
    const tomorrowMovies =[]
    const showsToMovies =(shows,movies)=>{
        shows.map((show,index)=>{
            const movieContainer ={}
            if(index == 0){
                movieContainer.session = [show.showTime]
                movieContainer.number =show.movieId.serialNumber
                movieContainer.name =show.movieId.movieName
                movieContainer.category =show.movieId.categories
                movieContainer.img=show.movieId.img
                movieContainer._id =show.movieId._id
                movies.push(movieContainer)
    
            }else{
                const isMatch =[]
                movies.map((movie,index)=>{
                    if(show.movieId._id.equals(movie._id)){
                        movie.session =[...movie.session,show.showTime]
                    }else{
                        isMatch.push(1)
                        if(movies.length==isMatch.length){
                            movieContainer.session = [show.showTime]
                            movieContainer.number =show.movieId.serialNumber
                            movieContainer.name =show.movieId.movieName
                            movieContainer.category =show.movieId.categories
                            movieContainer.img=show.movieId.img
                            movieContainer._id =show.movieId._id
                            movies.push(movieContainer)
                        }
    
                    }
    
            })
    
            }
        })

    }
     showsToMovies(todayShows,todayMovies)
     showsToMovies(tomorrowShows,tomorrowMovies)



    res.send({ todayMovies, tomorrowMovies })

}
module.exports = { getSlider }