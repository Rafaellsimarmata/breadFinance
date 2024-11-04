import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
    const nav = useNavigate();
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async() => {
        try {
            const token = Cookies.get('token');
            const accountId = localStorage.getItem('account_id')
            const response = await axios.get('https://bread-finance-api.vercel.app/api/transactions', 
                {
                    'headers' :
                    {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            console.log(response.data.message);
            const filteredByAccountId = response.data.data.userTransactionsData.filter(transaction => 
                accountId ? transaction.accountId === accountId : true
            );
            setFilteredTransactions(filteredByAccountId);
        } 
        catch (error) {
            console.log(error.response?.message);
        }
    }

    const getTotalBalance = () => {
        return filteredTransactions.reduce((sum, transactions) => {
          if (transactions.transaction_type === 'Inbound') {
            return sum + (transactions.amount || 0);
          } 
          else if (transactions.transaction_type === 'Outbound') {
            return sum - (transactions.amount || 0);
          } 
          else {
            return sum;
          }
        }, 0);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Account {localStorage.getItem('account_name')} Details</h1>
                    </div>
                    <div className="balance-info text-center mb-4">
                        <div className="balance-item">
                            <h2 className=" text-green-500 text-2xl font-semibold">IDR {getTotalBalance()}</h2>
                            <p className="text-gray-600">Total Balance</p>
                        </div>
                    </div>
                    <div className="controls flex justify-center space-x-4">
                        <button 
                            type="button" 
                            onClick={() => nav("/add-transaction", {state: {from: location.pathname}})} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Transaction
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/accounts")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Accounts
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
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Transaction Type</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transactions) => (
                                <tr key={transactions.transaction_id} className="border-t">
                                     <td className="px-4 py-2">
                                        {(() => {
                                            const date = new Date(transactions.createdAt);
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                        })()}
                                    </td>
                                    <td className="px-4 py-2">{transactions.description}</td>
                                    <td className="px-4 py-2">{transactions.transaction_type}</td>
                                    <td className="px-4 py-2">{transactions.amount}</td>
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

export default AccountDetails
