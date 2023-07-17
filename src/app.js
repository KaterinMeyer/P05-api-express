import cors from 'cors'
import express from 'express'
import { startConnection } from './config/database.js'
import environment from './config/environment.js'
import usersRouters from './resources/users/routes/users.routes.js'

const app = express()

startConnection()

app.use(express.json())
app.use(cors())


app.use('/', function (req, res) {
    return res.status(200).json({ msg: "Bienvenido" })
})

app.use(usersRouters)

const { PORT } = environment

app.listen(PORT, () => {
    console.log( `Aplicación iniciada en puerto ${ PORT }` )
})