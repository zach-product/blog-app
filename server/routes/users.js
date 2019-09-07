const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
}) 

router.route('/add').post((req, res) => {
    const email = req.body.email
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const shortbio = req.body.shortbio

    const newUser = new User({ email, firstname, lastname, shortbio })

    newUser.save()
        .then(() => res.json('User successfully added!'))
        .catch(err => res.status(400).json('Error :' + err))        
})

module.exports = router