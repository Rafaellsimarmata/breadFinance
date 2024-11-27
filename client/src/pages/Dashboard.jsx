import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DoughnutChart from "../components/Doughnut";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [userTransaction, setUserTransaction] = useState([])
    const [categories, setCategories] = useState([]);
    const [isTransactionsLoading, setTransactionsLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        refreshToken();
        fetchTransactions();
        accountDetails();
        if (sessionStorage.getItem('account_id')) {
            clearSessionStorage();
        }
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
            console.error(error.response?.message);
        }
    }

    const fetchTransactions = async() => {
        setTransactionsLoading(true);
        try {
            const token = Cookies.get('token');
            const response = await axios.get('https://bread-finance-api.vercel.app/api/transactions', 
                {
                    'headers' :
                    {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            setUserTransaction(response.data.data.userTransactionsData);
        } catch (error) {
            console.error("Failed to fetch transactions:", error.response?.message);
        } finally {
            setTransactionsLoading(false);
        }
    }

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
            console.error(error.response?.message)
        }
    }

    const categoryMap = categories.reduce((acc, category) => {
        acc[category.category_id] = category.category_name; // Assuming each category has id and name properties
        return acc;
    }, {});

    // Function to generate a random RGB color
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    Chart.register(CategoryScale);

    // Filter for specific transaction type
    const filteredTransactions = userTransaction.filter(
        transaction => transaction.transaction_type === "Inbound"
    );

    const aggregatedData = filteredTransactions.reduce((acc, transaction) => {
        acc[transaction.categoryId] = (acc[transaction.categoryId] || 0) + transaction.amount;
        return acc;
    }, {});

    // pecah object ke beberapa bagian
    const labels = Object.keys(aggregatedData).map(catId => categoryMap[catId]);
    const amount = Object.values(aggregatedData);
    const backgroundColor = labels.map(() => getRandomColor());

    const inBoundChartData = {
        labels: labels,
        datasets: [{
          label: 'Income Chart',
          data: amount,
          backgroundColor: backgroundColor,
          hoverOffset: 4
        }]
      }

    // Filter for specific transaction type
    const outBoundFilteredTransactions = userTransaction.filter(
        transaction => transaction.transaction_type === "Outbound"
    );

    const outBoundaggregatedData = outBoundFilteredTransactions.reduce((acc, transaction) => {
        acc[transaction.categoryId] = (acc[transaction.categoryId] || 0) + transaction.amount;
        return acc;
    }, {});

    // pecah object ke beberapa bagian
    const outBoundLabels = Object.keys(outBoundaggregatedData).map(catId => categoryMap[catId]);
    const outBoundAmount = Object.values(outBoundaggregatedData);
    const outBoundBackgroundColor = outBoundLabels.map(() => getRandomColor());
    
    const outBoundChartData = {
        labels: outBoundLabels,
        datasets: [{
          label: 'Outcome Chart',
          data: outBoundAmount,
          backgroundColor: outBoundBackgroundColor,
          hoverOffset: 4
        }]
    }

    const clearSessionStorage = () => {
        sessionStorage.removeItem('account_id');
    }

    // console.log(userTransaction)
    console.log(isTransactionsLoading)

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300 p-8">
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
                <div className="bg-white rounded-lg shadow-lg p-8 flex">
                    {/* Left */}
                    <div className="flex-1 text-left pr-8">
                        <h1 className="text-4xl font-bold mb-4 text-black">BreadFinance</h1>
                        <p className="text-lg text-black mb-6">
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
                            onClick={() => nav("/transactions")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors w-48"
                        >   
                            View Transactions
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/categories")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors w-48"
                        >   
                            View Categories
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/goals")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors w-48"
                        >   
                            View Goals
                        </button>
                    </div>

                    <div>
                        <DoughnutChart chartData={inBoundChartData} title={"Income Flow"}/>
                    </div>

                    <div>
                        <DoughnutChart chartData={outBoundChartData} title={"Outcome Flow"}/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard
