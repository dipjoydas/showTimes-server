const Image = require("../models/image");
const mongoose =require('mongoose')


const getimage =async(req,res)=>{
   
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const img =await Image.findById(req.params.id)
   
    res.set('Content-Type', 'image/png')
   
    res.send(img.img)
}

module.exports = {getimage}