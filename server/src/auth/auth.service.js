import { addUserDb, findUserByEmailDb } from "./auth.repository.js"
import bcrypt from "bcrypt"

const registerAccount = async (userData) => {
    const user = await findUserByEmailDb(userData.email)

    if (!user) {
        userData.password = await bcrypt.hash(userData.password, 12);
        await addUserDb(userData)
    } else throw new Error("email already used!");
}

const loginAccount = async (userData) => {
    const user = await findUserByEmailDb(userData.email)
    if (!user) throw new Error("Email or Password is incorrect!");

    const isMatchPassword = bcrypt.compare(user.password, userData.password);
    if (!isMatchPassword) throw new Error("Email or Password is incorrect!");

    return user
}


export { registerAccount, loginAccount }