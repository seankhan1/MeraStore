import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { fetchOrder } from "../store/Slices/orders.slices";

export default function Orders() {
    const dispatch = useDispatch()

    const { orderItems } = useSelector((state) => state.orders)
    useEffect(() => {
        dispatch(fetchOrder())
    }, [])

    return (
        <div>
            <Navbar />
            <div className="max-w-[1400px] m-auto min-h-[58.3vh] p-4 ">
                <h1 className="text-3xl font-bold">Order History</h1>
                {orderItems && orderItems.length > 0 ? (
                    orderItems.map((order, index) => {
                        const timestamp = new Date(order.orderDate)
                        const date = `${timestamp.getDay()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`
                        return (
                            <div className="w-full p-4 border-2 border-black mt-8 rounded-xl" key={index}>
                                <p className="font-bold">ORDER ID: {order._id}</p>
                                <div className="flex gap-8 py-4 flex-wrap">
                                    <p><span className="font-bold">Date of Order</span> <br />{date}</p>
                                    <p><span className="font-bold">Total Cost</span> <br /> ${order.totalAmount}</p>
                                    <p><span className="font-bold">Delivery Status</span> <br /> {order.orderStatus}</p>
                                </div>
                                <p className="pt-4 font-bold text-xl">Order Items:</p>
                                <div className="flex mb-2 gap-2 flex-wrap ">
                                    {order.products && order.products.length > 0 ? (
                                        order.products.map((item) => {
                                            if (item && item.item) {
                                                const itemDiscountPrice = (item.item.price - (item.item.price * item.item.discountPercentage / 100)).toFixed(0)
                                                return (
                                                    <div className="flex gap-2 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] xl:w-[24%]" key={item._id}>
                                                        <div className=" w-[80px] rounded-xl h-[100px] overflow-hidden">
                                                            <img src={item.item.thumbnail} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="py-4">
                                                            <p>{item.item.title} </p>
                                                            <p className="text-xs pb-2">Quantity: {item.quantity}</p>
                                                            <p>{item.quantity} <span className="text-xs">X</span> ${itemDiscountPrice} </p>
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return null; // Handle the case where item or item.item is null
                                            }
                                        })
                                    ) : (
                                        <div>No Order Items</div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div>No Order History</div>
                )}
            </div>
            <Footer />
        </div>
    )
}
