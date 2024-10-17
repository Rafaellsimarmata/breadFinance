import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import './Accounts.css'; 

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        accountsData()
    }, []);

    const accountsData = async() => {
        try {
            const token = Cookies.get('token')

            const response = await axios.get('https://bread-finance-api.vercel.app/api/accounts', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }})
            
            console.log(response.data.data.accounts)
            setAccounts(response.data.data.accounts)
        } catch (error) {
            console.log(error.response?.message)
        }
    }

    return (
        <div className="container">
            <header className="header">
                <div className="title">
                    <h1>All Account</h1>
                </div>
                <div className="balance-info">
                    <div className="balance-item">
                        <h2>$12,312,312.00</h2>
                        <p>Total Balance</p>
                    </div>
                </div>
                <div className="controls">
                    <button>Add Accounts</button>
                    <button>File Import</button>
                    <button>Undo</button>
                    <button>Redo</button>
                </div>
            </header>
    
            <table className="account-table">
                <thead>
                    <tr>
                        <th>Created Date</th>
                        <th>Account Name</th>
                        <th>Account Type</th>
                        <th>Total Balance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td>{account.createdAt}</td>
                            <td>{account.account_name}</td>
                            <td>{account.account_type}</td>
                            <td>{account.balance}</td>
                            <td>
                                <button>Delete</button>
                                <button>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        
    )
}

export default Accounts;
