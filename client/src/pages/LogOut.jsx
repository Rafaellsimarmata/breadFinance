import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const nav = useNavigate();

    Cookies.remove('token');
    Cookies.remove('account_name');
    Cookies.remove('account_id');
    Cookies.remove('account_balance');

    useEffect(() => {
        redirect();
    })

    const redirect = () => {
        nav("/");
    }
}

export default LogOut
