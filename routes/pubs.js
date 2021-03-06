const router = require('express').Router()

const Pub = require('../models/pub.model')

router.route('/').get((req, res) => {
    Pub.find( { published: { $exists: true } } )
        .sort({ published: -1 })
        .then(pubs => res.json(pubs))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/drafts').get((req, res) => {
    Pub.find( { published: undefined } )
        .sort({ published: -1 })
        .then(pubs => res.json(pubs))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const postId = req.body.postId
    const mainImgName = req.body.mainImgName
    const mainImgPath = req.body.mainImgPath
    const title = req.body.title
    const topics = req.body.topics
    const intro = req.body.intro
    const sections = req.body.sections
    const closing = req.body.closing

    const newPub = new Pub({
        postId,
        mainImgName,
        mainImgPath,
        title,
        topics,
        intro,
        sections,
        closing,
    })

    newPub.save()
        .then(() => res.json('New post successfully added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Pub.findById(req.params.id)
        .then(pub => res.json(pub))
        .catch(err => res.status(400).json('Error :' + err))
})

router.route('/:id').delete((req, res) => {
    Pub.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post successfully deleted!'))
        .catch(err => res.status(400).json('Error :' + err))
})

router.route('/update/:id').post((req, res) => {
    Pub.findById(req.params.id)
        .then(pub => {
            pub.postId = req.body.postId
            pub.mainImgName = req.body.mainImgName
            pub.mainImgPath = req.body.mainImgPath
            pub.title = req.body.title
            pub.topics = req.body.topics
            pub.intro = req.body.intro
            pub.sections = req.body.sections
            pub.closing = req.body.closing
            
            pub.save()
                .then(() => res.json('Post succesfully updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/publish/:id').post((req, res) => {
    Pub.findById(req.params.id)
        .then(pub => {
            pub.postId = req.body.postId
            pub.mainImgName = req.body.mainImgName
            pub.mainImgPath = req.body.mainImgPath
            pub.title = req.body.title
            pub.topics = req.body.topics
            pub.published = Date.parse(req.body.published)
            pub.intro = req.body.intro
            pub.sections = req.body.sections
            pub.closing = req.body.closing
            
            pub.save()
                .then(() => res.json('Post succesfully published!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router