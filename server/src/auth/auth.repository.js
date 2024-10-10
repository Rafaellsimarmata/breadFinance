import prisma from "../config/db.config.js"

const findUserByEmailDb = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    return user
}

const findUserByUsernameDb = async (username) => {
    const user = await prisma.user.findUnique({
        where: { username }
    })

    return user
}


const addUserDb = async (userData) => {
    const user = await prisma.user.create({
        data: {
            username: userData.userName,
            email: userData.email,  
            password: userData.password,
            name: userData.fullName
        }
    })

    return user
}



export {
    findUserByEmailDb,
    findUserByUsernameDb,
    addUserDb,
    
}