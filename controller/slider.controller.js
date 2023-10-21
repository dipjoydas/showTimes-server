const Shows = require('../models/shows')
const getSlider = async (req, res) => {
    console.log("workd form slider controllers")
    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);

    const todayShows = await Shows.find({
        date: {
            // $gte: previousDay,
            $gte: todayDate,
            $lt: new Date(todayDate.getTime() + 24 * 60 * 60 * 1000) // Less than tomorrow at 00:00:00
        }
    })
   
    for(let i of todayShows){
        await i.populate('movieId')
    }
    // const todayMovie  =[]
    // today.map((show,index)=>{
    //     const movieContainer ={}
    //     if(index == 0){
    //         movieContainer.session = [show.showTime]
    //         movieContainer.number =show.movieId.serialNumber
    //         movieContainer.name =show.movieId.movieName
    //         movieContainer.category =show.movieId.categories
    //         movieContainer.img=show.movieId.img
    //         movieContainer._id =show.movieId._id
    //         todayMovie.push(movieContainer)

    //     }else{
    //         const isMatch =[]
    //         todayMovie.map((movie,index)=>{
    //             if(show.movieId._id.equals(movie._id)){
    //                 movie.session =[...movie.session,show.showTime]
    //             }else{
    //                 isMatch.push(1)
    //                 if(todayMovie.length==isMatch.length){
    //                     movieContainer.session = [show.showTime]
    //                     movieContainer.number =show.movieId.serialNumber
    //                     movieContainer.name =show.movieId.movieName
    //                     movieContainer.category =show.movieId.categories
    //                     movieContainer.img=show.movieId.img
    //                     movieContainer._id =show.movieId._id
    //                     todayMovie.push(movieContainer)
    //                 }

    //             }

    //     })

    //     }
    // })
   
    const tomorrowShows = await Shows.find({
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