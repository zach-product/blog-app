const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pubSchema = new Schema(
    {
        header_img: { type: String, trim: true },
        title: { 
            type: String, 
            required: true,
            trim: true 
        },
        topics: { 
                type: [String],
        },
        content: { 
            type: Object,
            required: true 
        },
        published: { 
            type: Date,
        },
        comments: [{
            author: { type: String, trim: true },
            comment: String
        }],
    },
    { timestamps: true },
)

const Pub = mongoose.model('Pub', pubSchema);

module.exports = Pub