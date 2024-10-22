import { Router } from 'express';
import {
    getUserTransactions,
    // getUserTransactionsByDesc,
    // filterUserTransactions,
    // addUserTransaction
    filterUserTransactions,

} from "./transaction.service.js";
import authenticateToken from '../middleware/token.auth.js';

const router = Router()

// CHANGE ENDPOINT 
router.get("/transaction", authenticateToken, (req, res) => {
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


// TRY FILTER BY PARAM
router.get('/transactions', authenticateToken, async (req, res) => {
    //  query parameters
    const { type, description, startDate, endDate, minAmount, maxAmount, accountId } = req.query;

    try {
        const transactions = await filterUserTransactions({ type, description, startDate, endDate, minAmount, maxAmount, accountId });
        res.status(200).json({
            status: 200,
            message: 'Transactions retrieved successfully',
            data: transactions
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
});

export default router