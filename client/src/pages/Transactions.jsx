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
    const [selectedDate, setSelectedDate] = useState('')
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('createdAt');
    const [displaySelectedFilter, setDisplaySelectedFilter] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [transactionToDeleteName, setTransactionToDeleteName] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        fetchTransactions();
        accountsData();
        checkAccountFromSessionStorage();
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
            console.log(response.data.message);
            setTransactions(response.data.data.userTransactionsData);

        } 
        catch (error) {
            console.error(error.response?.message);
        }
    };

    const deleteTransaction = async(transactionId) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`https://bread-finance-api.vercel.app/api/transaction/${transactionId}`,
                {
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            console.log(response.data.message)
            setTransactionToDelete(null)
            setTransactionToDeleteName(null)
            fetchTransactions()
        } catch (error) {
            console.error(error.response?.data.message)
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

    useEffect(() => {
        const filteredTransactions = transactions.filter(item => {
            const itemDate = new Date(item.createdAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            const matchesTransactionType = !transactionType || item.transaction_type === transactionType;

            const matchesQuery = item.description.toLowerCase().includes(query.toLowerCase());

            const matchesAccount = !selectedAccountId || item.accountId === selectedAccountId;

            const matchesSelectedDate = selectedDate
                ? new Date(item.createdAt).toDateString() === new Date(selectedDate).toDateString()
                : true;
                if (selectedDate) {
                    setDisplaySelectedFilter("Date: " + selectedDate)
                }

            const matchesDateRange = 
                (!start && !end) || // No date filter applied
                (start && end && itemDate >= start && itemDate <= end) || // Normal date range
                (start && !end && itemDate >= start) || // Only start date filter applied
                (!start && end && itemDate <= end); // Only end date filter applied
                if (matchesDateRange !== null && start !== null && end !== null) {
                    setDisplaySelectedFilter("Date: " + startDate + " to " + endDate);
                }

            const matchesAmountRange = 
                (minAmount === '' || item.amount >= minAmount) && 
                (maxAmount === '' || item.amount <= maxAmount);
                if (matchesAmountRange !== null && minAmount !== '' && maxAmount !== '') {
                    setDisplaySelectedFilter("Amount: " + minAmount + " - " + maxAmount);
                }

            return matchesQuery && matchesDateRange && matchesTransactionType && matchesAmountRange && matchesAccount && matchesSelectedDate;
        });

        const sortedTransactions = filteredTransactions.sort((a, b) => {
            if (selectedFilter === 'createdAt') {
                if (isAscending === true) {
                    setDisplaySelectedFilter("Date Created (Ascending)");
                }
                else {
                    setDisplaySelectedFilter("Date Created (Descending)");
                }
                return isAscending
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });
        setFilteredTransactions(sortedTransactions);
    }, [query, transactions, startDate, endDate, selectedFilter, isAscending, transactionType, minAmount, maxAmount, selectedAccountId, selectedDate]);

    const toggleFilterPopup = () => {
        setShowFilterPopup(!showFilterPopup);
    };

    const applyFilter = (filterType) => {
        console.log(filterType);
        setSelectedFilter(filterType);

        if (filterType === 'createdAt') {
            resetFilters();
            setIsAscending(!isAscending);
            setShowFilterPopup(false);
        }
        else {
            setDisplaySelectedFilter("Select a filter");
            resetFilters();
        }
    };

    const applyTransactionTypeFilter = (type) => {
        resetFilters();
        console.log(type);
        setTransactionType(type);
        setDisplaySelectedFilter("Transaction Type: " + type);
        setShowFilterPopup(false);
        getTotalBalance();
    };

    const filterByAccountId = (account_id) => {
        resetFilters();
        const account = accounts.find(acc => acc.account_id === account_id);
    
        if (account) {
            console.log(account.account_name);
            setSelectedAccountId(account_id);
            setDisplaySelectedFilter("Account: " + account.account_name);
        } else {
            setSelectedAccountId('');
            setDisplaySelectedFilter("Account: All");
        }
    
        setShowFilterPopup(false);
    };

    const resetFilters = () => {
        console.log("Filters reset");
        setStartDate('');
        setEndDate('');
        setTransactionType('');
        setMinAmount('');
        setMaxAmount('');
        setSelectedAccountId('');
        setSelectedDate('');
    }

    const checkAccountFromSessionStorage = async() => {
        if (sessionStorage.getItem('account_id')) {
            const tempAccount = sessionStorage.getItem('account_id')
            setSelectedAccountId(tempAccount);
        }
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

    const getTotalAmount = () => {
        return filteredTransactions.reduce((sum, transactions) => {
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
    }

    return (
        <>
            {showFilterPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-blue-950 bg-opacity-95 rounded-3xl shadow-xl p-4 w-96 text-white">
                    <h3 className="text-lg font-bold mb-4">Filter By</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => applyFilter('createdAt')}
                            className="w-full py-2 text-left hover:bg-gray-100 hover:text-gray-800 rounded-md px-3"
                        >
                        Date Created
                        </button>
                        <button
                            onClick={() => applyFilter('transaction_type')}
                            className="w-full py-2 text-left hover:bg-gray-100 hover:text-gray-800 rounded-md px-3"
                        >
                        Transaction Type
                        </button>

                        {selectedFilter === 'transaction_type' && (
                            <div className="mt-4">
                                <button className="block w-full mt-1 border rounded-md p-2 hover:bg-gray-100 hover:text-gray-800" value="Inbound" onClick={(e) => applyTransactionTypeFilter(e.target.value)}>
                                    Inbound
                                </button>
                                <button className="block w-full mt-1 border rounded-md p-2 hover:bg-gray-100 hover:text-gray-800" value="Outbound" onClick={(e) => applyTransactionTypeFilter(e.target.value)}>
                                    Outbound
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => applyFilter('account_id')}
                            className="w-full py-2 text-left hover:bg-gray-100 hover:text-gray-800 rounded-md px-3"
                        >
                        Account
                        </button>

                        {selectedFilter === 'account_id' && (
                            <div className="mt-4">
                                <select value={selectedAccountId} onChange={(e) => {filterByAccountId(e.target.value)}} className="text-black">
                                    <option>- Select an account -</option>
                                        {accounts.map(account => (
                                            <option key={account.account_id} value={account.account_id}>
                                                {account.account_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <button
                            onClick={() => applyFilter('amount')}
                            className="w-full py-2 text-left hover:bg-gray-100 hover:text-gray-800 rounded-md px-3"
                        >
                            Amount
                        </button>

                        {selectedFilter === 'amount' && (
                            <div className="mt-4">
                                <label className="block mb-2">
                                    Minimum Amount:
                                    <input type="number" placeholder="Minimum" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className="block w-full mt-1 border rounded-md p-2 text-black" />
                                </label>
                                <label className="block mb-2">
                                    Maximum Amount:
                                    <input type="number" placeholder="Maximum" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className="block w-full mt-1 border rounded-md p-2 text-black" />
                                </label>
                            </div>
                        )}

                        <button
                            onClick={() => applyFilter('specificDate')}
                            className="w-full py-2 text-left hover:bg-gray-100 hover:text-gray-800 rounded-md px-3"
                        >
                            Specific Date
                        </button>

                        {selectedFilter === 'specificDate' && (
                        <div className="mt-4">
                            <label className="block mb-2">
                                Select Date:
                                <input 
                                    type="date" 
                                    value={selectedDate} 
                                    onChange={(e) => setSelectedDate(e.target.value)} 
                                    className="block w-full mt-1 border rounded-md p-2 text-black"
                                />
                            </label>
                        </div>
                        )}

                        <button
                            onClick={() => applyFilter('date')}
                            className="w-full py-2 text-left hover:bg-gray-100 hover:text-gray-800 rounded-md px-3"
                        >
                            Date Range
                        </button>

                        {selectedFilter === 'date' && (
                        <div className="mt-4">
                            <label className="block mb-2">
                                Start Date:
                                <input 
                                    type="date" 
                                    value={startDate} 
                                    onChange={(e) => setStartDate(e.target.value)} 
                                    className="block w-full mt-1 border rounded-md p-2 text-black"
                                />
                            </label>
                            <label className="block mb-2">
                                End Date:
                                <input 
                                    type="date" 
                                    value={endDate} 
                                    onChange={(e) => setEndDate(e.target.value)} 
                                    className="block w-full mt-1 border rounded-md p-2 text-black"
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

            <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-left">
                        <header className="bg-blue-900 rounded-3xl shadow-xl p-4">
                            <h1 className="text-3xl text-white font-bold mb-4 ml-4">All Transactions</h1>
                            <div className="flex flex-col balance-info mb-4 ml-4">
                                <p className="text-white">Total Balance</p>
                                <h2 className="text-green-400 text-2xl font-semibold">IDR {getTotalBalance()}</h2>
                            </div>
                            <div className="flex flex-col balance-info mb-4 ml-4">
                                <p className="text-white">Total Amount currently on screen</p>
                                <h3 className="text-green-400 text-xl font-semibold">IDR {getTotalAmount()}</h3>
                            </div>
                        </header>
                    </div>
                    <div className="text-left">
                        <div className="bg-blue-900 rounded-3xl shadow-lg p-8 text-white h-full">
                            <h2 className="text-2xl font-bold mb-2">Contributor</h2>
                            <p className="text-xs mb-4">Your earnings and expand statistics</p>
                            <div className="flex space-x-4">
                                {/* <DoughnutChart chartData={inBoundChartData} title={"Income Flow"} />
                                <DoughnutChart chartData={outBoundChartData} title={"Outcome Flow"} /> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-900 rounded-3xl shadow-xl p-4">
                    <div className=" flow   -root space-x-4 mb-2">
                            
                        <button
                            type="button"
                            onClick={toggleFilterPopup}
                            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Filter by: {displaySelectedFilter}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/add-transaction", {state: {from: location.pathname}})} 
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Add Transaction
                        </button>
                        <button 
                            type="button" 
                            onClick={() => nav("/dashboard")} 
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Dashboard
                        </button>
                        <div className="float-right">
                            <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} 
                                className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                                />
                        </div>
                    </div>
                        <table className="w-full table-auto text-white">
                            <thead>
                                <tr className="bg-slate-800 text-left">
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
                                                const date = new Date(transactions.createdAt);
                                                return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} 
                                                ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                                            })()}
                                        </td>
                                        <td className="px-4 py-2">{transactions.description}</td>
                                        <td className="px-4 py-2">{transactions.transaction_type}</td>
                                        <td className="px-4 py-2">{transactions.amount}</td>
                                        <td className="px-4 py-2">
                                            <button 
                                                type="button" 
                                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                                onClick={() => {
                                                    setTransactionToDelete(transactions.transaction_id),
                                                    setTransactionToDeleteName(transactions.description)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {transactionToDelete && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-96">
                                <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                                <p>Are you sure you want to delete transaction: <span className="font-semibold">{transactionToDeleteName}</span>?</p>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        onClick={() => deleteTransaction(transactionToDelete)}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTransactionToDelete(null),
                                            setTransactionToDeleteName(null)
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

export default Transactions
