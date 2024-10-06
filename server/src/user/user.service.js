import findUserByIdDb from "./user.repository.js"

const getUserDataById = async (userId) => {
    const userData = await findUserByIdDb(userId)
    if (!userData) new Error("email already used!")
    return userData
}

export default getUserDataById