const User =require('../models/user')
const Otp =require('../models/otp')
const {sendOtp}=require('../utilities/sendMail')
const getUser =async(req,res)=>{
    const user =req.user 
    res.send(user)
}
const signUp =async(req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
      
        // now send  send a opt to verify email address 
        // generate opt ------------------------------------------------------------------
        const otpgen = ()=>{
            let otp = Math.floor(Math.random()*1000000)
           
            if(otp.toString().length != 6){
                otpgen()
            }
            return otp
        }
        const otp = otpgen()
        // now store opt to db and to send to mail 
        const storeOtp = async()=>{
            const otpObj = {
                expiresAt: new Date(Date.now() + 60 * 2 * 1000),
                // expires after 2 minutes from current time
                email:req.body.email ,
                otp:otp
            }
            const otpModel = new Otp(otpObj)
            await otpModel.save()
            //-------------------------------------------- send otp to mail ---------------------------------------
            sendOtp(otp,req.body.email)



        }
        
        storeOtp()



        // res.status(201).send({ user, token })
        res.status(201).send({ result:"success" })
       
    } catch (error) {
        res.status(400).send(error)
    }

}
const verifyEmail =async(req,res)=>{
    const {otpValue,email} = req.body
   
    const otpFind = await Otp.find({'email':email})
    if( otpFind[otpFind.length -1]?.otp == otpValue){
        // const user = await User.updateOne({email:email},{status:'active'}, { new: true })
        const user = await User.findOne({'email':email})
        const token = await user.generateAuthToken()
        const Updateuser = await User.updateOne({email:email},{status:'active'}, { new: true })
      


        
        res.status(201).send({user , token })
    }
    
}
const logIn =async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // console.log(user,'from log in route')
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({msg:e.message})
      
    }

}
const logOut =async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({ result: "success" })
    } catch (e) {
        res.status(500).send()
    }

}
const emailCheck=async(req,res)=>{
    const email = req.params.email 
   
    const response = await User.find(({'email':email})).select({email:1,status:1})
    res.send({email:response})
}
const resendOtp=async(req,res)=>{
    try{
        const otpgen = ()=>{
            let otp = Math.floor(Math.random()*1000000)
           
            if(otp.toString().length != 6){
                otpgen()
            }
            return otp
        }
        const otp = otpgen()
        const storeOtp = async()=>{
            const otpObj = {
                expiresAt: new Date(Date.now() + 60 * 2 * 1000),
                // expires after 2 minutes from current time
                email:req.body.email ,
                otp:otp
            }
            const otpModel = new Otp(otpObj)
            await otpModel.save()
            //-------------------------------------------- send otp to mail ---------------------------------------
            sendOtp(otp,req.body.email)
    
    
    
        }
        
        storeOtp()
        res.send({result:"success"})

    }catch(error){
        res.send({result:error.message})

    }

}
module.exports ={getUser,signUp,verifyEmail,logIn,logOut,emailCheck,resendOtp}