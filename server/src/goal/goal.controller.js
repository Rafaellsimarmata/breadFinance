import { Router } from 'express';
import { getUserGoals, addUserGoal, userUpdateGoal, userDeleteGoal} from "./goal.service.js";
import authenticateToken from '../middleware/token.auth.js';

const router = Router()

router.get("/goals", authenticateToken, async (req, res) => {

    const { userId } = req.user;
    const userData = req.body
    userData.userId = userId

    try {
        const goals = await getUserGoals(userId)

        res.status(200).json({
            status: 200,
            message: "User Goals retrieved successfully",
            data: {
                goals
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.post("/goal",authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const userData = req.body
    userData.userId = userId

    try {
        const goalDataResult = await addUserGoal(userId, userData)

        res.status(201).json({
            status: 201,
            message: "User Goals added successfully",
            data: {
                goalDataResult
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.put("/goal/:goalId",authenticateToken, async (req, res) => {

    const goalId = req.params.goalId;
    const goalData = req.body
    try {
        const goalDataUpdate = await userUpdateGoal(goalId, goalData)

        res.status(201).json({
            status: 201,
            message: "User Goals updated",
            data: {
                goalDataUpdate
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.delete("/goal/:goalId",authenticateToken, async (req, res) => {
  
    const goalId = req.params.goalId;

    try {
        const goalDataDelete = await userDeleteGoal(goalId)

        res.status(200).json({
            status: 200,
            message: "User Goals Deleted",
            data: {
                goalDataDelete
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