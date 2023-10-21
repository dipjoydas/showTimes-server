const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose

const subAdminSchema = new Schema({
    email:{
        type:String,
        
    },
    role:{
        type:String,
        default:"subadmin"
    },
   
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validator(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password can not contain password')

            }
        }
    },
    
     tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

subAdminSchema.methods.toJSON = function () {
    const subAdmin = this
    const subAdminObject = subAdmin.toObject()
    delete subAdminObject.password
    delete subAdminObject.tokens
    return subAdminObject
}

subAdminSchema.methods.generateAuthToken = async function () {
    const subAdmin = this
    const token = jwt.sign({ _id: subAdmin._id.toString() }, 'jtpwbgqupmzbs')
    subAdmin.tokens = subAdmin.tokens.concat({ token: token })
    await subAdmin.save()
    return token
    // return  user

}

subAdminSchema.statics.findByCredentials = async (email, password) => {
    const subAdmin = await subAdmin.findOne({ email  })

    if (!subAdmin) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, subAdmin.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return subAdmin
}

subAdminSchema.pre('save', async function (next) {
    const subAdmin = this
    if (subAdmin.isModified('password')) {
        subAdmin.password = await bcrypt.hash(subAdmin.password, 8)
    }
    next()
})
const subAdmin = mongoose.model('subAdmin', subAdminSchema)
module.exports = subAdmin