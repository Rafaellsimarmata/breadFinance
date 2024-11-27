import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddGoal = () => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  
  const newGoal = async(e) => {
    e.preventDefault()
    try
    {
        setMessage("Adding goal")
        const token = Cookies.get('token');
        const response = await axios.post('https://bread-finance-api.vercel.app/api/goal', 
        {
            goal_name: goalName,
            description: goalDescription,
            amount: parseInt(goalAmount)
        },
        {
            'headers':
            {
                'Authorization': 'Bearer ' + token
            }, 
        });
        console.log(response.data.message);
        setMessage(response.data.message);
        nav("/goals");
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
                <h1 className="text-4xl font-bold mb-6">Add Goal</h1>

                {/* Display message */}
                <p className="text-red-500 mb-4">{message}</p>

                {/* Form */}
                <form onSubmit={newGoal} className="space-y-6" id='addGoal'>
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='goalName'>Goal Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Goal Name"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='goalDescription'>Goal Description</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Goal Name"
                            value={goalDescription}
                            onChange={(e) => setGoalDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2" id='goalAmount'>Amount</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Amount"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
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

                {/* Cancel Link */}
                <p className="mt-4 text-gray-600">
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => nav("/goals")}
                    >
                        Cancel
                    </span>
                </p>
            </div>
        </section>
    </>
  )
}

export default AddGoal
