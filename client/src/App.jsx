import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Home,
  Login,
  Register
} from './pages/route.js';

function App() {
  return (
    <BrowserRouter>
      <Routes path="/" element={<Home />}>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
