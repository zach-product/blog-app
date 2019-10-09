const router = require('express').Router()

const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

require('dotenv').config()
const secret = process.env.SECRET || 'the default secret'

const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                let error = 'Email already exists!'
                return res.status(400).json(error)
            } else {
                const newUser = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err
                        newUser.password = hash
                        newUser.save().then(user => res.json(user))
                            .catch(err => res.status(400).json(err))
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = "This email doesn't exist"
                return res.status(400).json(errors)
            }
            bcrypt.compare(password, user.password) 
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user._id,
                            email: user.email
                        }
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if (err) res.status(500)
                                .json({ error: 'Error signing token', raw: err })
                                res.json({ success: true, token: `Bearer ${token}` })
                            })
                    } else {
                        let error = "Password is incorrect"
                        return res.status(400).json(error)
                    }
                })
        })
})


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
}) 

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const message = req.body.message

    const newUser = new User({ firstname, lastname, email, message })

    newUser.save()
        .then(() => res.json('User successfully added!'))
        .catch(err => res.status(400).json('Error :' + err))
    
})

module.exports = router