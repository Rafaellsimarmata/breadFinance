import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = async() => {
        try 
        {
            const token = Cookies.get('token')
            const response = await axios.get('https://bread-finance-api.vercel.app/api/profile', {
                'headers': {
                'Authorization': 'Bearer ' + token
            }});
            console.log(response.data.message);
            setName(response.data.userData.userName);
            setFullName(response.data.userData.fullName);
            setEmail(response.data.userData.email);
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
                    <button type="button" onClick={() => nav("/dashboard")} className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">Dashboard</button>
                    <button type="button" onClick={() => nav("/accounts")} className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">Accounts</button>
                    <button type="button" onClick={() => nav("/logout")} className="w-24 mx-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">Log Out</button>
                </div>
            </nav>
            <div className="container mt-5">
                <h2>Username: {name}</h2>
                <h2>Full Name: {fullName}</h2>
                <h2>Email: {email}</h2>
            </div>
        </>
    )
}

export default Profile
