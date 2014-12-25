import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Wishlist from './Shop/Wishlist';
import { fetchWish } from '../store/Slices/wishlist.slice';
import Cart from './Cart';
import { fetchCart } from '../store/Slices/cart.slice';

export default function Navbar() {
    const [menuToggle, setMenuToggle] = useState(false);
    const [offset, setOffset] = useState(0);
    const [activeLink, setActiveLink] = useState('home');
    const { isLogedIn } = useSelector((state) => state.users)
    const { wish } = useSelector((state) => state.wishlist)
    const cart = useSelector((state) => state.cart)

    const [wishShow, setWishShow] = useState(false)
    const [cartShow, setCartShow] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);

        dispatch(fetchWish())
        dispatch(fetchCart())

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`text-black w-full z-40 ${offset >= 100 ? "fixed top-0 bg-white" : "bg-transparent relative top-0"}`}>
                <div className='max-w-[1400px] m-auto flex justify-between p-5'>
                    <div className='md:flex md:items-center'>
                        <Link to="/" className='text-2xl'><span className='font-bold'>MERA</span> Store</Link>

                        {/* Navigation Bar */}
                        <nav className={`md:ml-10 ${menuToggle ? 'h-auto' : 'h-0'} md:h-auto overflow-hidden`}>
                            <ul className="flex font-semibold h-full flex-col md:flex-row py-4 md:gap-5">
                                <li className="text-blue-500">
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/shop">
                                        Shop
                                    </Link>
                                </li>
                                {isLogedIn && <li className={`relative`}>
                                    <Link to="/features">
                                        Features
                                    </Link>
                                    <span className="bg-pink-600 text-[10px] realative ml-4 md:absolute -top-3 -right-3 px-2 rounded-lg text-white">
                                        Hot
                                    </span>
                                </li>}
                                {isLogedIn && <li className={`relative`}>
                                    <Link to="/orders">
                                        Orders
                                    </Link>
                                </li>}
                                <li className="">
                                    <Link to="/about">
                                        About
                                    </Link>
                                </li>
                                {isLogedIn && <li className="">
                                    <Link to="/admin-panel">
                                        Admin Panel
                                    </Link>
                                </li>}
                            </ul>
                        </nav>
                    </div>

                    {!isLogedIn ? <Link to="/login" className='bg-blue-500 flex items-center justify-center px-8 py-0 rounded-full text-white hover:shadow-md hover:shadow-blue-300' >Sign In</Link> :
                        <ul className='flex gap-4 md:items-center'>
                            <li className='relative cursor-pointer' onClick={() => setCartShow(true)}>
                                <i className="fa-solid fa-cart-shopping text-xl"></i>
                                <span className='bg-blue-500 text-[10px] text-2xl absolute -top-3 -right-3 w-5 h-5 flex justify-center items-center text-white'>{cart.cartItems?.length || 0}</span>
                            </li>
                            <li className='relative cursor-pointer' onClick={() => setWishShow(true)}>
                                <i className="fa-regular fa-heart text-xl"></i>
                                <span className='bg-blue-500 text-[10px] text-2xl absolute -top-3 -right-3 w-5 h-5 flex justify-center items-center text-white'>{wish.length}</span>
                            </li>
                            <li className='md:hidden cursor-pointer ' onClick={() => menuToggle === false ? setMenuToggle(true) : setMenuToggle(false)}><i className={`fa-solid ${menuToggle ? "fa-xmark" : "fa-bars"} text-xl`}></i></li>
                        </ul>}
                </div>
            </header>
            {wishShow && <Wishlist wishShow={wishShow} setWishShow={setWishShow} />}
            {cartShow && <Cart cartShow={cartShow} setCartShow={setCartShow} />}
        </>
    )
}
