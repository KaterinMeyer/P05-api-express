import jwt from 'jsonwebtoken'
import environment from '../../../config/environment.js'

const { TOKEN_SECRET } = environment

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ status: "error", msg: "el usuario o contraseña no pueden ser vacíos" })
    }

    //Buscar el usuario en la DB y se verigica si la contraseña es válida
    const payload = {
        id:"64b88c2cdd4e2e927ee68c2a",
        name: "Katerin",
        surname: "Meyer",
    }

    const token = jwt.sign(payload, TOKEN_SECRET, {
        expiresIn: "24h",
        algorithm: "HS512"
    })
    return res.status(200).json({token})
} 