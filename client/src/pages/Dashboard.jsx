import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DoughnutChart from "../components/Doughnut";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
            setEmail(response.data.userData.email);
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
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
        {/* Navbar */}
        <nav className="bg-blue-900 bg-opacity-90 rounded-3xl shadow-xl p-4 mb-8">
            <div className="flex justify-between items-center">
            <h2 className="mx-5 mt-2 font-semibold text-base text-white">Welcome Back, {name}</h2>
            </div>
        </nav>

        {/* Grid Layout */}
        <div className="grid grid-cols-4 gap-6">

            {/* Left Section (3/4 of the Width) */}
            <div className="col-span-3 flex flex-col gap-6">

            {/* Balance Section */}
            <h1 className="text-4xl font-bold mt-2 mb-4 text-blue-900">My Dashboard</h1>
            <div className="bg-blue-900 p-6 shadow-lg rounded-3xl text-white">
                <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                    <h2 className="text-xl font-bold mb-2">Total Balance</h2>
                    <p className="text-2xl font-bold text-gray-200">Rp15.234.500</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Earnings</h2>
                    <p className="text-2xl font-bold text-green-500">Rp5.091.000</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Expenses</h2>
                    <p className="text-2xl font-bold text-pink-700">Rp3.500.120</p>
                </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="flex justify-between items-center mt-5">
                <h2 className="text-2xl font-bold text-blue-900">Statistics</h2>
                <button
                type="button"
                onClick={() => nav("/transactions")}
                className="flex items-center space-x-1 px-2 py-1 border border-blue-900 text-blue-900 text-sm font-semibold rounded-full hover:bg-blue-200 transition-colors"
                >
                    <span>View Transaction</span>
                    <span className="text-sm">→</span>
                </button>
            </div>

            <div className="bg-blue-900 rounded-3xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Contributor</h2>
                <p className="text-xs mb-4">Your earnings and expand statistics</p>
                <div className="flex space-x-4">
                <DoughnutChart chartData={inBoundChartData} title={"Income Flow"} />
                <DoughnutChart chartData={outBoundChartData} title={"Outcome Flow"} />
                </div>
            </div>

            {/* Goals and Other Savings */}
            <div className="grid grid-cols-3 gap-2">

                {/* Goals Section */}
                <div className="col-span-2 text-white rounded-3xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-900">Goals</h2>
                        <button
                        onClick={() => nav("/goals")}
                        className="text-xs font-medium bg-blue-900 text-white px-2 py-1 rounded-full shadow-sm hover:bg-blue-200"
                        >
                        Add Goals
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 h-full">
                        {/* Goal 1 */}
                        <div className="bg-blue-900 shadow-lg rounded-3xl p-4">
                        <h2 className="text-4xl font-bold">82%</h2>
                        <div className="relative mt-2">
                            <div className="w-full h-2 bg-blue-700 rounded-full"></div>
                            <div className="absolute top-0 left-0 h-2 bg-pink-600 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                        <p className="mt-4 text-lg font-medium">New Phone</p>
                        </div>

                        {/* Goal 2 */}
                        <div className="bg-blue-900 shadow-lg rounded-3xl p-4">
                        <h2 className="text-4xl font-bold">39%</h2>
                        <div className="relative mt-2">
                            <div className="w-full h-2 bg-blue-700 rounded-full"></div>
                            <div className="absolute top-0 left-0 h-2 bg-pink-600 rounded-full" style={{ width: "39%" }}></div>
                        </div>
                        <p className="mt-4 text-lg font-medium">Duolingo Test</p>
                        </div>
                    </div>
                </div>

                {/* Other Savings */}
                <div className="h-full mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-900">Other Savings</h2>
                        <button
                            onClick={() => nav("/accounts")}
                            className="text-xs font-medium bg-blue-900 text-white px-2 py-1 rounded-full shadow-sm hover:bg-blue-200"
                            >
                            View Others
                            </button>
                    </div>
                    <div className="bg-blue-900 text-white shadow-lg rounded-3xl p-6 mt-5">
                        <p className="text-lg">
                            Total Expense:
                            <span className="block text-pink-600 text-2xl font-bold">Rp133.540.000</span>
                        </p>
                        <p className="text-xs text-gray-300 mt-2">Profit is 48% More than last Month</p>
                    </div>
                </div>
            </div>
            </div>

            {/* Right Section (1/4 of the Width) */}
            <div className="flex flex-col gap-6 h-full columns-3">

                {/* Profile Panel */}
                <div className="bg-blue-900 text-white p-6 rounded-3xl basis-2/3">
                    <div className="text-center">
                        <img src={""} alt="Profile" className="w-24 h-24 rounded-full border mx-auto mt-36" />
                        <h2 className="text-sm font-semibold mt-2"> {email}</h2>
                        <h2 className="text-2xl font-bold mt-6">{name}</h2>
                        <button
                        type="button"
                        onClick={() => nav("/Profile")}
                        className="flex items-center space-x-1 px-2 py-1 border border-white text-white text-sm font-semibold rounded-full hover:bg-blue-200 transition-colors mx-auto mt-7"
                        >
                            <span>View Profile</span>
                        </button>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="bg-blue-900 rounded-3xl shadow-lg p-6 basis-1/3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-xl font-bold">Transaction List</h2>
                    </div>
                    <div className="max-h-full overflow-y-auto">
                        <table className="w-full table-auto text-white">
                            <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr
                                key={transaction.transaction_id}
                                className="border-t"
                                >
                                <td className="px-4 py-2">{transaction.description}</td>
                                <td className="px-4 py-2">{transaction.transaction_type}</td>
                                <td className="px-4 py-2">{transaction.amount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button type="button"
                    onClick={() => nav("/transactions")}className="bg-blue-900 rounded-3xl shadow-lg p-4 flex flex-row justify-between hover:bg-blue-200 transition-colors">
                    <h2 className="text-white text-lg">See all transaction</h2>
                    <div className="border border-white text-white text-sm font-semibold rounded-md mt-1">    
                        <span className="text-sm p-3 mx-0 my-0">→</span>
                    </div>    
                </button>
            </div>
        </div>
    </div>
    )
}

{/* <div className="flex-1 flex flex-col space-y-4 items-center">
                        <button 
                            type="button" 
                            onClick={() => nav("/accounts")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-200 transition-colors w-48"
                        >
                            View Accounts
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/transactions")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-200 transition-colors w-48"
                        >   
                            View Transactions
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/categories")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-200 transition-colors w-48"
                        >   
                            View Categories
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/goals")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-200 transition-colors w-48"
                        >   
                            View Goals
                        </button>
</div> */}

export default Dashboard
