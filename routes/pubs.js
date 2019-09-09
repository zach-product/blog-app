const router = require('express').Router()
const Pub = require('../models/pub.model')

router.route('/').get((req, res) => {
    Pub.find()
        .then(pubs => res.json(pubs))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const title = req.body.title
    const author = req.body.author
    const topics = req.body.topics
    const content = req.body.content
    const published = Date.parse(req.body.published)
    const comments = req.body.comments

    const newPub = new Pub({
        title,
        author,
        topics,
        content,
        published,
        comments,
    })

    newPub.save()
        .then(() => res.json('New post successfully added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Pub.findById(req.params.id)
        .then(pub => res.json(pub))
        .catch(err => req.status(400).json('Error :' + err))
})

router.route('/:id').delete((req, res) => {
    Pub.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post successfully deleted!'))
        .catch(err => req.status(400).json('Error :' + err))
})

router.route('/update/:id').post((req, res) => {
    Pub.findById(req.params.id)
        .then(pub => {
            pub.title = req.body.title
            pub.author = req.body.author
            pub.topics = req.body.topics
            pub.content = req.body.content
            pub.published = Date.parse(req.body.published)
            pub.comments = req.body.comments
            
            pub.save()
                .then(() => res.json('Post succesfully updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router