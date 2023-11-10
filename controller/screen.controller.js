const Screen =require('../models/screen')
const mongoose =require('mongoose')
const addScreen =async(req,res)=>{
    const screen =new Screen({...req.body,email:req.admin.email})
    await screen.save()
    if(screen._id){
        res.send({result:'added'})

       }
}
const getScreen =async(req,res)=>{
    const ress =await Screen.find({email:req.admin.email})
    res.send(ress)

}
module.exports={addScreen,getScreen}