import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        refreshToken()
    }, []);

    const refreshToken = async() => {
        try 
        {
            const token = Cookies.get('token')
            const response = await axios.get('https://bread-finance-api.vercel.app/api/profile', {
                'headers': 
                {
                'Authorization': 'Bearer ' + token
                }
            });
            console.log(response.data.message);
            setName(response.data.userData.userName);
        } 
        catch (error) 
        {
            console.log(error.response?.message)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-8">
                {/* Navbar */}
                <nav className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 mb-8">
                    <div className="flex justify-between items-center">
                        <h2 className="mx-5 mt-2 font-semibold text-lg">Welcome Back, {name}</h2>
                        <div>
                            <button 
                                type="button" 
                                onClick={() => nav("/profile")} 
                                className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Profile
                            </button>
                            <button 
                                type="button" 
                                onClick={() => nav("/logout")} 
                                className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Content */}
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-lg p-8 flex">
                    {/* Left */}
                    <div className="flex-1 text-left pr-8">
                        <h1 className="text-4xl font-bold mb-4 text-white">BreadFinance</h1>
                        <p className="text-lg text-white mb-6">
                            Manage all your financial accounts with ease, track balances, and view detailed information at a glance. 
                            BreadFinance helps you stay on top of your finances, providing a smooth and efficient experience.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex-1 flex flex-col space-y-4 items-center">
                        <button 
                            type="button" 
                            onClick={() => nav("/accounts")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors w-48"
                        >
                            View Accounts
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/accounts")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors w-48"
                        >
                            View Transactions
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
