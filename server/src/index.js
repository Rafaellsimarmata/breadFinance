import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authController from "./auth/auth.controller.js"
import userController from "./user/user.controller.js"
import accountController from "./account/accout.controller.js"
// import unknownEndPoint from './middleware/unknownEndpoint.js';
const app = express()

const port = 3000
dotenv.config()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('BreadFinance api!')
})

app.use('/api/auth/', authController)
app.use('/api/', userController)
app.use('/api/', accountController)

app.listen(port, () => {
  console.log(`BreadFinance is listening on port ${port}`)
})