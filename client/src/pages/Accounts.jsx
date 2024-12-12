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
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-left">
                    <header className="bg-blue-900 rounded-3xl shadow-xl p-8">
                        <h1 className="text-3xl font-bold mb-4 text-left text-white ml-4">All Accounts</h1>
                        <div className="flex flex-col balance-info mb-4 ml-4">
                            <p className="text-left text-gray-300 mb-4">
                            Manage and track your financial accounts. Keep an overview of your banking details.
                            </p>
                        </div>
                    </header>
                </div>
                <div className="text-left">
                    <div className="bg-blue-900 rounded-3xl shadow-lg p-8 text-white h-full">
                        <h2 className="text-gray-200 font-bold text-3xl mb-4">Total Balance</h2>
                        <h2 className="text-green-400 text-2xl font-bold">IDR {getTotalBalance()}</h2>
                    </div>
                </div>
            </div>
        
            <div className="bg-blue-900 rounded-3xl shadow-xl p-4">
                <div className="flow-root space-x-4 mb-4">
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
                </div>
        
                <table className="w-full table-auto text-white">
                    <thead>
                        <tr className="bg-slate-800 text-left">
                            <th className="px-4 py-2">Created Date</th>
                            <th className="px-4 py-2">Account Name</th>
                            <th className="px-4 py-2">Account Type</th>
                            <th className="px-4 py-2">Balance</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.account_id} className="border-t">
                                <td className="px-4 py-2">
                                    {(() => {
                                        const date = new Date(account.createdAt);
                                        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} 
                                        ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                    })()}
                                </td>
                                <td className="px-4 py-2">{account.account_name}</td>
                                <td className="px-4 py-2">{account.account_type}</td>
                                <td className="px-4 py-2">IDR {account.balance}</td>
                                <td className="px-4 py-2">
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
        
    )
}

export default Accounts;
