const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        email: {
            type: String, 
            lowercase: true, 
            unique: true, 
            required: [true, "can't be blank"], 
            match: [/\S+@\S+\.\S+/, 'is invalid'], 
            index: true
        },
        firstname: {
            type: String,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        },
        shortbio: {
            type: String,
        },
    },
    { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User