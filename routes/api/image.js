const router = require('express').Router()
let Image = require('../../models/image.model')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
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

router.route('/upload')
    .post(upload.single('imageData'), (req, res, next) => {

        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.file.path
        })

        newImage.save()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    success: true,
                    document: result
                })
            })
            .catch(err => next(err))
    })

module.exports = router