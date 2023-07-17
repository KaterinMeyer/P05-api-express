import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
}, {versionKey: false})


export const UserModel = new mongoose.model('User', userSchema)