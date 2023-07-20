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
    const [users, error] = await awaitCatcher(UserModel.find())
    if (error) {
        return res.status(400).json({ status: "error", msg: error.message })
    }
    return res.status(201).json(userCreated)
} 

export async function getUserById(req, res) {
    const id = req.params.id
    const [user, error] = await awaitCatcher(UserModel.findById(id))
    if (!user || error) {
        return res.status(404).json({ status: "error", msg: "usuario no encontrado" })
    }
    return res.status(200).json(user)
}

export async function updateUserById(req, res) {
    const id = req.params.id
    const body = req.body
    const [userUpdated, error] = await awaitCatcher(UserModel.findByIdAndUpdate(id , body, {new: true}))
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