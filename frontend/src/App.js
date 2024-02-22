import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import AdminRegister from './components/AdminRegister.js';
import AdminLogin from './components/AdminLogin.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mainpage from './components/Mainpage.js';


function App() {
  return (
    <div className='dark'>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<AdminRegister />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/home' element={<Mainpage/>} />
      </Routes>

    </div>
  );
}

export default App;
 