const jwt = require('jsonwebtoken')
const SubAdmin = require('../models/subAdmin')
const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authentication').replace('Bearer ','')
        const decoded = jwt.verify(token, 'jtpwbgqupmzbs')
        const subAdmin = await SubAdmin.findOne({_id:decoded._id ,'tokens.token':token})
        if(!subAdmin){
            throw new Error()
        }
        req.token = token 
        req.subAdmin =  subAdmin
        next()

    }catch(error){
        res.status(401).send({erroe:'please authenticate'})

    }
}
module.exports = auth