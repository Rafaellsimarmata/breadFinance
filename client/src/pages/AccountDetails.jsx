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
            <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-left">
                        <header className="bg-blue-900 rounded-3xl shadow-xl p-8">
                        <div className="">
                            <h2 className="text-gray-200 font-bold text-3xl mb-4">Details for</h2>
                            <h1 className="text-3xl text-pink-500 font-bold ">
                            {accounts.length > 0 ? accounts[0].account_name : ''}
                            </h1>
                        </div>
                        </header>
                    </div>
                    <div className="text-left">
                        <div className="bg-blue-900 rounded-3xl shadow-lg p-8 text-white h-full">
                            <h2 className="text-gray-200 font-bold text-3xl mb-4">Total Balance</h2>
                            <h2 className="text-green-400 text-2xl font-bold">
                                IDR {accounts.length > 0 ? accounts[0].balance : '0'}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-950 bg-opacity-95 rounded-3xl shadow-xl p-6 text-white">
                    <div className="flow-root space-x-4 mb-4">
                        <button
                            type="button"
                            onClick={() => nav("/add-transaction", { state: { from: location.pathname } })}
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
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-slate-800 text-left">
                                <th className="px-4 py-3">Created Date</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Transaction Type</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.transaction_id} className="border-t border-gray-700">
                                    <td className="px-4 py-3">
                                        {(() => {
                                            const date = new Date(transaction.createdAt);
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} 
                                            ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                        })()}
                                    </td>
                                    <td className="px-4 py-3">{transaction.description}</td>
                                    <td className="px-4 py-3">{transaction.transaction_type}</td>
                                    <td className="px-4 py-3">IDR {transaction.amount}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                            onClick={() => {
                                                setTransactionToDelete(transaction.transaction_id);
                                                setTransactionToDeleteName(transaction.description);
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
                                <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Deletion</h3>
                                <p className="text-gray-700">
                                    Are you sure you want to delete transaction: <span className="font-semibold">{transactionToDeleteName}</span>?
                                </p>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        onClick={() => deleteTransaction(transactionToDelete)}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTransactionToDelete(null);
                                            setTransactionToDeleteName(null);
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
