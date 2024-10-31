import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        accountDetails()
    }, []);

    const accountDetails = async() => {
        try {
            const token = Cookies.get('token')

            const response = await axios.get('https://bread-finance-api.vercel.app/api/categories', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            setCategories(response.data.data.categories);
        } catch (error) {
            console.log(error.response?.message);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-20000 to-indigo-300 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">All Categories Details for Account {Cookies.get('account_name')}</h1>
                    </div>
                    <div className="controls flex justify-center space-x-4">
                        <button 
                            type="button" 
                            onClick={() => nav("/add-category")} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Categories
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/account-details")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Account Details
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
                                            onClick={() => {console.log(categories.category_id)}}
                                        >
                                            Details
                                        </button>
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>        
    )
}

export default Categories
