import {getAccountsByUserIdDb, addAccountByUserIdDb, userUpdateAccountDb, userDeleteAccountDb} from "./account.repository.js";

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

const userUpdateAccount = async (accountId, accountData) => { 
    const accountDataResult = await userUpdateAccountDb(accountId, accountData)
    if(!accountDataResult) throw new Error("failed updating account")
    return accountDataResult
}


const userDeleteAccount = async (accountId) => { 
    const accountDataResult = await userDeleteAccountDb(accountId)
    if(!accountDataResult) throw new Error("failed deleting account")
    return accountDataResult
}


export {getUserAccounts, addUserAccount, userUpdateAccount, userDeleteAccount}