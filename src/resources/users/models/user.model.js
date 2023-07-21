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
}, { versionKey: false })
// Si se dejara en true, al momento de crear un elemento le va a crear una versión

userSchema.pre('save', function (next) {
    // Se ejecuta antes del save y permite modificar el documento que está siendo guardado
    console.log("Usuario a agregar")
    console.log(this.jSON())
    next()
})

userSchema.post('save', function(document) {
    console.log("Usuario agregado")
    console.log( document )

})

export const UserModel = new mongoose.model('User', userSchema)

