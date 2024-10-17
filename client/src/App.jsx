import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Home,
  Login,
  Register,
  Accounts
} from './pages/route.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
