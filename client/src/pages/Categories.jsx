import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryToDeleteName, setCategoryToDeleteName] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        categoriesDetails()
    }, []);

    const categoriesDetails = async() => {
        try {
            const token = Cookies.get('token')

            const response = await axios.get('https://bread-finance-api.vercel.app/api/categories', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            setCategories(response.data.data.categories);
        } catch (error) {
            console.error(error.response?.message);
        }
    }

    const deleteCategory = async(category_id) => {
        try {
            const token = Cookies.get('token')
            const response = await axios.delete(`https://bread-finance-api.vercel.app/api/category/${category_id}`,
                {
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response.data.message)
            setCategoryToDelete(null)
            setCategoryToDeleteName(null)
            categoriesDetails()
        } catch (error) {
            console.error(error.response?.data.message)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">All Categories</h1>
                    </div>
                    <div className="controls flex justify-center space-x-4">
                        <button 
                            type="button" 
                            onClick={() => nav("/add-category")} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Category
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/dashboard")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Dashboard
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/logout")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="px-4 py-2">Category Name</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((categories) => (
                                <tr key={categories.category_id} className="border-t">
                                    <td className="px-4 py-2">{categories.category_name}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
                                        >
                                            Details
                                        </button>
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                            onClick={() => {
                                                setCategoryToDelete(categories.category_id),
                                                setCategoryToDeleteName(categories.category_name)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {categoryToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                            <p>Are you sure you want to delete category: {categoryToDeleteName}</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => deleteCategory(categoryToDelete)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => {
                                        setCategoryToDelete(null),
                                        setCategoryToDeleteName(null)
                                    }}
                                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>

        </>        
    )
}

export default Categories
