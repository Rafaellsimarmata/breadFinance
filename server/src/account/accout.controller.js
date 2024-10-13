import { Router } from 'express';
import { getUserAccounts, addUserAccount, userUpdateAccount, userDeleteAccount} from "./account.service.js";
import authenticateToken from '../middleware/token.auth.js';

const router = Router()

router.get("/accounts", authenticateToken, async (req, res) => {

    const { userId } = req.user;
    const userData = req.body
    userData.userId = userId

    try {
        const accounts = await getUserAccounts(userId)

        res.status(200).json({
            status: 200,
            message: "User Accounts retrieved successfully",
            data: {
                accounts
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.post("/account",authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const userData = req.body
    userData.userId = userId

    try {
        const accountDataResult = await addUserAccount(userId, userData)

        res.status(201).json({
            status: 201,
            message: "User Accounts added successfully",
            data: {
                accountDataResult
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.put("/account/:accId",authenticateToken, async (req, res) => {

    const accountId = req.params.accId;
    const accountData = req.body
    try {
        const accountDataUpdate = await userUpdateAccount(accountId, accountData)

        res.status(201).json({
            status: 201,
            message: "User Accounts updated",
            data: {
                accountDataUpdate
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.delete("/account/:accId",authenticateToken, async (req, res) => {
  
    const accountId = req.params.accId;

    try {
        const accountDataDelete = await userDeleteAccount(accountId)

        res.status(200).json({
            status: 200,
            message: "User Accounts Deleted",
            data: {
                accountDataDelete
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