const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pubSchema = new Schema(
    {
        title: { 
            type: String, 
            required: true 
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
        comments: { 
            type: [String] 
        }
    },
    { timestamps: true },
)

const Pub = mongoose.model('Pub', pubSchema);

module.exports = Pub