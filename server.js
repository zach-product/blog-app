const express = require('express')
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')
const path = require('path')
const sendMail = require('./utils/sendMail')

// Point config variables to .env file
require('dotenv').config()


// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Configure isProduction
const isProduction = process.env.NODE_ENV === 'production'

// Initiate our app
const app = express()
const port = process.env.PORT || 8000

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(session({ secret: 'blog-app', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

if(!isProduction) {
    app.use(errorHandler())
}

const uri = process.env.MONGOLAB_YELLOW_URI || process.env.MONGODB_URI
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

db.once('open', () => {
    console.log('MongoDB successfully connected!')
})

// Models & routes
const pubsRouter = require('./routes/pubs')
const usersRouter = require('./routes/users')
const imageRouter = require('./routes/image')

app.use('/pubs', pubsRouter)
app.use('/users', usersRouter)
app.use('/api/mail', sendMail)
app.use('/image', imageRouter)

// Error handlers & middlewares
if(!isProduction){
    app.use((err, req, res) => {
        res.status(err.status || 500)

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        })
    })
}

app.use((err, req, res) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    })
  })

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})