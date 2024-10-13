import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Login,
  Register
} from './pages/route.js';

const Layout = () => {
  return (
    <>
      <p>Hello</p>
    </>
  )
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dasboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
