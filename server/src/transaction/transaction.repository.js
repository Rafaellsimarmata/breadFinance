import prisma from "../config/db.config.js"

const findTransactionsByUserIdDb = async (userId) => {
    const transactionsData = await prisma.transaction.findMany({
        where: {
            userId
        }
    })

    return transactionsData
}
/*
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
    */

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



export {
    findTransactionsByUserIdDb,
    // findUserTransactionsByFilters,
    // findUserTransactionsByAccountIdDb,
    // findUserTransactionsByCategoryIdDb,
    // findUserTransactionsByCreatedTimeDb,
    // findUserTransactionsByTypeDb,
    // findUserTransactionsByDescDb,
    createUserTransactionsDb,
    findUserTransactionsByFiltersDb
}