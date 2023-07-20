import {Router} from 'express'
import {createUser, deleteUserById, getUserById, getUsers, updateUserById} from '../controllers/users.controllers.js'

const usersRouters = Router()
const baseURI = '/users'

usersRouters.post(baseURI, createUser)
usersRouters.get (baseURI, getUsers)
usersRouters.get (`${baseURI}/:id`, getUserById)
usersRouters.patch (`${baseURI}/:id`, updateUserById)
usersRouters.delete (`${baseURI}/:id`, deleteUserById)

export default usersRouters