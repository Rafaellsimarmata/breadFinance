import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        getGoals()
    }, []);

    const getGoals = async() => {
        try {
            const token = Cookies.get('token')

            const response = await axios.get('https://bread-finance-api.vercel.app/api/goals', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            setGoals(response.data.data.goals);
        } catch (error) {
            console.log(error.response?.message);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">All Goals</h1>
                    </div>
                    <div className="controls flex justify-center space-x-4">
                        <button 
                            type="button" 
                            onClick={() => nav("/add-goal")} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Goal
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
                                <th className="px-4 py-2">Created Date</th>
                                <th className="px-4 py-2">Goal Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goals.map((goal) => (
                                <tr key={goal.goal_id} className="border-t">
                                    <td className="px-4 py-2">
                                        {(() => {
                                            const date = new Date(goal.createdAt);
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                        })()}
                                    </td>
                                    <td className="px-4 py-2">{goal.goal_id}</td>
                                    <td className="px-4 py-2">{goal.description}</td>
                                    <td className="px-4 py-2">{goal.amount}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
                                            onClick={() => {}}
                                        >
                                            Details
                                        </button>
                                        <button  
                                            type="button" 
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                            onClick={() => {}}
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

export default Goals
