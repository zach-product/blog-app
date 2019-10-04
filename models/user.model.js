const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        },
        email: {
            type: String, 
            lowercase: true,
            unique: true, 
            required: true,
        },
        password: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    { timestamps: true })

module.exports = User = mongoose.model('User', UserSchema)