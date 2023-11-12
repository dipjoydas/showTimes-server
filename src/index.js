const express = require('express')
const cors =require('cors')
// require('./db/mongoose')
require('../db/mongoose')
require('../utilities/loadEnv')
process.env.TZ = 'Asia/Dhaka';

const adminRoute = require('../routes/admin.route')
const subAdminRoute = require('../routes/subAdmin.route')
const imageRoute = require('../routes/image.route')
const movieRoute =require('../routes/movie.route')
const sliderRoute =require('../routes/slider.route')
const screenRouter =require('../routes/screen.route')
const showsRouter =require('../routes/shows.route')
const userRoute =require('../routes/user.router')
const bookingRoute =require('../routes/booking.route')
const paymentRoute =require('../routes/payment.route')
const Admin = require('../models/admin')
// const Admin = require('../models/admin')
const app = express()
app.use(cors())
app.use(express.json())
const port =process.env.PORT || 5000
// app.get('/',(req,res)=>{
//     const imges = [
//         'https://i.ibb.co/Yf9QcHt/R-2.jpg',
//         'https://i.ibb.co/FzR0Z3Z/R-3.jpg',
//         'https://i.ibb.co/s10Qs83/OIP-4.jpg'
//     ]
//     const movies = [
//         {
            
//         }
//     ]
//     res.send(imges)
// })
// app.get('/slider',(req,res)=>{
//     const today = [
//         {  
//             "id":1,
//             "number":1,
//             "name":"fury",
//             "category":["action","military","Drama"],
//             "session":[1,4,7,9],
//             "img":'https://i.ibb.co/Yf9QcHt/R-2.jpg'
//         },
//         {  
//             "id":2,
//             "number":2,
//             "name":"commuter",
//             "category":["action","military","Drama"],
//             "session":[1,4,7,9],
//             "img":'https://i.ibb.co/FzR0Z3Z/R-3.jpg'
//         },
//         {  
//             "id":3,
//             "number":3,
//             "name":"kong",
//             "category":["action","military","Drama"],
//             "session":[1,4,7,9],
//             "img": 'https://i.ibb.co/s10Qs83/OIP-4.jpg'
//         },
//     ]
//     const tomorrow = [
//         {  
//             "id":1,
//             "number":1,
//             "name":"fury",
//             "category":["action","military","Drama"],
//             "session":[1,4,7,9],
//             "img":'https://i.ibb.co/Yf9QcHt/R-2.jpg'
//         },
//         {  
//             "id":2,
//             "number":2,
//             "name":"commuter",
//             "category":["action","military","Drama"],
//             "session":[1,4,7,9],
//             "img":'https://i.ibb.co/FzR0Z3Z/R-3.jpg'
//         },
//         {  
//             "id":3,
//             "number":3,
//             "name":"kong",
//             "category":["action","military","Drama"],
//             "session":[1,4,7,9],
//             "img": 'https://i.ibb.co/s10Qs83/OIP-4.jpg'
//         },
//     ]
//     res.send({today,tomorrow})
// })
app.get('/',(req,res)=>{
    res.send('works')
})

app.use('/api/auth/admin',adminRoute)
app.use('/api/auth/subadmin',subAdminRoute)
app.use('/api/auth/user',userRoute)
app.use('/api/image',imageRoute)
app.use('/api/movie',movieRoute)
app.use('/api/screen',screenRouter)
app.use('/api/shows',showsRouter)
app.use('/api/slider',sliderRoute)
app.use('/api/auth/booking',bookingRoute)
app.use('/api/auth/payment',paymentRoute)

app.listen(port,()=>{
    console.log(`listenign on port ${port}`)
})