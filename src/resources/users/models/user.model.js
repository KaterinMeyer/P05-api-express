import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        validate: function (email) {
            return validator.isEmail(email)
        }
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    pets: [
        {
            type: String
        }
    ],
    addresses: [
        {
            street: {
                type: String,
                required: true
            },
            region: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            }
        }
    ]
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } })
// Si se dejara en true, al momento de crear un elemento le va a crear una versión

userSchema.pre('save', function (next) {
    // Se ejecuta antes del save y permite modificar el documento que está siendo guardado
    console.log("Usuario a agregar")
    console.log(this.toJSON())
    next()
})

userSchema.post('save', function (document) {
    console.log("Usuario agregado")
    console.log(document)

})

userSchema.virtual('fullName').get(function () {
    return `${this.name} ${this.surname}`
})

export const UserModel = new mongoose.model('User', userSchema)

