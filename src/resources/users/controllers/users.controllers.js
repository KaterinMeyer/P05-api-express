import {awaitCatcher } from 'await-catcher'
import { UserModel } from "../models/user.model.js"
const users = []

export async function createUser(req, res) {
    const body = req.body
        const [userCreated, error ] = await awaitCatcher( UserModel.create(body) )
        if(error) {
            return res.status(400).json({ status: "error", msg: error.message })
    }
return res.status(201).json(userCreated)
}


export async function getUsers(req, res) {
    const users = await UserModel.find()
    return res.status(200).json(users)
} 