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
        topics: [{ type: String, trim: true }],
        published: Date,
        content: {
            intro: String,
            sections: [{
                header: String,
                body: String,
            }],
            closing: String,
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