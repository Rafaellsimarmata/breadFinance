import prisma from "../config/db.config.js"

const getGoalsByUserIdDb = (userId) => {
    const userGoals = prisma.goal.findMany({
        where: { userId }
    })
    return userGoals
}

const addGoalByUserIdDb = (userId, goalData) => {
    const userGoalRes = prisma.goal.create({
        data: {
            userId: userId,
            amount: goalData.amount,
            description: goalData.description
        }
    })
    return userGoalRes
}

const userUpdateGoalDb = (goalId, goalData) => {
    const userGoalUpdate = prisma.goal.updateMany({
        where: {
            goal_id: goalId
        },
        data: {  
            amount: goalData.amount,
            description: goalData.description
        }
    })

    return userGoalUpdate
}



const userDeleteGoalDb = (goalId) => {
   return prisma.goal.delete({
        where: {
            goal_id: goalId,
        }
    })
}

export { getGoalsByUserIdDb, addGoalByUserIdDb, userUpdateGoalDb, userDeleteGoalDb }