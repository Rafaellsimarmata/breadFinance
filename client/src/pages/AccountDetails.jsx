import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
    const nav = useNavigate();
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [transactionToDeleteName, setTransactionToDeleteName] = useState(null);

    useEffect(() => {
        fetchTransactions();
        accountDetailsData();
    }, []);

    const fetchTransactions = async() => {
        try {
            const token = Cookies.get('token');
            const accountId = sessionStorage.getItem('account_id')
            const response = await axios.get('https://bread-finance-api.vercel.app/api/transactions', 
                {
                    'headers' :
                    {
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            console.log(response.data.message);
            const filteredByAccountId = response.data.data.userTransactionsData.filter(transaction => accountId ? transaction.accountId === accountId : true);
            setFilteredTransactions(filteredByAccountId);
        } 
        catch (error) {
            console.error(error.response?.message);
        }
    }

    const accountDetailsData = async() => {
        try {
            const token = Cookies.get('token');
            const accountId = sessionStorage.getItem('account_id')
            const response = await axios.get('https://bread-finance-api.vercel.app/api/accounts', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            const filteredByAccountId = response.data.data.accounts.filter(account => accountId ? account.account_id === accountId : true)
            setAccounts(filteredByAccountId);
        } catch (error) {
            console.error(error.response?.message);
        }
    }

    const deleteTransaction = async(transactionId) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`https://bread-finance-api.vercel.app/api/transaction/${transactionId}`,
                {
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response.data.message)
            setTransactionToDelete(null)
            setTransactionToDeleteName(null)
            fetchTransactions()
            accountDetailsData()
        } catch (error) {
            console.error(error.response?.data.message)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Account {accounts.map((account) => {account.account_name})} Details</h1>
                    </div>
                    <div className="balance-info text-center mb-4">
                        <div className="balance-item">
                            <h2 className=" text-green-500 text-2xl font-semibold">IDR {accounts.map((account) => (account.balance))}</h2>
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
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} 
                                            ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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
                                            onClick={() => {
                                                setTransactionToDelete(transactions.transaction_id),
                                                setTransactionToDeleteName(transactions.description)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {transactionToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                            <p>Are you sure you want to delete transaction: {transactionToDeleteName}</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => deleteTransaction(transactionToDelete)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => {
                                        setTransactionToDelete(null),
                                        setTransactionToDeleteName(null)
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

export default AccountDetails
