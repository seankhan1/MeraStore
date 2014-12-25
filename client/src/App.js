import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Features from './Pages/Features';
import About from './Pages/About';
import Footer from './Components/Footer';
import Signin from './Pages/Signin';
import Signup from './Pages/Singup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin from './Pages/Admin';
import { getUser } from './store/Slices/users.slices';
import AlertComponent from './Components/AlertComponent';
import { fetchCart } from './store/Slices/cart.slice';
import PasswordReset from './Pages/PasswordReset';
import Orders from './Pages/Orders';
import Lougout from './Components/Lougout';


function App() {
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [error, setError] = useState({
    isAlert: false, status: null, message: null
  })
  useEffect(() => {
    // if (cart.isLogedIn) {
    dispatch(getUser())
    // }
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, []);

  // useEffect(() => {


  //   return () => {
  //     setError({
  //       isAlert: false, status: null, message: null
  //     })
  //   }
  // }, [cart])

  return (
    <BrowserRouter>
      {loader && <div className='fixed z-50 top-0 left-0 w-full h-full bg-white text-5xl grid place-content-center'>
        <p><span className='text-blue-500 font-bold'>MERA</span> Store</p>
      </div>}
      {/* {error.isAlert && <AlertComponent status={error.status} message={error.message} />} */}
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const { isLogedIn } = useSelector((state) => state.users)
  return (
    <>
      <Lougout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        {isLogedIn && <Route path="/features" element={<Features />} />}
        {isLogedIn && <Route path="/orders" element={<Orders />} />}
        <Route path="/about" element={<About />} />
        {!isLogedIn && <Route path="/login" element={<Signin />} />}
        {!isLogedIn && <Route path="/signup" element={<Signup />} />}
        {isLogedIn && <Route path="/admin-panel" element={<Admin />} />}
        <Route path='/password-reset' element={<PasswordReset />} />
      </Routes>
    </>
  );
}

export default App;
