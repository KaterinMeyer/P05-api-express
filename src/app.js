import cors from 'cors'
import express from 'express'
import { startConnection } from './config/database.js'
import environment from './config/environment.js'
import usersRouter from './resources/users/routes/users.routes.js'
import postsRouter from './resources/posts/routes/posts.routes.js'
import authRoutes from './resources/auth/routes/auth.routes.js'

const app = express()

startConnection()

app.use(express.json())
app.use(cors())


app.get('/', function (req, res) {
    return res.status(200).json({ msg: "Bienvenido" })
})

app.use(usersRouter)
app.use(postsRouter)
app.use(authRoutes)

const { PORT } = environment

app.listen(PORT, () => {
    console.log(`Aplicación iniciada en puerto ${PORT}`)
}) 