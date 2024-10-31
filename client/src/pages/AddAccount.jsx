import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  
  const newAccount = async(e) => {
    e.preventDefault();
    try
    {
        const token = Cookies.get('token');
        const response = await axios.post('https://bread-finance-api.vercel.app/api/account', 
        {
            name: accountName,
            type: accountType,
            balance: parseInt(accountBalance)
        },
        {
            'headers':
            {
                'Authorization': 'Bearer ' + token
            }, 
        });
        console.log(response.data.message);
        setMessage(response.data.message);
        nav("/accounts");
    }
    catch (error)
    {
      console.log(error.response?.data);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <>
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-6">Add Account</h1>
                <p className="text-red-500 mb-4">{message}</p>
                <form onSubmit={newAccount} className="space-y-6">
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2">Type</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2">Balance</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Balance"
                            value={accountBalance}
                            onChange={(e) => setAccountBalance(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-gray-600">
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => nav("/accounts")}
                    >
                        Cancel
                    </span>
                </p>
            </div>
        </section>
    </>
  )
}

export default AddAccount
