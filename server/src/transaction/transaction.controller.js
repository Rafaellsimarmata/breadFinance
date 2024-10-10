import { Router } from 'express';
import {
    getUserTransactions,
    getUserTransactionsByDesc,
    filterUserTransactions,
    addUserTransaction
} from "./transaction.service.js";
import authenticateToken from '../middleware/token.auth.js';

const router = Router()

router.get("/transactions", authenticateToken, (req, res) => {
    const { userId } = req.user

    try {
        const userTransactionsData = getUserTransactions(userId)

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


export default router