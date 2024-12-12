import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [goalToDelete, setGoalToDelete] = useState(null);
    const [goalToDeleteName, setGoalToDeleteName] = useState(null);
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
            console.error(error.response?.message);
        }
    }

    const deleteGoal = async(goal_id) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`https://bread-finance-api.vercel.app/api/goal/${goal_id}`,
                {
                    'headers':
                    {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response.data.message)
            setGoalToDelete(null)
            setGoalToDeleteName(null)
            getGoals()
        } catch (error) {
            console.error(error.response)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
            <header className="bg-blue-900 rounded-3xl shadow-xl p-6 mb-8 text-white">
                <h1 className="text-3xl font-bold mb-4 text-center">All Goals</h1>
                <p className="text-center text-gray-300 mb-4">
                    Track and manage your financial goals
                </p>
            </header>

            <div className="bg-blue-900 rounded-3xl shadow-xl p-4">
                <div className="flow-root space-x-4 mb-4">
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
                </div>

                <table className="w-full table-auto text-white">
                    <thead>
                        <tr className="bg-slate-800 text-left">
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
                                        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} 
                                        ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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
                                        onClick={() => {
                                            setGoalToDelete(goal.goal_id);
                                            setGoalToDeleteName(goal.description);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {goalToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Deletion</h3>
                            <p className="text-gray-700">Are you sure you want to delete goal: <span className="font-semibold">{goalToDeleteName}</span>?</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => deleteGoal(goalToDelete)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => {
                                        setGoalToDelete(null);
                                        setGoalToDeleteName(null);
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
       
    )
}

export default Goals
