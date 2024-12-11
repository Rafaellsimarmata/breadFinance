import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  
  const newAccount = async(e) => {
    e.preventDefault()
    try
    {
        setButtonDisabled(true);
        setMessage("Adding account...");
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
        setButtonDisabled(false);
        console.error(error.response?.data);
        setMessage(error.response?.data.message);
    };
  }

  return (
    <>
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
            <div className="w-full max-w-md p-8 bg-blue-900 rounded-3xl shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-6 text-white">Add Account</h1>

                {/* Display message */}
                <p className="text-pink-600 mb-4">{message}</p>

                {/* Form */}
                <form onSubmit={newAccount} className="space-y-6" id='addAccount'>
                    <div>
                        <label className="block text-left text-white font-medium mb-2" id='accountName'>Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                            placeholder="Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-left text-white font-medium mb-2" id='accountType'>Type</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                            placeholder="Type"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-left text-white font-medium mb-2" id='accountBalance'>Balance</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                            placeholder="Balance"
                            value={accountBalance}
                            onChange={(e) => setAccountBalance(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full text-white font-semibold py-2 rounded-3xl transition-colors ${
                                buttonDisabled
                                    ? "bg-blue-700 cursor-not-allowed"
                                    : "bg-pink-600 hover:bg-pink-700"
                            }`}
                            id='submitButton'
                            disabled={buttonDisabled}
                        >
                            Add
                        </button>
                    </div>
                </form>

                {/* Cancel Link */}
                <p className="mt-4 text-gray-300">
                    <span
                        className="text-blue-300 hover:underline cursor-pointer"
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
