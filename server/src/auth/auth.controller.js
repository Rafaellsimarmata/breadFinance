import { Router } from 'express';
import validate from '../middleware/validate.auth.js';
import { registerAccount, loginAccount } from './auth.service.js';

const router = Router();

router.post("/register", validate, async (req, res) => {
    const userData = req.body;
    try {
        await registerAccount(userData);

        res.status(201).json({
            status: 201,
            message: "account registered successfully"
        });
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

router.post("/login", validate, async (req, res) => {
    const userData = req.body;
    try {
        const token = await loginAccount(userData);
        console.log(token);

        res.status(200).json({
            status: 200,
            token,
            message: "account login successfully"
        });
    } catch (err) {
        return res.status(401).send(err.message)
    }
})

export default router 