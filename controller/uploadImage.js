

const multer = require('multer')
const sharp = require('sharp')
const Image = require('../models/image')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
const uploadImage =async(req,res)=>{
    const buffer = await sharp(req?.file?.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const img = new Image({
        img:buffer
    })
    const result = await img.save()
    res.send(result._id)
}
module.exports ={uploadImage,upload}