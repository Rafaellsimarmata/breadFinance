import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  
  const sendRegister = async(e) => {
    e.preventDefault();
    try
    {
      if (password == confirmPassword) {
        const {data} = await axios.post('https://bread-finance-api.vercel.app/api/auth/register', {
            userName: userName,
            fullName: fullName,
            email: email,
            password: password
          });
        console.log(data);
        setMessage(data.message);

        setTimeout(() => {
          setMessage("Redirecting to login page...")
        }, 1000)
  
        setTimeout(() => {
          nav("/login");
        }, 3000);
      }
      else
      {
        console.log("Password does not match");
        setMessage("Password does not match");
      }
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
                <form onSubmit={sendRegister} className="box" style={{ maxWidth: "400px", margin: "0 auto" }}>
                    <div className="field mt-5">
                        <label className="label">Name</label>
                        <div className="controls">
                            <input type="text" className="input" placeholder="Name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <label className="label">Username</label>
                        <div className="controls">
                            <input type="text" className="input" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <label className="label">Email</label>
                        <div className="controls">
                            <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>    
                    <div className="field mt-5">
                        <label className="label">Password</label>
                        <div className="controls">
                            <input type="password" className="input" placeholder="Min 8 characters, including a special character" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <label className="label">Confirm Password</label>
                        <div className="controls">
                            <input type="password" className="input" placeholder="Min 8 characters, including a special character" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <button className='button is-success is-fullwidth'>Register</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
