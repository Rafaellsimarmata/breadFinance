import {getGoalsByUserIdDb, addGoalByUserIdDb, userUpdateGoalDb, userDeleteGoalDb} from "./goal.repository.js";

const getUserGoals = async (userId) => {
    const userGoals = await getGoalsByUserIdDb(userId)
    if (!userGoals) throw new Error("The user doesn't have any goals!")
    return userGoals
}

const addUserGoal = async (userId, goalData) => { 
    const goalDataResult = await addGoalByUserIdDb(userId, goalData)
    if(!goalDataResult) throw new Error("failed creating goal")
    return goalDataResult
}

const userUpdateGoal = async (goalId, goalData) => { 
    const goalDataResult = await userUpdateGoalDb(goalId, goalData)
    if(!goalDataResult) throw new Error("failed updating goal")
    return goalDataResult
}


const userDeleteGoal = async (goalId) => { 
    const goalDataResult = await userDeleteGoalDb(goalId)
    if(!goalDataResult) throw new Error("failed deleting goal")
    return goalDataResult
}


export {getUserGoals, addUserGoal, userUpdateGoal, userDeleteGoal}