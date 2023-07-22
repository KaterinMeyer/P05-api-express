import jwt from 'jsonwebtoken'
import environment from '../../../config/environment.js'
import { UserModel } from '../../users/models/user.model.js'
import { awaitCatcher } from 'await-catcher'

const { TOKEN_SECRET } = environment

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ status: "error", msg: "el usuario o contraseña no pueden ser vacíos" })
    }

    //Buscar el usuario en la DB y se verigica si la contraseña es válida
    const payload = {
        id: "64b88c2cdd4e2e927ee68c2a",
        name: "Katerin",
        surname: "Meyer",
    }

    const token = jwt.sign(payload, TOKEN_SECRET, {
        expiresIn: "24h",
        algorithm: "HS512"
    })
    return res.status(200).json({ token })
}

export const signup = async (req, res) => {
    const body = req.body
    const user = new UserModel(body)
    user.hashPassword(body.password)
    const [userSaved, error] = await awaitCatcher(user.save())
    if(!userSaved || error){
        return res.status(400).json({status: "error", msg: "no se pudo registrar usuario"})
    }
    return res.status(201).json({status: "ok", msg: "usuario registrado correctamente"})

}