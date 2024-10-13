

import { Router } from 'express';
import {getUserCategories, addUserCategory, userUpdateCategory, userDeleteCategory} from "./category.service.js";
import authenticateToken from '../middleware/token.auth.js';

const router = Router()

router.get("/categories", authenticateToken, async (req, res) => {

    const { userId } = req.user;
    const categoryData = req.body
    categoryData.userId = userId

    try {
        const categories = await getUserCategories(userId)

        res.status(200).json({
            status: 200,
            message: "User Categories retrieved successfully",
            data: {
                categories
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.post("/category",authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const categoryData = req.body
    categoryData.userId = userId

    try {
        const categoryDataResult = await addUserCategory(userId, categoryData)

        res.status(201).json({
            status: 201,
            message: "User Categories added successfully",
            data: {
                categoryDataResult
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.put("/category/:accId",authenticateToken, async (req, res) => {

    const categoryId = req.params.accId;
    const categoryData = req.body
    try {
        const categoryDataUpdate = await userUpdateCategory(categoryId, categoryData)

        res.status(201).json({
            status: 201,
            message: "User Categories updated",
            data: {
                categoryDataUpdate
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.delete("/category/:accId",authenticateToken, async (req, res) => {
  
    const categoryId = req.params.accId;

    try {
        const categoryDataDelete = await userDeleteCategory(categoryId)

        res.status(200).json({
            status: 200,
            message: "User Categories Deleted",
            data: {
                categoryDataDelete
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