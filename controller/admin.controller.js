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
    const {email,password,role}=req.body
    try{
        const admin = new Admin({
            email,
            password,
            role
        
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
// router.post('/changepassword',auth,async(req,res)=>{
//     const {currentPassword,newPassword} = req.body
//     // const user = req.user
//     try{
//         const email = req.user.email 
//     const user = await User.findByCredentials(email, currentPassword)
//     user.password = newPassword
//     await user.save()
//     res.send({result:"password change successfully"})

//     }catch(e){
//         res.status(400).send({result:"unabe to change password"})
//     }
    


// })

module.exports = {logIn,getadmin,addUser,changePassword}


// app.get('/admindefault',async(req,res)=>{
   
//     const admin = new Admin({
//      email:"dipjoy488@gmail.com",
//      password:"1234567"
//     })
//     await admin.save()
 
//      res.send(admin)
//  })