import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteWishlist } from "../../store/Slices/wishlist.slice";
import { Spinner } from "@material-tailwind/react";
import { addCart, fetchCart } from "../../store/Slices/cart.slice";
import { useEffect } from "react";

export default function Wishlist(props) {
    const { wish, isPending, isError } = useSelector(
        (state) => state.wishlist
    );

    const dispatch = useDispatch();

    const handleDeleteFromWishlist = (productId) => {
        dispatch(deleteWishlist(productId));
    };

    useEffect(() => {   
        dispatch(fetchCart())
    }, [dispatch])

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000050] z-40">
            <div
                className={`absolute top-0 transition ${props.wishShow ? "right-0" : "-right-full"
                    } w-full max-w-[450px] h-full bg-white p-10 flex flex-col justify-between `}
            >
                <div className="flex justify-between items-center font-poppins text-3xl pr-8">
                    <span>WISH LIST</span>
                    <span
                        className="cursor-pointer"
                        onClick={() => props.setWishShow(false)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
                {wish.length === 0 && <div className="w-full h-[85vh] grid place-content-center">No wishes you have.</div>}
                {!isPending && !isError ? (
                    <div className="w-full h-[85vh] flex flex-col gap-8 overflow-y-auto">
                        {wish.map((product, index) => {
                            return (
                                <div
                                    className="flex gap-4 font-poppins text-gray-800 pr-8"
                                    key={index}
                                >
                                    <div className="w-[80px] h-[100px] overflow-hidden relative group">
                                        <img
                                            src={product.thumbnail}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <div className="absolute top-full group-hover:top-0 left-0 w-full h-full bg-[#00000020]"></div>
                                    </div>
                                    <div className="text-[#888] w-full">
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="text-[1rem] flex justify-between text-[#555] hover:text-blue-500"
                                        >
                                            {product.title}
                                            <p className="text-pink-600 font-bold text-xs ">
                                                <i className="fa-solid fa-star"></i> {product.rating}{" "}
                                            </p>
                                        </Link>
                                        <p className="text-[.8rem] flex justify-between">
                                            {product.brand} | {product.category}
                                            <i
                                                className="fa-solid fa-trash text-lg relative -bottom-2 text-[#222] hover:text-red-500 cursor-pointer"
                                                onClick={() => handleDeleteFromWishlist(product._id)}
                                            ></i>
                                        </p>
                                        <p className="text-xl pt-4 flex justify-between items-center">
                                            ${product.price}
                                            <button
                                                className="bg-[#222] text-white text-xs px-4 py-2 rounded-full hover:shadow-md hover:shadow-blue-300 hover:bg-blue-500"
                                                onClick={() => dispatch(addCart({ product_id: product._id, quantity: 1 }))}
                                            >
                                                ADD TO CART
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <Spinner color="blue" className="h-16 w-16 m-auto" />
                )}
            </div>
        </div>
    );
}
