import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import authController from "./auth/auth.controller.js"
// import unknownEndPoint from './middleware/unknownEndpoint.js';
const app = express()

const port = 3000
dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('BreadFinance api!')
})

app.use('/api/auth/', authController);

app.listen(port, () => {
  console.log(`BreadFinance is listening on port ${port}`)
})