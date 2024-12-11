import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddTransactions = () => {
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [previousPath, setPreviousPath] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchAllAccounts();
    checkAccountFromSessionStorage();
    if (location.state?.from) {
        setPreviousPath(location.state.from);
    };
    }, [location.state?.from]);

    const handlePageNavigation = () => {
        nav(previousPath || '/transactions');
    }

    const fetchAllAccounts = async() => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get('https://bread-finance-api.vercel.app/api/accounts', 
                {
                    'headers': {
                    'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response.data.message);
            setAccounts(response.data.data.accounts);
        } catch (error) {
            console.error(error.response?.data)
        }
    }

    const fetchCategories = async() => {
        try 
        {
            const token = Cookies.get('token');
            const response = await axios.get('https://bread-finance-api.vercel.app/api/categories', 
                {
                    'headers': {
                    'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response.data.message);
            setCategories(response.data.data.categories);
        } 
        catch (error) 
        {
            console.error(error.response?.data);
        }
    }

    const checkAccountFromSessionStorage = async() => {
        const tempAccount = sessionStorage.getItem('account_id')
        if (tempAccount) {
            setSelectedAccount(tempAccount);
        }
    }

    const newTransaction = async(e) => {
        e.preventDefault();
        try
        {
            setButtonDisabled(true);
            setMessage("Adding transaction...");
            const token = Cookies.get('token');
            const response = await axios.post('https://bread-finance-api.vercel.app/api/transaction', 
                {
                    accountId: selectedAccount,
                    categoryId: selectedCategory,
                    description: description,
                    transactionType: transactionType,
                    amount: parseInt(transactionAmount)
                }, {
                    'headers':
                    {
                        'Authorization': 'Bearer ' + token
                    }, 
                }
            );
            console.log(response.data.message);
            setMessage(response.data.message);
            handlePageNavigation();
        }
        catch (error)
        {
            setButtonDisabled(false);
            console.error(error.response?.data.message);
            setMessage(error.response?.data.message);
        };
    }

    return (
        <>
            <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
                <div className="w-full max-w-md p-8 bg-blue-900 rounded-3xl shadow-lg text-center">
                    <h1 className="text-4xl font-bold mb-6 text-white">Add Transaction</h1>
                    <p className="text-pink-600 mb-4">{message}</p>

                    <form onSubmit={newTransaction} className="space-y-6" id='addTransaction'>
                        <div>
                            <label className="block text-left text-white font-medium mb-2" id='transactionDescription'>Description</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-left text-white font-medium mb-2" id='transactionAccount'>Account</label>
                            <select 
                                className='w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600'
                                value={selectedAccount} 
                                onChange={(e => {setSelectedAccount(e.target.value)})}
                            >
                                <option className="bg-blue-900 text-gray-300">- Please choose an account -</option>
                                {accounts.map((option) => (
                                    <option 
                                        key={option.account_id} 
                                        value={option.account_id}
                                        className="bg-blue-900 text-white"
                                    >
                                        {option.account_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-left text-white font-medium mb-2" id='transactionCategory'>Category</label>
                            <select 
                                className='w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600'
                                onChange={(e => {setSelectedCategory(e.target.value)})}
                            >
                                <option className="bg-blue-900 text-gray-300">- Please choose a category -</option>
                                {categories.map((option) => (
                                    <option 
                                        key={option.category_id} 
                                        value={option.category_id}
                                        className="bg-blue-900 text-white"
                                    >
                                        {option.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-left text-white font-medium mb-2" id='transactionType'>Transaction Type</label>
                            <select 
                                className='w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600'
                                onChange={(e) => setTransactionType(e.target.value)}
                            >
                                <option className="bg-blue-900 text-gray-300">- Please choose a transaction type -</option>
                                <option value="Inbound" className="bg-blue-900 text-white">Inbound</option>
                                <option value="Outbound" className="bg-blue-900 text-white">Outbound</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-left text-white font-medium mb-2" id='transactionId'>Amount</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                                placeholder="Amount"
                                value={transactionAmount}
                                onChange={(e) => setTransactionAmount(e.target.value)}
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

                    <p className="mt-4 text-gray-300">
                        <span
                            className="text-blue-300 hover:underline cursor-pointer"
                            onClick={() => handlePageNavigation()}
                        >
                            Cancel
                        </span>
                    </p>
                </div>
            </section>
        </>
    )
}

export default AddTransactions
