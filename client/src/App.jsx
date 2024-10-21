import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Home,
  Login,
  Register,
  Accounts,
  AddAccount,
  LogOut,
  Profile,
  Transactions,
  AddTransaction,
  Categories,
  AddCategory,
  AccountDetails
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
        <Route path='/Transactions' element={<Transactions />} ></Route>
        <Route path='/Add-Transaction' element={<AddTransaction />} ></Route>
        <Route path='/Categories' element={<Categories />}></Route>
        <Route path='/Add-Category' element={<AddCategory />} ></Route>
        <Route path='/Account-Details'element={<AccountDetails />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
