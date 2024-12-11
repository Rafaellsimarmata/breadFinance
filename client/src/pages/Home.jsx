import { useNavigate } from "react-router-dom"

const Home = () => {
    const nav = useNavigate();

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to BreadFinance!</h1>
        <h2 className="text-2xl font-medium mb-8">Login or Register to start your journey</h2>
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
    )
}

export default Home
