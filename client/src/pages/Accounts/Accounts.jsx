import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import './Accounts.css'; 
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
                    <button type="button" onClick={() => nav("/add-account")}>Add Accounts</button>
                    <button type="button" onClick={() => nav("/dashboard")}>Dashboard</button>
                    <button type="button" onClick={() => nav("/logout")}>Log Out</button>
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
                                <button type="button" className="data-controls">Details</button>
                                <button type="button" className="data-controls button-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        
    )
}

export default Accounts;
