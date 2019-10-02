const mongoose = require('mongoose')
const crypto = require('bcryptjs')
const jwt = require('jsonwebtoken') // Add jsonwebtoken dependency

const Schema = mongoose.Schema

const userSchema = new Schema(
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
            required: [true, "can't be blank"], 
            match: [/\S+@\S+\.\S+/, 'is invalid'], 
            index: true
        },
        hash: String,
        salt: String,
        message: {
            type: String,
        },
    },
    { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User