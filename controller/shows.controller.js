const Shows =require('../models/shows')
const addShows=async(req,res)=>{
    const shows =[]
   req.body.map((show,index)=>{
    const showContiner =new Shows({...show,email:req.admin.email})
    shows.push(showContiner)
   })
   const result =await Shows.insertMany(shows)
   if(result.length){
    res.send({result:'added'})

   }
}
const getShowsByMovieId =async(req,res)=>{
    const d = new Date();
    console.log(req.params.date,'date')
    d.setDate(d.getDate() + Number(req.params.date));

    d.setHours(0, 0, 0, 0);
    console.log(d)
    const ress =await Shows.find({movieId:req.params.id, date: {
        $gte: d,
        $lt: new Date(d.getTime() + 24 * 60 * 60 * 1000)
    }})
    console.log(ress,'form shows controoler ')
    res.send(ress)

}
module.exports ={addShows,getShowsByMovieId}