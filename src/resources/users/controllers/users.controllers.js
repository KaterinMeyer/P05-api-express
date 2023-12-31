import { awaitCatcher } from 'await-catcher'
import { UserModel } from "../models/user.model.js"
const users = []

export async function createUser(req, res) {
    const body = req.body
    const [userCreated, error] = await awaitCatcher(UserModel.create(body))
    if (error) {
        return res.status(400).json({ status: "error", msg: error.message })
    }
    return res.status(201).json(userCreated)
}

export async function getUsers(req, res) {
    const queryParams = req.query
    const queryObj = {}
    const queryKeys = Object.keys(queryParams)
    if (queryKeys.length > 0) {
        for (const key of queryKeys) {
            if (key === 'age') {
                queryObj[key] = Number(queryParams[key])
                continue
            }
            if (key === "isAdmin") {
                queryObj[key] = queryParams[key] === 'true'
            }
            console.log(key);
        }
    }
    console.log(queryParams)
    console.log(queryObj)
    const [users, error] = await awaitCatcher(UserModel.find(queryObj, { pets: 0, addresses: 0 }))
    if (error) {
        return res.status(400).json({ status: "error", msg: error.message })
    }
    return res.status(201).json(users)
}

export async function getUserByEmail(email) {
    const [user, error] = await awaitCatcher(UserModel.findOne({ email: email }))
    if (!user || error) {
        throw new Error("usuario no encontrado")
    }
    console.log(user)
    return user
}

export async function getUserById(req, res) {
    if (!req.user || !req.user.id)
        return res.status(404).json({ status: "error", msg: "id no presente" })
    const id = req.user.id
    const [user, error] = await awaitCatcher(UserModel.findById(id, "-salt - password -name -surname"))
    if (!user || error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(user)
}

export async function updateUserById(req, res) {
    const id = req.params.id
    const body = req.body
    const [userUpdated, error] = await awaitCatcher(UserModel.findByIdAndUpdate(id, body, { new: true }))
    if (error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(userUpdated)
}

export async function deleteUserById(req, res) {
    const id = req.params.id
    const [userDeleted, error] = await awaitCatcher(UserModel.findByIdAndDelete(id))
    if (error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(userDeleted)
}  