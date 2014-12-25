import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/Slices/users.slices';
import AlertComponent from '../Components/AlertComponent';

export default function PasswordReset() {
    const [form, setForm] = useState({
        password: "",
        confirm_password: ""
    });
    const [error, setError] = useState({
        isAlert: false,
        status: null,
        message: null
    });
    const user = useSelector(state => state.users);
    const { isPending, status, message, isAlert, isError } = user;
    const dispatch = useDispatch();

    const formValueOnChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        // if (form.confirm_password === form.password) {
        dispatch(resetPassword({ password: form.password, confirm_password: form.confirm_password }));
        // } else {
        // setError({
        //     isAlert: true,
        //     status: "Failed",
        //     message: "Password and Confirm Password don't match."
        // });
        // }
    }

    useEffect(() => {
        if (isAlert) {
            setError({
                isAlert: true,
                status: status,
                message: message
            });
        }
        return () => {
            setError({
                isAlert: false,
                status: null,
                message: null
            });
        }
    }, [user]);

    return (
        <div className='bg-blue-500 w-[100vw] h-[100vh] grid place-content-center'>
            {error.isAlert && <AlertComponent status={error.status} message={error.message} />}
            <form className='w-[300px] bg-white rounded-xl p-4 gap-2 m-4 flex flex-col justify-center' method='post' onSubmit={(e) => formSubmit(e)}>
                <div>
                    <label className='text-xl' htmlFor="pass">Password</label>
                    <input className='w-full' type="password" id="pass" name="password" value={form.password} placeholder='*****' onChange={(e) => formValueOnChange(e)} />
                </div>
                <div>
                    <label className='text-xl' htmlFor="confirm-pass">Confirm Password</label>
                    <input className='w-full' type="password" id="confirm-pass" value={form.confirm_password} name="confirm_password" placeholder='*****' onChange={(e) => formValueOnChange(e)} />
                </div>
                <input type="submit" value="Submit" className='bg-blue-500 flex items-center justify-center px-8 py-2 rounded-full text-white hover:shadow-md hover:shadow-blue-300 w-[100px] m-auto' />
            </form>
        </div>
    )
}
