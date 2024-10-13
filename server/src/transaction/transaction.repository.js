import prisma from "../config/db.config.js"

const findTransactionsByUserIdDb = async (userId) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId
        }
    })

    return transactionsData
}

const findUserTransactionsByAccountIdDb = async (accountId, userId) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            accountId,
            userId
        }
    })

    return transactionsData
}

const findUserTransactionsByCategoryIdDb = async (categoryId, userId) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            categoryId,
            userId
        }
    })

    return transactionsData
}

const findUserTransactionsByCreatedTimeDb = async (startTime, endTime, userId) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId,
            createdTime: {
                gte: new Date('2024-01-01'),  // start date of the range
                lte: new Date('2024-12-31'),  // end date of the range
            }
        }
    })
    return transactionsData
}

const findUserTransactionsByTypeDb = async (userId, transactionType) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId,
            transaction_type: transactionType
        }
    })
    return transactionsData
}

const findUserTransactionsByDescDb = async (userId, desc) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId,
            description: {
                contains: desc,  // equivalent to SQL's '%Desc%'
                mode: 'insensitive'  // optional: case-insensitive search
            }
        }
    })
    return transactionsData
}

const findUserTransactionsByFilters = async (userId, filterData) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId,
            ...filterData
        }
    })
    return transactionsData
}

const createUserTransactionsDb = async (userId, transactionData) => {
    const transactionDataResult = await prisma.transaction.create({
        data : {
            userId,
            accountId : transactionData.accountId,
            categoryId : transactionData.categoryId,
            amount : transactionData.amount,
            description : transactionData.description,
            transaction_type : transactionData.transactionType,
        }
    })
    return transactionDataResult
}

export {
    findUserTransactionsByFilters,
    findTransactionsByUserIdDb,
    findUserTransactionsByAccountIdDb,
    findUserTransactionsByCategoryIdDb,
    findUserTransactionsByCreatedTimeDb,
    findUserTransactionsByTypeDb,
    findUserTransactionsByDescDb,
    createUserTransactionsDb
}