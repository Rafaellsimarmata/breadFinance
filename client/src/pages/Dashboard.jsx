import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState('');
    const nav = useNavigate();

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
            }});
            console.log(response.data.message);
            setName(response.data.userData.userName);
        } 
        catch (error) 
        {
            console.log(error.response?.message)
        }
    }

    return (
        <>
        <nav className="navbar">
            <div className="flex justify-center mt-5">
                <h2 className="mx-5 mt-2">Welcome Back {name}</h2>
                <button type="button" onClick={() => nav("/accounts")} className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">Accounts</button>
                <button type="button" onClick={() => nav("/profile")} className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">Profile</button>
                <button type="button" onClick={() => nav("/logout")} className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">Log Out</button>
            </div>
        </nav>
        </>
    )
}

export default Dashboard
