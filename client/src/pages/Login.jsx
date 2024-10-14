import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const sendLogin = async(e) => {
    e.preventDefault();
    try
    {
      const {data} = await axios.post('https://bread-finance-api.vercel.app/api/auth/login', {
        email: email,
        password: password
      });
      console.log(data.message);
      setMessage(data.message);
      const newToken = data.token;
      Cookies.set('token', newToken, {expires: 1, secure: true});

      setTimeout(() => {
        setMessage("Redirecting...")
      }, 1000)

      setTimeout(() => {
        nav("/dashboard");
      }, 3000);
    }
    catch (error)
    {
      console.log(error.response?.data);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-deskstop">
              <p className='has-text-centered'>{message}</p>
                <form onSubmit={sendLogin} className="box" style={{ maxWidth: "400px", margin: "0 auto" }}>
                    <div className="field mt-5">
                        <label className="label">Email</label>
                        <div className="controls">
                            <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>  
                    <div className="field mt-5">
                        <label className="label">Password</label>
                        <div className="controls">
                            <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <button className='button is-success is-fullwidth'>Login</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
