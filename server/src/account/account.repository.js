import prisma from "../config/db.config.js"

const getAccountsByUserIdDb = (userId) => {
    const userAccounts = prisma.account.findMany({
        where: { userId }
    })
    return userAccounts
}

const getAccountByAccountIdDb = (accoutId) => {
    const accountData = prisma.account.findUnique({
        where : {account_id : accoutId}
    })
    return accountData
}

const addAccountByUserIdDb = (userId, accountData) => {
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

const userUpdateAccountDb = (accountId, accountData) => {
    const userAccountUpdate = prisma.account.updateMany({
        where: {
            account_id: accountId
        },
        data: {  
            account_name: accountData.name,
            account_type: accountData.type,
            balance: accountData.balance,
        }
    })

    return userAccountUpdate
}

const userDeleteAccountDb = (accountId) => {
   return prisma.account.delete({
        where: {
            account_id: accountId,
        }
    })
}

export { 
    getAccountByAccountIdDb, 
    getAccountsByUserIdDb,
    addAccountByUserIdDb, 
    userUpdateAccountDb, 
    userDeleteAccountDb 
}