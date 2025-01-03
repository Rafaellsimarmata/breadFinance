import { getAccountByAccountIdDb } from "../account/account.repository.js"
import { getCategoryByCategoryIdDb } from "../category/category.repository.js"
import {
    findTransactionsByUserIdDb,
    createUserTransactionsDb,
    findUserTransactionsByFiltersDb,
    deleteUserTransactionsDb

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

// TRY FILTER BY PARAM
const filterUserTransactions = async (userId, filters) => {
    const filteredTransactions = await findUserTransactionsByFiltersDb(userId, filters);
    if (!filteredTransactions) throw new Error("failed fetching filtered transactions data!");
    return filteredTransactions;
};

const deleteUserTransaction = async (transactionId) => {
    const deleteTransaction = await deleteUserTransactionsDb(transactionId)
    if (!deleteTransaction) throw new Error("failed deleting transactions data!");
    return deleteTransaction;
}

export {
    getUserTransactions,
    // getUserTransactionsByDesc,
    filterUserTransactions,
    addUserTransaction,
    deleteUserTransaction
}