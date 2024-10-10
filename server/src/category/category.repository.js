import prisma from "../config/db.config.js"


const addCategoryByUserIdDb = (userId, accountData) => {
    const userAccountRes = prisma.account.create({
        data: {
            userId: userId,
            account_name: accountData.name,
            account_type: accountData.type,
            balance: accountData.balance,
        }
    })
    return userAccountRes
}
