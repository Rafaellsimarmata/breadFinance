import { useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'

const Home = () => {
    const nav = useNavigate();

    return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
        <div className="w-1/2 flex flex-col items-center justify-center space-y-8 p-12">
            <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to BreadFinance!</h1>
                <h2 className="text-2xl font-medium mb-8">Login or Register to start your journey</h2>
            </div>
            <div className="space-x-4">
                <button
                    type="button"
                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    onClick={() => nav("/login")}
                >
                    Login
                </button>
                <button
                    type="button"
                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                    onClick={() => nav("/register")}
                >
                    Register
                </button>
            </div>
        </div>
        <div className="w-1/2 flex items-center justify-center p-12">
            <div className="bg-white p-12 rounded-3xl shadow-2xl flex items-center justify-center">
                <img 
                    src={Logo} 
                    alt="BreadFinance Logo" 
                    className="max-h-96 max-w-full object-contain"
                />
            </div>
        </div>
    </div>
    )
}

export default Home