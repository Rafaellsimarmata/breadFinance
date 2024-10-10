import {getCategorysByUserIdDb, addCategoryByUserIdDb, userUpdateCategoryDb, userDeleteCategoryDb} from "./category.repository.js";

const getUserCategories = async (userId) => {
    const userCategories = await getCategorysByUserIdDb(userId)
    if (!userCategories) throw new Error("The user doesn't have any categories!")
    return userCategories
}

const addUserCategory = async (userId, categoryData) => { 
    const categoryDataResult = await addCategoryByUserIdDb(userId, categoryData)
    if(!categoryDataResult) throw new Error("failed creating category")
    return categoryDataResult
}

const userUpdateCategory = async (categoryId, categoryData) => { 
    const categoryDataResult = await userUpdateCategoryDb(categoryId, categoryData)
    if(!categoryDataResult) throw new Error("failed updating category")
    return categoryDataResult
}


const userDeleteCategory = async (categoryId) => { 
    const categoryDataResult = await userDeleteCategoryDb(categoryId)
    if(!categoryDataResult) throw new Error("failed deleting category")
    return categoryDataResult
}


export {getUserCategorys, addUserCategory, userUpdateCategory, userDeleteCategory}