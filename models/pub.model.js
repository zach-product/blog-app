const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pubSchema = new Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        topics: [String],
        published: Date,
        intro: String,
        content: [{
            header: String,
            body: String,
        }],
        closing: String,
        comments: [{
            author: String,
            comment: String
        }],
    },
    { timestamps: true },
)

const Pub = mongoose.model('Pub', pubSchema);

module.exports = Pub