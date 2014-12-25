import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertReset, signup } from '../store/Slices/users.slices'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '@material-tailwind/react'
import AlertComponent from '../Components/AlertComponent'

export default function Signup() {
    const [details, setDetails] = useState({
        name: "",
        address: "",
        email: "",
        password: "",
        confirm_password: "",
        admin: false
    })
    const { isLogedIn, status, message, isAlert, isPending } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnChangeg = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setDetails({
            ...details,
            [name]: updatedValue
        });
    };

    const formSubmit = (e) => {
        e.preventDefault()
        dispatch(signup(details))
    }

    useEffect(() => {
        if (isLogedIn) {
            navigate("/");
        }

        return () => dispatch(alertReset())
    }, [status, navigate]);

    return (
        <div className='flex justify-center items-center h-[100vh] p-4 '>
            {isAlert && <AlertComponent status={status} message={message} />}
            <div className='flex flex-col-reverse sm:flex-row h-[500px] w-[800px] rounded-md overflow-hidden shadow-2xl'>
                <div className='hidden sm:flex p-4 flex-col w-full items-center justify-center text-center bg-blue-500 text-white '>
                    <h1 className='font-bold text-3xl'>Hello, Friend!</h1>
                    <p className='text-md py-4 hidden sm:block'>Enter you personal details and <br />start journey with us</p>
                    <Link to="/login" className='border text-white px-10 text-sm py-2 rounded-full mt-3 hover:bg-blue-400 hover:shadow-sm hover:shadow-blue-800'>SIGN IN</Link>
                </div>
                <form className='flex items-center justify-center flex-col p-4 h-full w-full bg-gray-50 gap-4 relative' onSubmit={(e) => formSubmit(e)}>
                    {isPending && <Spinner color="blue" className="absolute top-1/2 right-1/2 h-16 w-16 m-auto" />}
                    <h1 className='text-3xl text-blue-500 font-bold'>Sign Up</h1>
                    <input required type="text" placeholder='Name' name="name" value={details.name} onChange={(e) => handleOnChangeg(e)} className='outline-none border-none w-[15rem] text-sm bg-blue-50' />
                    <input required type="text" placeholder='Address' name="address" value={details.address} onChange={(e) => handleOnChangeg(e)} className='outline-none border-none w-[15rem] text-sm bg-blue-50' />
                    <input required type="email" placeholder='xyz@gmail.com' name="email" className='outline-none border-none w-[15rem] text-sm bg-blue-50' value={details.email} onChange={(e) => handleOnChangeg(e)} />
                    <input required type="password" placeholder='Password' name='password' className='outline-none border-none w-[15rem] text-sm bg-blue-50' value={details.password} onChange={(e) => handleOnChangeg(e)} />
                    <input required type="password" placeholder='Confirm Password' name='confirm_password' className='outline-none border-none w-[15rem] text-sm bg-blue-50' value={details.confirm_password} onChange={(e) => handleOnChangeg(e)} />
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" name="admin" id="role" onChange={(e) => handleOnChangeg(e)} />
                        <label htmlFor="role">Admin</label>
                    </div>
                    <button type='submit' className='bg-blue-500 text-white px-10 text-sm py-2 rounded-full hover:bg-blue-400 hover:shadow-sm hover:shadow-blue-800'>SIGN UP</button>
                </form>
            </div>
        </div>
    )
}
