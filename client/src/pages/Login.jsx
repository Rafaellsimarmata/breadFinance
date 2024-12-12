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
      <section className="w-full max-w-md p-8 bg-blue-900 rounded-3xl shadow-lg text-center">
          <div>
              <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
              <p className="text-pink-600 mb-4">{message}</p>
              <form onSubmit={sendLogin} className="space-y-6">
                  <div>
                      <label className="block text-left text-white font-medium mb-2">Email</label>
                      <input
                          type="text"
                          className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div>
                      <label className="block text-left text-white font-medium mb-2">Password</label>
                      <input
                          type="password"
                          className="w-full px-4 py-2 border border-blue-700 rounded-3xl bg-blue-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 placeholder-gray-400"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="mr-2 text-pink-600 bg-blue-800 border-blue-700 rounded focus:ring-pink-600"
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="text-gray-300">
                      Remember Me
                    </label>
                  </div>
                  <div>
                      <button
                        type="submit"
                        className={`w-full text-white font-semibold py-2 rounded-3xl transition-colors ${
                          buttonDisabled
                            ? "bg-blue-700 cursor-not-allowed"
                            : "bg-pink-600 hover:bg-pink-700"
                        }`}
                        disabled={buttonDisabled}
                      >
                        Login
                      </button>
                  </div>
              </form>
              <p className="mt-4 text-gray-300">
                  Don&apos;t have account yet?{" "}
                  <span
                      className="text-blue-300 hover:underline cursor-pointer"
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
