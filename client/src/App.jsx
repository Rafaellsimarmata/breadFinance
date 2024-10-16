import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Home,
  Login,
  Register,
  Accounts,
  AddAccount,
  LogOut,
  Profile
} from './pages/route.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Accounts" element={<Accounts />} />
        <Route path='/Add-Account' element={<AddAccount />}></Route>
        <Route path='/LogOut' element={<LogOut />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
