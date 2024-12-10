import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import useHandleTabClose from './hooks/HandleTabClose.js';
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
  AccountDetails,
  Goals,
  AddGoal
} from './pages/route.js';

function App() {
  useHandleTabClose()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path='/add-account' element={<AddAccount />}></Route>
          <Route path='/logout' element={<LogOut />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/transactions' element={<Transactions />} ></Route>
          <Route path='/add-transaction' element={<AddTransaction />} ></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/add-category' element={<AddCategory />} ></Route>
          <Route path='/account-details' element={<AccountDetails />}></Route>
          <Route path='/goals' element={<Goals />}></Route>
          <Route path='/add-goal' element={<AddGoal />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App