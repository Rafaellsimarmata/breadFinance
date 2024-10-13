import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        refreshToken()
    },[]);

    const refreshToken = async() => {
        try {
            const response = await axios.get('https://bread-finance-api.vercel.app/api/auth/login')
            setToken(response.data.token)
            const decodedToken = jwt_decode(response.data.token)
            console.log(decodedToken);
            setName(decodedToken.name);
        } catch (error) {
            
        }
    }

    <div className="container mt-5">

        <p>Welcome Back {name}</p>
    </div>
}

export default Dashboard
