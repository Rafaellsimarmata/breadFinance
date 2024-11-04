import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const nav = useNavigate();

    Cookies.remove('token');
    localStorage.clear();

    useEffect(() => {
        redirect();
    })

    const redirect = () => {
        nav("/");
    }
}

export default LogOut
