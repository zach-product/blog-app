const express = require('express')
const cp = require('cookie-parser')
const bp = require('body-parser')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const mongoose = require('mongoose')
const passport = require('passport')
const sendMail = require('./utils/sendMail')

const app = express()

const port = process.env.PORT || 8000

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

app.use(passport.initialize())

require('./passport-config')(passport)

app.use(cp())
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, "client", "build")))

// app.use((req, res, next) => {
//     if (req.body) log.info(req.body)
//     if (req.params) log.info(req.params)
//     if (req.query) log.inf(req.query)
//     log.info(`Received a ${req.method} request from ${req.ip} for ${req.url}`)
//     next()
// })

const pubsRouter = require('./routes/pubs')
const usersRouter = require('./routes/users')
const imageRouter = require('./routes/image')

app.use('/pubs', pubsRouter)
app.use('/users', usersRouter)
app.use('/api/mail', sendMail)
app.use('/image', imageRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, err => {
    if (err) console.log(err)
    console.log(`Server running on port ${port}`)
})