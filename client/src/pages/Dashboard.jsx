import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        refreshToken()
    }, []);

    const refreshToken = async() => {
        try 
        {
            const token = Cookies.get('token')
            const response = await axios.get('https://bread-finance-api.vercel.app/api/profile', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }})
            console.log(response.data.message);
            setName(response.data.userData.userName);
        } 
        catch (error) 
        {
            console.log(error.response?.message)
        }
    }

    return (
        <div className="container mt-5">
            <p>Welcome Back {name}</p>
        </div>
    )
}

export default Dashboard
