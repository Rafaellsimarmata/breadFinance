import { Router } from 'express';
import getUserDataById from './user.service.js';
import authenticateToken from '../middleware/token.auth.js';
const router = Router();

router.get("/profile", authenticateToken, async (req, res) => {
    // console.log("Hello World")

    try {
        // the req.user is to get user id that saved in localStorage
        // later this will return json that contain user non-sensitived data
        // but this still doesnt work
        const { userId } = req.user;
        // const id = "cm1vv326w0000m41xbob24hy9" // deleted soon 
        // console.log(userId);
        const userRawData = await getUserDataById(userId)

        res.status(200).json({
            status: 200,
            message: "Successfully get user data",
            userData: {
                fullName: userRawData.name,
                userName: userRawData.username,
                email: userRawData.email
            }
        });
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

export default router