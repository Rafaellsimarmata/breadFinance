import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    
    const nav = useNavigate();

    useEffect(() => {
        accountsData()
    }, []);

    const accountsData = async() => {
        try {
            const token = Cookies.get('token')

            const response = await axios.get('https://bread-finance-api.vercel.app/api/accounts', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.data.accounts);
            setAccounts(response.data.data.accounts);
        } catch (error) {
            console.log(error.response?.message);
        }
    }

    const getTotalBalance = () => {
        return accounts.reduce((sum, account) => sum + (account.balance || 0), 0);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-8">
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
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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
                                                Cookies.set('account_name', account.account_name, {expires: 1, secure: true}),
                                                Cookies.set('account_balance', account.balance, {expires: 1, secure: true}),
                                                Cookies.set('account_id', account.account_id, {expires: 1, secure: true})
                                                nav('/account-details')
                                            }}
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

export default Accounts;
