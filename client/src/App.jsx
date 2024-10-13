import './App.css';
import {
  login,
  register
} from './pages/route.js';

function App() {
  return (
    <>
      <Route element={<Layout />}>
        <Route path="/login" element={<loginogin />} />
        <Route path="/register" element={<register />} />
      </Route>
    </>
  )
}

export default App
