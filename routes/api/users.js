const mongoose = require('mongoose')
const passport = require('passport')
const router = require('express').Router()
const auth = require('../auth')
const User = require('../../models/user.model' )

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
        errors: {
            email: 'is required',
        },
        });
    }

    if(!user.password) {
        return res.status(422).json({
        errors: {
            password: 'is required',
        },
        });
    }

    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }))
        .catch(err => console.log(err))
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
        errors: {
            email: 'is required',
        },
        });
    }

    if(!user.password) {
        return res.status(422).json({
        errors: {
            password: 'is required',
        },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
        return next(err);
        }

        if(passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT()

        return res.json({ user: user.toAuthJSON() })
                    .catch(err => console.log(err))
        }

        return status(400).info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

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