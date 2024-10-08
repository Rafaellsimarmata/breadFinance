import { addUserDb, findUserByEmailDb, findUserByUsernameDb } from "./auth.repository.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const registerAccount = async (userData) => {
    const user = await findUserByEmailDb(userData.email);
    const userName = await findUserByUsernameDb(userData.userName);

    if (userName){
        throw new Error("Username already used!");
    }

    if (!user) {
        userData.password = await bcrypt.hash(userData.password, 12)
        await addUserDb(userData)
    } else throw new Error("email already used!");
}

const loginAccount = async (userData) => {
    const user = await findUserByEmailDb(userData.email)
    if (!user) throw new Error("Email or Password is incorrect!")

    const isMatchPassword = bcrypt.compare(user.password, userData.password)
    if (!isMatchPassword) throw new Error("Email or Password is incorrect!")

    return createToken(user.email)
}

export { registerAccount, loginAccount }