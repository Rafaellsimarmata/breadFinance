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
            {/* Navbar */}
           <nav className="navbar bg-gray-100 shadow-lg p-4">
                <div className="flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={() => nav("/dashboard")} 
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Dashboard
                    </button>
                    <button 
                        type="button" 
                        onClick={() => nav("/accounts")} 
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Accounts
                    </button>
                    <button 
                        type="button" 
                        onClick={() => nav("/logout")} 
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex justify-center items-center">
                <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-sm text-center">
                    <h2 className="text-xl font-bold">Profile Information</h2>

                    {/* Profile Picture */}
                    <div className="mt-7">
                        <img 
                            src={"data:image/jpeg;base64,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"} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full border border-gray-300 mx-auto"
                        />
                    </div>

                    {/* Profile Details */}
                    <div className="mt-4">
                        <p><span className="font-semibold">Username:</span> {name}</p>
                        <p><span className="font-semibold">Full Name:</span> {fullName}</p>
                        <p><span className="font-semibold">Email:</span> {email}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile
