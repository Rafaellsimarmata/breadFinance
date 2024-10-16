import { getAccountByAccountIdDb } from "../account/account.repository.js"
import { getCategoryByCategoryIdDb } from "../category/category.repository.js"
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
    // check if account id belong to valid user id 
    const accountData = await getAccountByAccountIdDb(transactionData.accountId)
    if (!accountData) throw new Error("Account not found!")
    if(accountData.userId != userId) throw new Error("Unauthorized user!")

    // check if account id belong to valid user id 
    const categoryData = await getCategoryByCategoryIdDb(transactionData.categoryId)
    if (!categoryData) throw new Error("Category not found!")
    if(categoryData.userId != userId) throw new Error("Unauthorized user!")

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