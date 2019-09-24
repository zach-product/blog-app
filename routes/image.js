var express = require('express')
var Image = require('../models/image.model')
var ImageRouter = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/png' || 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter,
})

ImageRouter.route('/uploadmulter')
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body)
        const newImage = new Image({
            imageName: req.body.imageName,
            imageDate: req.file.path
        })

        newImage.save()
            .then((result) => {
                console.log(result)
                res.status(200).json({
                    success: true,
                    document: result
                })
            })
            .catch(err => next(err))
    })