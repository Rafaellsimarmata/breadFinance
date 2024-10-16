import { Router } from 'express';
import {
    getUserTransactions,
    getUserTransactionsByDesc,
    filterUserTransactions,
    addUserTransaction
} from "./transaction.service.js";
import authenticateToken from '../middleware/token.auth.js';

const router = Router()

router.get("/transactions", authenticateToken, async (req, res) => {
    const { userId } = req.user

    try {
        const userTransactionsData = await getUserTransactions(userId)

        res.status(200).json({
            status: 200,
            message: "User Transactions data retrieved successfully",
            data: {
                userTransactionsData
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

router.post("/transaction", authenticateToken, async (req, res) => {
    const { userId } = req.user
    const transactionData = req.body

    try {
        const userTransactionData = await addUserTransaction(userId, transactionData)

        res.status(201).json({
            status: 201,
            message: "User Transaction data created successfully",
            data: {
                userTransactionData
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

export default router