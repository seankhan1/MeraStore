import React, { useEffect, useInsertionEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, fetchCart, getKey, orderCreate, updateCart } from '../store/Slices/cart.slice';
import AlertComponent from '../Components/AlertComponent';
import { Spinner } from '@material-tailwind/react';
import api, { API } from '../store/Slices/api';

export default function Features() {
  const cart = useSelector((state) => state.cart);
  const { cartItems, isPending, isError, isAlert, status, message, cart_id } = cart;
  const user = useSelector((state) => state.users);
  const [key, setKey] = useState(null);
  const [orderProducts, setOrderProducts] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [error, setError] = useState({
    isAlert: false,
    status: 'Failed',
    message: null
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const total = cartItems ? cartItems.reduce((acc, item) => {
      const discountPrice = (item.product.price - (item.product.price * item.product.discountPercentage / 100)).toFixed(0);
      return acc + discountPrice * item.quantity;
    }, 0) : 0;

    setSubtotal(total);

    if (cartItems && cartItems.length !== 0) {
      setOrderProducts(() => {
        return cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        }));
      });
    }
  }, [cartItems]);

  useEffect(() => {
    getKey().then((key) => setKey(key));
    if (error.isAlert) {
      setTimeout(() => {
        setError({
          isAlert: false,
          status: 'Failed',
          message: null
        })
      }, 4000)
    }

  }, [error]);

  const handlePaymentButtonClick = async (e) => {
    try {
      const { data } = await orderCreate(subtotal);
      const options = {
        key,
        amount: data.amount, // Convert dollars to cents
        currency: "USD",
        name: "Mera Store",
        description: "Test Transaction",
        image: "https://e7.pngegg.com/pngimages/14/977/png-clipart-grocery-store-shopping-others-miscellaneous-retail.png",
        order_id: data.id,
        handler: async function (response) {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            cart: orderProducts,
            totalAmount: subtotal,
            cart_id
          };
          try {
            const res = await api.post('/orders/paymentVerify', data)
            dispatch(fetchCart())
            setError({
              isAlert: true,
              status: res.data.status,
              message: res.data.message
            })
          } catch (error) {
            setError({
              isAlert: true,
              status: "Failed",
              message: error.response.data.message || error.message
            })
          }
        },
        prefill: {
          name: user.user.name,
          email: user.user.email,
          contact: "9999999999",
        },
        notes: {
          address: user.user.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      setError({
        isAlert: true,
        status: "Failed",
        message: error.response.data.message || error.message
      })
    }
  };

  return (
    <>
      <Navbar />
      {error.isAlert && <AlertComponent status={error.status} message={error.message} />}
      {(isPending) && (<Spinner color="blue" className="h-16 w-16 m-auto relative top-10" />)}
      <div>
        {!isError && <div className="max-w-[1400px] m-auto p-4">
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8">
            <div className="w-full xl:w-2/3">
              <div className="table-container overflow-x-auto">
                <table className="w-full min-w-[550px] rounded-xl overflow-hidden md:min-w-[700px]">
                  <thead className="border-2">
                    <tr>
                      <th className="p-2">Product</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems && cartItems.length === 0 && <tr className='border-2'><td colSpan={4} className='text-center py-4'>No product in cart.</td></tr>}
                    {cartItems && cartItems.map((items, index) => (
                      <ItemRow items={items} index={index} key={index} />
                    ))}
                  </tbody>
                </table>  
              </div>
            </div>

            <div className="w-full xl:w-1/3 p-8 border-2 min-w-[400px]">
              <p className="text-xl font-bold pb-4">CART TOTALS</p>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="pb-8">
                    <td className="py-2 px-4 font-bold">Subtotal:</td>
                    <td className="py-2 px-4">${subtotal.toFixed(0)}</td>
                  </tr>
                  <tr className="pb-8">
                    <td className="py-2 px-4 font-bold flex items-start">Shipping:</td>
                    <td className="py-2 px-4">
                      <p className="mb-2">
                        There are no shipping methods available. Please double-check your address, or contact us if you need any help.
                      </p>
                      <p className="pt-4 font-bold ">Address:</p>
                      <p>{user.user.address}</p>
                    </td>
                  </tr>
                  <tr className="pb-8">
                    <td className="py-2 px-4 font-bold">Total:</td>
                    <td className="py-2 px-4">${subtotal.toFixed(0)}</td>
                  </tr>
                  <tr className="pb-8">
                    <td colSpan="2" className="py-2 px-4">
                      <button className="bg-blue-500 m-auto flex items-center justify-center px-8 py-2 rounded-full text-white hover:shadow-md cursor-pointer hover:shadow-blue-300 disabled:bg-gray-800 disabled:hover:shadow-none disabled:cursor-default"
                        onClick={handlePaymentButtonClick} disabled={cartItems.length === 0 ? 1 : 0}
                      >PROCEED TO CHECKOUT</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
}

const ItemRow = (props) => {
  const items = props.items;
  const [quantity, setQuantity] = useState(items.quantity);
  const dispatch = useDispatch()

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity)
    dispatch(updateCart({ _id: items.product._id, quantity: newQuantity }))
      .then(() => dispatch(fetchCart()));
  };

  const discountPrice = (items.product.price - (items.product.price * items.product.discountPercentage / 100)).toFixed(0)

  return (
    <tr className="border-2" key={props.index}>
      <td className="p-6">
        <div className="flex items-center gap-4">
          <p className="w-[80px] h-[100px]"><img src={items.product.thumbnail} alt="" className="w-full h-full object-cover" /></p>
          <p>
            <span>{items.product.title}</span><br />
            <span className="text-green-500">{items.product.discountPercentage}% off</span><br />
            <i
              className="fa-solid fa-trash text-lg relative -bottom-2 text-[#222] hover:text-red-500 cursor-pointer"
              onClick={() => {
                dispatch(deleteCart(items.product._id))
                  .then(() => {
                    dispatch(fetchCart());
                  });
              }}
            ></i>
          </p>
        </div>
      </td>
      <td className="text-center min-w-[100px]">
        ${discountPrice} <br /> <span className="line-through text-xs text-green-500"> ${items.product.price.toFixed(0)} </span>
      </td>
      <td className="text-center min-w-[100px]">
        <div className="flex items-center justify-center border w-[150px] h-[40px] mx-auto">
          <button
            className={`border-r-2 h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white disabled:bg-blue-400 disabled:text-white`}
            disabled={quantity <= 1}
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <p className="border-r-2 h-full w-full flex items-center justify-center bg-gray-300">{quantity}</p>
          <button
            className="h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white disabled:bg-blue-400 disabled:text-white"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 4}
          >
            +
          </button>
        </div>
      </td>
      <td className="text-center min-w-[100px]">
        ${discountPrice * quantity}
      </td>
    </tr>
  );
};
