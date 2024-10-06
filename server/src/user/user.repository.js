import prisma from "../config/db.config.js"

const findUserByIdDb = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { user_id : userId }
    })

    return user
}

export default findUserByIdDb