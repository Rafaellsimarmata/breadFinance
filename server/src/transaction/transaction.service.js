import {
    findTransactionsByUserIdDb,
    findUserTransactionsByAccountIdDb,
    findUserTransactionsByCategoryIdDb,
    findUserTransactionsByCreatedTimeDb,
    findUserTransactionsByTypeDb,
    findUserTransactionsByFilters,
    findUserTransactionsByDescDb,
    createUserTransactionsDb
} from "./transaction.repository.js"

const addUserTransaction = async (userId, transactionData) => {
    // still incorect
    // need to validate first whether 
    // the accountId or CategoryId belongs to userId
    const userTransaction = await createUserTransactionsDb(userId, transactionData)
    if (!userTransaction) throw new Error("failed adding user transaction data!")
    return userTransaction
}

const getUserTransactions = async (userId) => {
    const userTransactions = await findTransactionsByUserIdDb(userId)
    if (!userTransactions) throw new Error("failed fetching user transactions data!")
    return userTransactions
}

const getUserTransactionsByDesc = async (userId, desc) => {
    const userTransactions = await findUserTransactionsByDescDb(userId, desc)
    if (!userTransactions) throw new Error("failed fetching user transactions data!")
    return userTransactions
}

const filterUserTransactions = async (userId, filterData) => {
    const userTransactions = await findUserTransactionsByFilters(userId, filterData)
    if (!userTransactions) throw new Error("failed fetching user transactions data!")
    return userTransactions
}

export {
    getUserTransactions,
    getUserTransactionsByDesc,
    filterUserTransactions,
    addUserTransaction
}