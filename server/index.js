const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})