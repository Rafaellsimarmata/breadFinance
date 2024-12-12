import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();
  
  const sendRegister = async(e) => {
    e.preventDefault();
    try
    {
      if (password == confirmPassword) {
        setButtonDisabled(true);
        setMessage("Registering...");
        const response = await axios.post('https://bread-finance-api.vercel.app/api/auth/register', {
            userName: userName,
            fullName: fullName,
            email: email,
            password: password
          });
        console.log(response.data.message);
        setMessage(response.data.message);

        setTimeout(() => {
          setMessage("Redirecting to login page...")
        }, 100)
  
        setTimeout(() => {
          nav("/login");
        }, 200);
      }
      else
      {
        console.warn("Password does not match");
        setMessage("Password does not match");
      }
    }
    catch (error)
    {
      setButtonDisabled(false)
      console.error(error.response?.data.message);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="w-full max-w-md p-8 bg-blue-900 rounded-3xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Register</h1>
        <p className="text-pink-600 mb-4">{message}</p>
          <form onSubmit={sendRegister} className="space-y-6" id='register'>
              <div>
                  <label className="block text-left text-white font-medium mb-2" id='registerName'>Name</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                      placeholder="Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-left text-white font-medium mb-2" id='registerUsername'>Username</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-left text-white font-medium mb-2" id='registerEmail'>Email</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-left text-white font-medium mb-2" id='registerPassword'>Password</label>
                  <input
                      type="password"
                      className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                      placeholder="Min 8 characters, a special character"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div>
                  <label className="block text-left text-white font-medium mb-2" id='registerConfirmPassword'>Confirm Password</label>
                  <input
                      type="password"
                      className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                      placeholder="Min 8 characters, a special character"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </div>
              <div>
                  <button
                      type="submit"
                      className={`w-full text-white font-semibold py-2 rounded-3xl transition-colors ${
                        buttonDisabled
                          ? "bg-blue-700 cursor-not-allowed"
                          : "bg-pink-600 hover:bg-pink-700"
                      }`}
                      id='submitButton'
                      disabled={buttonDisabled}
                  >
                      Register
                  </button>
              </div>
          </form>
            <p className="mt-4 text-gray-300">
              Already have an account?{" "}
              <span
                  className="text-blue-300 hover:underline cursor-pointer"
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
