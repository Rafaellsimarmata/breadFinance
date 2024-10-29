import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([])
    const [query, setQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('createdAt');
    const [displaySelectedFilter, setDisplaySelectedFilter] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async() => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get('https://bread-finance-api.vercel.app/api/transactions', 
                {
                    'headers' :
                    {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response);
            setTransactions(response.data.data.userTransactionsData);

        } 
        catch (error) {
            console.log(error.response?.message);
        }
    }

    useEffect(() => {
        const filteredTransactions = transactions.filter(item => {
            const itemDate = new Date(item.createdAt); // Use createdAt for filtering
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            const matchesTransactionType =
            !transactionType || item.transaction_type === transactionType; // Check transaction type

            const matchesQuery = item.description.toLowerCase().includes(query.toLowerCase());

            const matchesDateRange = 
                (!start && !end) || // No date filter applied
                (start && end && itemDate >= start && itemDate <= end) || // Normal date range
                (start && !end && itemDate >= start) || // Only start date filter applied
                (!start && end && itemDate <= end); // Only end date filter applied
                // setDisplaySelectedFilter("Date: " + startDate + " to " + endDate);

            return matchesQuery && matchesDateRange && matchesTransactionType;
        });

        // Sort filtered transactions based on selected filter
        const sortedTransactions = filteredTransactions.sort((a, b) => {
            if (selectedFilter === 'createdAt') {
                setDisplaySelectedFilter("Date Created");
                return isAscending
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0; // Default no sorting for other filters
        });

        setFilteredTransactions(sortedTransactions);
        
    }, [query, transactions, startDate, endDate, selectedFilter, isAscending, transactionType]);

    const toggleFilterPopup = () => {
        setShowFilterPopup(!showFilterPopup);
    };

    // Handle the selection of filter type
    const applyFilter = (filterType) => {
        console.log(filterType);
        setSelectedFilter(filterType);
        if (filterType !== 'date') {
            resetFilters();
            setShowFilterPopup(false);
        }

        if (filterType === 'createdAt') {
            setDisplaySelectedFilter('Created At: ')
            setIsAscending(!isAscending); // Toggle sort order on the same filter
        }

        if(filterType === 'transaction_type') {
            setShowFilterPopup(true);
        }
    };

    const applyTransactionTypeFilter = (type) => {
        console.log(type);
        setTransactionType(type);
        setDisplaySelectedFilter("Transaction Type: " + type);
        setShowFilterPopup(false); // Close the popup after selecting transaction type
    };

    const resetFilters = () => {
        console.log("Filters reset");
        setStartDate('');
        setEndDate('');
        setTransactionType('');
    }

    const getTotalBalance = () => {
        return transactions.reduce((sum, transactions) => {
          if (transactions.transaction_type === 'Inbound') {
            return sum + (transactions.amount || 0);
          } 
          else if (transactions.transaction_type === 'Outbound') {
            return sum - (transactions.amount || 0);
          } 
          else {
            return sum;
          }
        }, 0);
    };

    return (
        <>
            {/* Filter Popup Modal */}
            {showFilterPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4">Filter By</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => applyFilter('createdAt')}
                        className="w-full py-2 text-left hover:bg-gray-100 rounded-md px-3"
                    >
                    Date Created
                    </button>
                    <button
                        onClick={() => applyFilter('transaction_type')}
                        className="w-full py-2 text-left hover:bg-gray-100 rounded-md px-3"
                    >
                    Transaction Type
                    </button>

                    {selectedFilter === 'transaction_type' && (
                        <div className="mt-4">
                            <button className="block w-full mt-1 border rounded-md p-2 hover:bg-gray-100" value="Inbound" onClick={(e) => applyTransactionTypeFilter(e.target.value)}>
                                Inbound
                            </button>
                            <button className="block w-full mt-1 border rounded-md p-2 hover:bg-gray-100" value="Outbound" onClick={(e) => applyTransactionTypeFilter(e.target.value)}>
                                Outbound
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => applyFilter('date')}
                        className="w-full py-2 text-left hover:bg-gray-100 rounded-md px-3"
                    >
                        Date
                    </button>

                    {selectedFilter === 'date' && (
                    <div className="mt-4">
                        <label className="block mb-2">
                            Start Date:
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                className="block w-full mt-1 border rounded-md p-2"
                            />
                        </label>
                        <label className="block mb-2">
                            End Date:
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                className="block w-full mt-1 border rounded-md p-2"
                            />
                        </label>
                    </div>
                    )}
                </div>
                <button
                    onClick={toggleFilterPopup}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
                >
                    Close
                </button>
                </div>
            </div>
            )}

            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-8">
                <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">All Transactions</h1>
                    </div>
                    <div className="balance-info text-center mb-4">
                        <div className="balance-item">
                            <h2 className=" text-green-400 text-2xl font-semibold">IDR {getTotalBalance()}</h2>
                            <p className="text-gray-600">Total Balance</p>
                        </div>
                    </div>
                    <div className="controls flex justify-center space-x-4">
                        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} 
                            className="border"
                        />
                        <button
                            type="button"
                            onClick={toggleFilterPopup}
                            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Filter by: {displaySelectedFilter}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/add-transaction")} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Transaction
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/account-details")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Account Details
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
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Transaction Type</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transactions) => (
                                <tr key={transactions.transaction_id} className="border-t">
                                     <td className="px-4 py-2">
                                        {(() => {
                                            // Convert createdAt to formatted date
                                            const date = new Date(transactions.createdAt);
                                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                        })()}
                                    </td>
                                    <td className="px-4 py-2">{transactions.description}</td>
                                    <td className="px-4 py-2">{transactions.transaction_type}</td>
                                    <td className="px-4 py-2">{transactions.amount}</td>
                                    <td className="px-4 py-2">
                                        <button 
                                            type="button" 
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
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

export default Transactions
