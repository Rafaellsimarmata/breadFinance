import { useNavigate } from "react-router-dom"

const Home = () => {
    const nav = useNavigate();

    return (
        <div>
            <h1>Homepage</h1>
            <button type="button" className="button mx-5" onClick={() => {nav("/login")}}>Login</button>
            <button type="button" className="button mx-5" onClick={() => {nav("/register")}}>Register</button>
        </div>
    )
}

export default Home
