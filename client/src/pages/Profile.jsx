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
                            src={"profilePicUrl"} 
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
