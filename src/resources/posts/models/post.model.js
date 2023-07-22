import mongoose, { SchemaTypes } from 'mongoose'
import validator from 'validator'

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    author2: {
        type: String,
        required: true,
    }
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } })
// Si se dejara en true, al momento de crear un elemento le va a crear una versión

export const PostModel = new mongoose.model('Post', postSchema)

