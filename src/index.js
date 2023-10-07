const express = require('express')
const cors =require('cors')
const app = express()
app.use(cors())
const port =process.env.PORT || 5000
app.get('/',(req,res)=>{
    const imges = [
        'https://i.ibb.co/Yf9QcHt/R-2.jpg',
        'https://i.ibb.co/FzR0Z3Z/R-3.jpg',
        'https://i.ibb.co/s10Qs83/OIP-4.jpg'
    ]
    const movies = [
        {
            
        }
    ]
    res.send(imges)
})
app.get('/slider',(req,res)=>{
    const today = [
        {  
            "id":1,
            "number":1,
            "name":"fury",
            "category":["action","military","Drama"],
            "session":[1,4,7,9],
            "img":'https://i.ibb.co/Yf9QcHt/R-2.jpg'
        },
        {  
            "id":2,
            "number":2,
            "name":"commuter",
            "category":["action","military","Drama"],
            "session":[1,4,7,9],
            "img":'https://i.ibb.co/FzR0Z3Z/R-3.jpg'
        },
        {  
            "id":3,
            "number":3,
            "name":"kong",
            "category":["action","military","Drama"],
            "session":[1,4,7,9],
            "img": 'https://i.ibb.co/s10Qs83/OIP-4.jpg'
        },
    ]
    const tomorrow = [
        {  
            "id":1,
            "number":1,
            "name":"fury",
            "category":["action","military","Drama"],
            "session":[1,4,7,9],
            "img":'https://i.ibb.co/Yf9QcHt/R-2.jpg'
        },
        {  
            "id":2,
            "number":2,
            "name":"commuter",
            "category":["action","military","Drama"],
            "session":[1,4,7,9],
            "img":'https://i.ibb.co/FzR0Z3Z/R-3.jpg'
        },
        {  
            "id":3,
            "number":3,
            "name":"kong",
            "category":["action","military","Drama"],
            "session":[1,4,7,9],
            "img": 'https://i.ibb.co/s10Qs83/OIP-4.jpg'
        },
    ]
    res.send({today,tomorrow})
})
app.listen(port,()=>{
    console.log(`listenign on port ${port}`)
})