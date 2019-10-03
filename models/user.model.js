const mongoose = require('mongoose')
const crypto = require('bcryptjs')
const jwt = require('jsonwebtoken') // Add jsonwebtoken dependency

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

UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.genSaltSync(10)
    this.hash = crypto.hashSync( password, this.salt)
}

UserSchema.methods.validatePassword = (password) => {
    const hash = crypto.compare(password, this.hash).then((res) => {})
    return hash 
}

UserSchema.methods.generateJWT = () => {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret')
}

UserSchema.methods.toAuthJSON = () => {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    }
}

const User = mongoose.model('User', UserSchema)

module.exports = User