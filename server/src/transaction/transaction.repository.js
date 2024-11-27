import prisma from "../config/db.config.js"

const findTransactionsByUserIdDb = async (userId) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId
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

//TRY
 const findUserTransactionsByFiltersDb = async (filters) => {
    const {
        type,
        description,
        startDate,
        endDate,
        minAmount,
        maxAmount,
        accountId
    } = filters;

    const whereClause = {};

    // Filter accountId
    if (accountId) {
        whereClause.accountId = accountId;
    }


    // Filter type 
    if (type) {
        whereClause.transaction_type = type; // misalnya 'masuk' atau 'keluar'
    }

    // Filter deskripsi
    if (description) {
        whereClause.description = {
            contains: description, 
            mode: 'insensitive' 
        };
    }

    // Filter range tanggal
    if (startDate || endDate) {
        whereClause.createdAt= {};
        if (startDate) {
            whereClause.createdAt.gte = new Date(startDate); 
        }
        if (endDate) {
            whereClause.createdAt.lte = new Date(endDate); 
        }
    }

    // Filter range amount
    if (minAmount || maxAmount) {
        whereClause.amount = {} ;
        if (minAmount) {
            whereClause.amount.gte = parseInt(minAmount);
        }
        if (maxAmount) {
            whereClause.amount.lte = parseInt(maxAmount); 
        }
    }

 
    // Query ke database menggunakan Prisma
    const transactions = await prisma.transaction.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }, 
    });

    return transactions;
};


const deleteUserTransactionsDb = (transactionId) => {
    return prisma.transaction.delete({
         where: {
             transaction_id: transactionId,
         }
     })
 }


export {
    findTransactionsByUserIdDb,
    // findUserTransactionsByFilters,
    // findUserTransactionsByAccountIdDb,
    // findUserTransactionsByCategoryIdDb,
    // findUserTransactionsByCreatedTimeDb,
    // findUserTransactionsByTypeDb,
    // findUserTransactionsByDescDb,
    createUserTransactionsDb,
    findUserTransactionsByFiltersDb,
    deleteUserTransactionsDb
}