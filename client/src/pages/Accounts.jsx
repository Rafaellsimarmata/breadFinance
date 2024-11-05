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
        clearLocalStorage();
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
            console.log(error.response?.data.message);
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
            console.log(error.response?.message);
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem('account_id');
        localStorage.removeItem('account_name');
        localStorage.removeItem('account_balance');
    }

    const getTotalBalance = () => {
        return accounts.reduce((sum, account) => sum + (account.balance || 0), 0);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">All Accounts</h1>
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
                                    <td className="px-4 py-2">{account.balance}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
                                            onClick={() => {
                                                localStorage.setItem('account_id', account.account_id),
                                                localStorage.setItem('account_name', account.account_name),
                                                localStorage.setItem('account_balance', JSON.stringify(account.balance)),
                                                nav('/account-details')
                                            }}
                                        >
                                            Details
                                        </button>
                                        <button  
                                            type="button" 
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                            onClick={() => {
                                                setAccountToDelete(account.account_id),
                                                setAccountToDeleteName(account.account_name)
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
                            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                            <p>Are you sure you want to delete account: {accountToDeleteName}</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => deleteAccount(accountToDelete)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => {
                                        setAccountToDelete(null),
                                        setAccountToDeleteName(null)
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
