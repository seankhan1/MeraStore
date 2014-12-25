import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, deleteCart, fetchCart } from "../../store/Slices/cart.slice";

const ShowProductWindow = (props) => {
    const [displayImage, setDisplayImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const { isError, isLogedIn } = useSelector((state) => state.users);
    const setShowDetails = props.setShowDetails
    const { _id, title, description, price, discountPercentage, rating, brand, category, images } = props.product
    const discPrice = ((price - (price * discountPercentage / 100)).toFixed(0) * quantity).toFixed(0)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const addedCart = () => {
        dispatch(addCart({
            product_id: _id,
            quantity
        }))
            .then(() => dispatch(fetchCart()))
    }
    return (
        <>
            <div className='fixed w-full h-full top-0 left-0 bg-[#0000004d] z-50' id={_id}>
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90%] lg:w-[900px] md:h-[600px] h-min-[600px] bg-white flex flex-col md:flex-row justify-between p-4 py-12">
                    <i className="fa-solid fa-x absolute right-2 top-2 cursor-pointer" onClick={() => setShowDetails(null)}></i>
                    <div className='flex gap-4 w-full md:w-1/2'>
                        <div className='w-[20%] md:w-[15%] flex flex-col items-center gap-4'>
                            <img src={images[0]} onClick={() => setDisplayImage(0)} alt="" className='w-full h-[80px] border border-white hover:border-blue-500 object-cover' />
                            <img src={images[1]} onClick={() => setDisplayImage(1)} alt="" className='w-full h-[80px] border border-white hover:border-blue-500 object-cover' />
                            <img src={images[2]} onClick={() => setDisplayImage(2)} alt="" className='w-full h-[80px] border border-white hover:border-blue-500 object-cover' />
                        </div>
                        <div className='w-[90%] h-[300px] md:h-[95%]'>
                            <img src={images[displayImage]} alt="" className='w-full h-full object-cover' />
                        </div>
                    </div>

                    <div className='w-full md:w-[50%] p-4 md:pl-12'>
                        <div className='flex flex-col gap-4 md:flex-row justify-between pr-4'>
                            <div className="flex flex-col">
                                <h1 className='text-xl font-semibold'>{title}</h1>
                                <h4 className='text-xs font-semibold'>{`${brand} | ${category} `}</h4>
                            </div>
                            <p className='text-pink-600 font-bold text-lg'><i className="fa-solid fa-star"></i> {rating} </p>
                        </div>

                        <p className='py-4'>
                            <span className='font-bold text-xl'>${discPrice}</span>
                            <span className='pl-2 line-through text-gray-400'>${price}</span>
                            <span className='text-green-600 font-bold pl-2'>{discountPercentage}% off</span>
                        </p>
                        <p className='text-sm'>{description}</p>
                        <div className='mt-8 w-full flex flex-wrap gap-4 justify-around'>
                            <div className='flex items-center justify-between border w-[150px] h-[40px]'>
                                <button className='h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white' value={quantity} onClick={() => setQuantity((prev) => prev <= 1 ? 1 : prev - 1)} >-</button>
                                <p className='border-r-2 h-full w-full flex items-center justify-center bg-gray-200'>{quantity}</p>
                                <button className='border-r-2 h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white' value={quantity} onClick={() => setQuantity((prev) => prev >= 4 ? 4 : prev + 1)}>+</button>
                            </div>
                            {isLogedIn ? (<button onClick={addedCart} className='bg-blue-500 px-4 py-2 rounded-full text-white text-xs w-[150px] grid place-content-center hover:shadow-md hover:shadow-blue-300'>ADD TO CART</button>) : (<Link to={"/login"} className='bg-blue-500 px-4 py-2 rounded-full text-white text-xs w-[150px] grid place-content-center  hover:shadow-md hover:shadow-blue-300'>Sign In</Link>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowProductWindow