import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import authController from "./auth/auth.controller.js"
// import unknownEndPoint from './middleware/unknownEndpoint.js';
const app = express()

const port = 3000
dotenv.config();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('BreadFinance api!')
})

app.use('/auth', authController);

app.listen(port, () => {
  console.log(`BreadFinance is listening on port ${port}`)
})