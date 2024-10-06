import {getAccountsByUserIdDb, addAccountByUserIdDb} from "./account.repository.js";

const getUserAccounts = async (userId) => {
    const userAccounts = await getAccountsByUserIdDb(userId)
    if (!userAccounts) throw new Error("The user doesn't have any accounts!")
    return userAccounts
}

const addUserAccount = async (userId, accountData) => { 
    const accountDataResult = await addAccountByUserIdDb(userId, accountData)
    if(!accountDataResult) throw new Error("failed creating account")
    return accountDataResult
}

export {getUserAccounts, addUserAccount}