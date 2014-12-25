import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { alertReset, login, sendEmail } from '../store/Slices/users.slices';
import { useNavigate } from 'react-router-dom';
import { Spinner, input } from '@material-tailwind/react';
import AlertComponent from '../Components/AlertComponent';

export default function Signin() {
    const [details, setDetails] = useState({ email: "", password: "" });
    const usersData = useSelector((state) => state.users)
    const { isLogedIn, status, message, isAlert, isPending } = usersData
    const [window, setWindow] = useState(false)
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnChangeg = (e) => {
        const { name, value } = e.target;

        setDetails({
            ...details,
            [name]: value
        });
    };

    const formSubmit = (e) => {
        e.preventDefault()
        dispatch(login(details))
    }

    useEffect(() => {
        if (isLogedIn) {
            navigate("/");
        }

        if (status === "Success") {
            setWindow(false)
        }
    }, [status, navigate, window]);

    const OpenWindow = () => {
        setWindow(true)
        setEmail('')
    }

    const emailSubmit = (e) => {
        e.preventDefault()
        dispatch(sendEmail(email))
    }

    return (
        <div className='flex justify-center items-center h-[100vh] p-4'>
            {isAlert && <AlertComponent status={status} message={message} />}

            <div className='flex flex-col-reverse sm:flex-row h-[500px] w-[800px] rounded-md overflow-hidden shadow-2xl'>
                <form className='flex items-center justify-center flex-col p-4 h-full w-full bg-gray-50 relative' onSubmit={(e) => formSubmit(e)}>
                    {isPending && <Spinner color="blue" className="absolute top-1/2 right-1/2 h-16 w-16 m-auto" />}
                    <h1 className='text-3xl text-blue-500 font-bold'>Sign In</h1>
                    <input type="email" placeholder='xyz@gmail.com' name='email' className='my-4 outline-none border-none w-[15rem] text-sm' value={details.email} onChange={handleOnChangeg} required />
                    <input type="password" placeholder='Password' className='mb-4 outline-none border-none w-[15rem] text-sm' name="password" value={details.password} onChange={handleOnChangeg} required />
                    <div onClick={OpenWindow} className='text-xs cursor-pointer'>Forgot your password?</div>
                    <button type='submit' className='bg-blue-500 text-white px-10 text-sm py-2 rounded-full mt-3 hover:bg-blue-400 hover:shadow-sm hover:shadow-blue-800'>SIGN IN</button>
                </form>
                <div className='p-4 flex flex-col w-full items-center justify-center text-center bg-blue-500 text-white h-full'>
                    <h1 className='font-bold text-3xl'>Hello, Friend!</h1>
                    <p className='text-md py-4'>Enter your personal details and <br /> start your journey with us</p>
                    <Link to="/signup" className='border text-white px-10 text-sm py-2 rounded-full mt-3 hover:bg-blue-400 hover:shadow-sm hover:shadow-blue-800'>SIGN UP</Link>
                </div>
            </div>

            {window && <div className='fixed top-0 left-0 z-40 bg-[#00000050] w-full h-full p-4'>
                <form className='bg-white max-w-[500px] rounded-xl p-8 w-[90%] flex flex-col absolute -translate-x-1/2 left-1/2 top-[10%]' onSubmit={(e) => emailSubmit(e)}>
                    <label htmlFor="email" >Email</label>
                    <input type="email" required id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='xyz@gmail.com' />
                    <div className='flex items-center justify-around pt-4' >
                        <button className='bg-blue-500 flex items-center justify-center px-8 py-2 rounded-full text-white hover:shadow-md hover:shadow-blue-300' type="submit" >Submit</button>
                        <button className="bg-blue-500 flex items-center justify-center px-8 py-2 rounded-full text-white hover:shadow-md hover:shadow-blue-300" onClick={() => setWindow(false)}>Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    );
}
