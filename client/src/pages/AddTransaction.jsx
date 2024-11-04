import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddTransactions = () => {
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const nav = useNavigate();
  const account_id = localStorage.getItem('account_id');

  useEffect(() => {
    fetchAccountCategories();
    }, []);

  const fetchAccountCategories = async() => {
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
        console.log(response.data.data.categories);
        setCategories(response.data.data.categories);
    } 
    catch (error) 
    {
        console.log(error);
    }
  }

  const newTransaction = async(e) => {
    e.preventDefault();
    try
    {
        const token = Cookies.get('token');
        const response = await axios.post('https://bread-finance-api.vercel.app/api/transaction', 
        {
            accountId: account_id,
            categoryId: selectedCategory,
            description: description,
            transactionType: transactionType,
            amount: parseInt(transactionAmount)
        },
        {
            'headers':
            {
                'Authorization': 'Bearer ' + token
            }, 
        });
        console.log(response.data.message);
        setMessage(response.data.message);
        nav("/transactions");
    }
    catch (error)
    {
      console.log(error.response?.data.message);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <>
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-6">Add Transaction</h1>
                <p className="text-red-500 mb-4">{message}</p>

                <form onSubmit={newTransaction} className="space-y-6" id='addTransaction'>
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='transactionDescription'>Description</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='transactionCategory'>Category</label>
                        <select className='block text-left text-gray-700 font-medium mb-2' onChange={(e => {setSelectedCategory(e.target.value)})}>
                            <option>- Please choose a category -</option>
                                {categories.map((option) => (
                                    <option key={option.category_id} value={option.category_id}>
                                        {option.category_name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='transactionType'>Transaction Type</label>
                        <select className='block text-left text-gray-700 font-medium mb-2' onChange={(e) => setTransactionType(e.target.value)}>
                            <option>- Please choose a transaction type -</option>
                            <option value="Inbound">Inbound</option>
                            <option value="Outbound">Outbound</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='transactionId'>Amount</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Amount"
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.target.value)}
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
                        onClick={() => nav("/transactions")}
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
