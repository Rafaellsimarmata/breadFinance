import { Router } from 'express';
import { getUserAccounts, addUserAccount } from "./account.service.js";

const router = Router()

router.get("/accounts", async (req, res) => {
    // this still not work yet 
    const { id } = req.user
   

    try {
        const accounts = await getUserAccounts(id)

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

router.post("/account", async (req, res) => {
    // need fix!!!
    // const {id} = req.user  
    const id = "cm20l5ts50000vaoax683t30v"
    const userData = req.body
    userData.userId = id

    try {
        const accountDataResult = await addUserAccount(id, userData)

        res.status(200).json({
            status: 200,
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





export default router