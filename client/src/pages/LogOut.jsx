import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const nav = useNavigate();

    Cookies.remove('token');
    Cookies.remove('rememberMe');
    sessionStorage.clear();

    useEffect(() => {
        redirect();
    })

    const redirect = () => {
        console.log("Logged out")
        nav("/");
    }
}

export default LogOut