import { Router } from 'express';
import {
    getUserTransactions,
    addUserTransaction,
    deleteUserTransaction,
    filterUserTransactions,

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
        return res.status(401).json({
            status: 401,
            message: err.message
        });
    }
})

router.delete('/transaction/:transactionId', authenticateToken, async (req, res) => {
    const transactionId = req.params.accId;

    try {
        const transactionDataDelete = await deleteUserTransaction(transactionId)

        res.status(200).json({
            status: 200,
            message: "User Accounts Deleted",
            data: {
                transactionDataDelete
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
});

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