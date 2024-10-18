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
      }, 2000);
    }
    catch (error)
    {
      console.log(error.response?.data);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div>
              <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
              <p className="text-center text-red-500">{message}</p>
              <form onSubmit={sendLogin} className="space-y-6">
                  <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div>
                      <label className="block text-gray-700 font-medium mb-2">Password</label>
                      <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="******"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <div>
                      <button
                          type="submit"
                          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                          Login
                      </button>
                  </div>
              </form>
              <p className="mt-4 text-center text-gray-600">
                  No account?{" "}
                  <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => nav("/register")}
                  >
                      Click here
                  </span>
              </p>
          </div>
      </section>
    </div>
  )
}

export default Login
