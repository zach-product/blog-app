const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pubSchema = new Schema(
    {
        postId: { 
            type: String, 
            trim: true, 
            unique: true
        },
        mainImgName: { 
            type: String, 
            trim: true 
        },
        mainImgPath: { 
            type: String, 
            trim: true 
        },
        title: { 
            type: String, 
            required: true,
            trim: true 
        },
        topics: [{ 
                type: String,
                trim: true
        }],
        published: { 
            type: Date,
        },
        intro: { 
            type: String,
        },
        sections: [
            {
                header: {
                    type: String,
                },
                content: {
                    type: String,
                },
            }
        ],
        closing: { 
            type: String,
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