import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [accountToDeleteName, setAccountToDeleteName] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        accountsData();
        if (sessionStorage.getItem('account_id')) {
            clearSessionStorage();
        }
    }, []);

    const deleteAccount = async(account_id) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`https://bread-finance-api.vercel.app/api/account/${account_id}`, {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            setAccountToDelete(null);
            setAccountToDeleteName(null);
            accountsData();
        } catch (error) {
            console.error(error.response?.data.message);
        }
    }

    const accountsData = async() => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get('https://bread-finance-api.vercel.app/api/accounts', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            setAccounts(response.data.data.accounts);
        } catch (error) {
            console.error(error.response?.message);
        }
    }

    const clearSessionStorage = () => {
        sessionStorage.removeItem('account_id');
    }

    const getTotalBalance = () => {
        return accounts.reduce((sum, account) => sum + (account.balance || 0), 0);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
                <header className="bg-blue-900 rounded-3xl shadow-xl p-6 mb-8 text-white">
                    <h1 className="text-3xl font-bold mb-4 text-center">All Accounts</h1>

                    <div className="balance-info text-center mb-6">
                        <h2 className="text-green-400 text-3xl font-bold">IDR {getTotalBalance()}</h2>
                        <p className="text-gray-200">Total Balance</p>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button 
                            type="button" 
                            onClick={() => nav("/add-account")} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Account
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
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                <div className="bg-blue-950 bg-opacity-95 rounded-3xl shadow-xl p-6 text-white">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-slate-800 text-left">
                                <th className="px-4 py-3">Created Date</th>
                                <th className="px-4 py-3">Account Name</th>
                                <th className="px-4 py-3">Account Type</th>
                                <th className="px-4 py-3">Balance</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account.account_id} className="border-t border-gray-700">
                                    <td className="px-4 py-3">
                                        {(() => {
                                            const date = new Date(account.createdAt);
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} 
                                            ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                        })()}
                                    </td>
                                    <td className="px-4 py-3">{account.account_name}</td>
                                    <td className="px-4 py-3">{account.account_type}</td>
                                    <td className="px-4 py-3">IDR {account.balance}</td>
                                    <td className="px-4 py-3">
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
                                            onClick={() => {
                                                sessionStorage.setItem('account_id', account.account_id);
                                                nav('/account-details');
                                            }}
                                        >
                                            Details
                                        </button>
                                        <button  
                                            type="button" 
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                            onClick={() => {
                                                setAccountToDelete(account.account_id);
                                                setAccountToDeleteName(account.account_name);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {accountToDelete && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96">
                                <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Deletion</h3>
                                <p className="text-gray-700">
                                    Are you sure you want to delete account: <span className="font-semibold">{accountToDeleteName}</span>?
                                </p>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        onClick={() => deleteAccount(accountToDelete)}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAccountToDelete(null);
                                            setAccountToDeleteName(null);
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

export default Accounts;
