import {Router} from 'express'

const usersRouters = Router()
const baseURI = '/users'

usersRouters.post(baseURI)
usersRouters.get (baseURI)
usersRouters.get (`${baseURI}/:id`)
usersRouters.put (`${baseURI}/:id`)
usersRouters.delete (`${baseURI}/:id`)

export default usersRouters