const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path")

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))

const uri = process.env.MONGOLAB_YELLOW_URI || "mongodb://localhost:27017/blog"
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

db.once('open', () => {
    console.log('MongoDB successfully connected!')
})

const pubsRouter = require('./routes/pubs')
const usersRouter = require('./routes/users')

app.use('/pubs', pubsRouter)
app.use('/users', usersRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})