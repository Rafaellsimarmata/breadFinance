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
        document.getElementById('submitButton').disabled = true;
        setMessage("Registering...")
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
        }, 100)
  
        setTimeout(() => {
          nav("/login");
        }, 200);
      }
      else
      {
        console.log("Password does not match");
        setMessage("Password does not match");
      }
    }
    catch (error)
    {
      document.getElementById('submitButton').disabled = true;
      console.log(error.response?.data);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
        <p className="text-center text-red-500">{message}</p>
          <form onSubmit={sendRegister} className="space-y-6" id='register'>
              <div>
                  <label className="block text-gray-700 font-medium mb-2" id='registerName'>Name</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-medium mb-2" id='registerUsername'>Username</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-medium mb-2" id='registerEmail'>Email</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-medium mb-2" id='registerPassword'>Password</label>
                  <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min 8 characters, a special character"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-medium mb-2" id='registerConfirmPassword'>Confirm Password</label>
                  <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min 8 characters, a special character"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </div>
              <div>
                  <button
                      type="submit"
                      className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
                      id='submitButton'
                  >
                      Register
                  </button>
              </div>
          </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => nav("/login")}
              >
                  Click here
              </span>
            </p>
      </div>
    </section>

  )
}

export default Register
