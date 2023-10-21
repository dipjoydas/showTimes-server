const SubAdmin = require("../models/subAdmin");
const logIn =async(req,res)=>{
    try {
        const subAdmin = await SubAdmin.findByCredentials(req.body.email, req.body.password)
       
     
        const token = await subAdmin.generateAuthToken()
        res.send({ subAdmin, token })
    } catch (e) {
        res.status(400).send({msg:e.message})
     
    }

}
// router.get('/getsubAdmin', subAdminAuth, (req, res) => {
//     const subAdmin = req.subAdmin
//     res.send(subAdmin)
// })
const getsubAdmin =(req,res)=>{
    const subAdmin = req.subAdmin
    res.send(subAdmin)

}
module.exports = {logIn,getsubAdmin}