const Admin = require("../models/admin");
const logIn =async(req,res)=>{
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
       
     
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (e) {
        res.status(400).send({msg:e.message})
     
    }

}

const getadmin =(req,res)=>{
    const admin = req.admin
    res.send(admin)

}
const addUser =async (req,res)=>{
    const {email,password,role,location}=req.body
    try{
        const admin = new Admin({
            email,
            password,
            role,
            location
        
           })
           await admin.save()
           if(admin._id){
            res.send({result:'added'})

           }
            
           

    }catch(e){
        res.status(400).send({msg:e.message})

    }
   
}
const changePassword =async (req,res)=>{
    const {currentPassword,newPassword} = req.body
    try{
        const email = req.admin.email 
    const admin = await Admin.findByCredentials(email, currentPassword)
    admin.password = newPassword
    await admin.save()
    res.send({result:"password change successfully"})

    }catch(e){
        console.log(e)
        res.status(400).send({result:"unabe to change password"})
    }

}
const getLocation =async (req,res)=>{
    try{
        const ress = await Admin.find({}).skip(1).select('location')
     
        res.send(ress)

    }catch(e){
        console.log(e)
        

    }
}


module.exports = {logIn,getadmin,addUser,changePassword,getLocation}

