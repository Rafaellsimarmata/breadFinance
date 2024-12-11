import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const sendLogin = async(e) => {
    e.preventDefault();
    try
    {
      setButtonDisabled(true);
      setMessage("Logging in...")
      const response = await axios.post('https://bread-finance-api.vercel.app/api/auth/login', {
        email: email,
        password: password
      });
      console.log(response.data.message);
      setMessage(response.data.message);
      const newToken = response.data.token;
      Cookies.set('token', newToken, {expires: 3, secure: true});
      Cookies.set('rememberMe', rememberMe, {expires: 3, secure: true});

      setTimeout(() => {
        setMessage("Redirecting...")
      }, 100)

      setTimeout(() => {
        nav("/dashboard");
      }, 200);
    }
    catch (error)
    {
      setButtonDisabled(false);
      console.error(error.response?.data.message);
      setMessage(error.response?.data.message);
    };
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div>
              <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
              <p className="text-center text-red-500">{message}</p>
              <form onSubmit={sendLogin} className="space-y-6">
                  <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                          type="text"
                          className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="mr-2"
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="text-gray-700">
                      Remember Me
                    </label>
                  </div>
                  <div>
                      <button
                        type="submit"
                        className={`w-full text-white font-semibold py-2 rounded-md transition-colors ${
                          buttonDisabled
                            ? "bg-gray-500 cursor-not-allowed hover:bg-gray-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        id='submitButton'
                        disabled={buttonDisabled}
                      >
                        Login
                      </button>
                  </div>
              </form>
              <p className="mt-4 text-center text-gray-600">
                  Don&apos;t have account yet?{" "}
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
