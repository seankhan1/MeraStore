import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, fetchCart, getKey } from "../store/Slices/cart.slice";
import { Spinner } from "@material-tailwind/react";
import AlertComponent from "./AlertComponent";


export default function Cart(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems, isPending, isAlert, isError, message, status } = cart;
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [])

    useEffect(() => {
        const total = cartItems.reduce((total, item) => {
            const itemPrice = item.product.price;
            return total + itemPrice * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000050] z-40">
            {isAlert && <AlertComponent status={status} message={message} />}
            <div className={`absolute top-0 transition ${props.cartShow ? "right-0" : "-right-full"} w-full max-w-[450px] h-full bg-white p-10 flex flex-col justify-between`}>
                <div className="flex justify-between items-center font-poppins text-3xl">
                    <span>YOUR CART</span>
                    <span className="cursor-pointer" onClick={() => props.setCartShow(false)}><i className="fa-solid fa-xmark"></i></span>
                </div>
                <div className="w-full h-[75vh] flex flex-col gap-8 overflow-y-auto">
                    {isPending && <Spinner color="blue" className="h-16 w-16 m-auto" />}
                    {!isPending && !isError && cartItems.map((products, index) => {
                        const { product, quantity } = products
                        return (
                            <div className="flex gap-4 font-poppins text-gray-800 pr-8" key={index}>
                                <div className="w-[80px] h-[100px] overflow-hidden relative group">
                                    <img src={product.thumbnail} className="w-full h-full object-cover" alt="" />
                                    <div className="absolute top-full group-hover:top-0 left-0 w-full h-full bg-[#00000020]"></div>
                                </div>
                                <div className="text-[#888] w-full">
                                    <Link to={`/product/${product.id}`} className="text-[1rem] flex justify-between text-[#555] hover:text-blue-500">
                                        {product.title}
                                        <p className='text-pink-600 font-bold text-xs '><i className="fa-solid fa-star"></i> {product.rating} </p>
                                    </Link>
                                    <p className="text-[.8rem] flex justify-between">
                                        {product.brand} | {product.category}
                                        <i
                                            className="fa-solid fa-trash text-lg relative -bottom-2 text-[#222] hover:text-red-500 cursor-pointer"
                                            onClick={() => {
                                                dispatch(deleteCart(product._id))
                                                    .then(() => {
                                                        dispatch(fetchCart());
                                                    });
                                            }}
                                        ></i>
                                    </p>
                                    <p className="text-xl pt-4 flex justify-between items-end">${product.price * quantity} <span className="text-xs">Quantity: {quantity}</span></p>
                                </div>
                            </div>
                        )
                    })}
                    {cartItems.length === 0 && <div className="w-full h-[85vh] grid place-content-center">No product you have.</div>}
                </div>
                <div>
                    <p className="text-xl text-gray-800 flex justify-between items-center"><span>TOTAL: ${totalPrice}</span> <Link to="/features" className="bg-[#222] text-white px-4 py-2 rounded-full  hover:shadow-md hover:shadow-blue-300 hover:bg-blue-500">VIEW CART</Link></p>
                </div>
            </div>
        </div>
    )
}
