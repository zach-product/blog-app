const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/pubs', require('./pubs'))
router.use('/image', require('./image'))

module.exports = router