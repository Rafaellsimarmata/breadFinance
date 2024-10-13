import prisma from "../config/db.config.js"


const addCategoryByUserIdDb = (userId, categoryData) => {
    const userCategoryRes = prisma.category.create({
        data: {
            userId: userId,
            category_name: categoryData.category_name,
          
        }
    })
    return userCategoryRes
}


const getCategoriesByUserIdDb = (userId) => {
    const userCategories = prisma.category.findMany({
        where: { userId }
    })
    return userCategories
}

const userUpdateCategoryDb = (categoryId, categoryData) => {
    const userCategoryUpdate = prisma.category.updateMany({
        where: {
            category_id: categoryId
        },
        data: {  
            category_name: categoryData.name,
       
        }
    })

    return userCategoryUpdate
}



const userDeleteCategoryDb = (categoryId) => {
   return prisma.category.delete({
        where: {
            category_id: categoryId,
        }

    })
}




export {getCategoriesByUserIdDb, addCategoryByUserIdDb, userUpdateCategoryDb, userDeleteCategoryDb}