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
            <nav className="bg-gradient-to-r from-blue-200 to-blue-400 shadow-lg p-4">
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => nav("/dashboard")}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Dashboard
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
                <div className="bg-blue-900 rounded-3xl shadow-xl p-8 max-w-md mx-auto text-white">
                    <h2 className="text-3xl font-bold mb-6 text-center">Profile Information</h2>

                    {/* Profile Picture */}
                    <div className="mb-6 flex justify-center">
                        <img
                            src={""}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                        />
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-4 mb-6">
                        <div className="bg-blue-800 p-3 rounded-md">
                            <span className="font-semibold block text-sm text-gray-300">Username</span>
                            <p className="text-lg">{name}</p>
                        </div>
                        <div className="bg-blue-800 p-3 rounded-md">
                            <span className="font-semibold block text-sm text-gray-300">Full Name</span>
                            <p className="text-lg">{fullName}</p>
                        </div>
                        <div className="bg-blue-800 p-3 rounded-md">
                            <span className="font-semibold block text-sm text-gray-300">Email</span>
                            <p className="text-lg">{email}</p>
                        </div>
                    </div>

                    {/* Log Out Button */}
                    <button
                        type="button"
                        onClick={() => nav("/logout")}
                        className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </>

    )
}

export default Profile
