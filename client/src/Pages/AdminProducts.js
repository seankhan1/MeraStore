import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableData from '../Components/Admin/TableData';
import UpdateDetails from '../Components/Admin/UpdateDetails';
import { fetchProducts } from '../store/Slices/products.slices';
import Navbar from '../Components/Navbar';
import { Spinner } from '@material-tailwind/react';
import AlertComponent from '../Components/AlertComponent';
import Footer from '../Components/Footer';
import AdminNav from '../Components/Admin/AdminNav';

export default function Admin() {
    const productsData = useSelector(state => state.products)
    const { products, pageInfo, isPending, isError, isAlert, message, status } = productsData;
    const dispatch = useDispatch()
    const [updateDetails, setUpdateDetails] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(fetchProducts({ page, maxResult: 20 }));
    }, [page]);

    return (
        <>
            <AdminNav/>
            {isAlert && <AlertComponent status={status} message={message} />}
            <div className='m-4 overflow-x-auto'>
                <h1 className='py-4 text-2xl font-bold'>Products</h1>
                <div className='overflow-x-auto'>
                    <table className='border-2 border-black p-4 w-full min-w-[100px]'>
                        <thead className='p-4'>
                            <tr>
                                <th className='border-2 border-black text-center p-2'>S.No</th>
                                <th className='border-2 border-black text-center p-2'>Tittle</th>
                                <th className='border-2 border-black text-center p-2'>Description</th>
                                <th className='border-2 border-black text-center p-2'>Discount</th>
                                <th className='border-2 border-black text-center p-2'>Rating</th>
                                <th className='border-2 border-black text-center p-2'>Brand</th>
                                <th className='border-2 border-black text-center p-2'>Category</th>
                                <th className='border-2 border-black text-center p-2'>Thumbnail</th>
                                <th className='border-2 border-black text-center p-2'>Images</th>
                                <th className='border-2 border-black text-center p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='h-[42.8vh]'>
                            {(!isPending && !isError) ? products.map((product, index) => (<TableData key={product._id} product={product} index={(index + 1)} setUpdateDetails={setUpdateDetails} />)) : (
                                <tr>
                                    <td colSpan={10}><Spinner color="blue" className="h-16 w-16 m-auto relative top-10" /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {products && pageInfo && <div className='flex items-center justify-center border w-[150px] h-[40px] m-auto my-8'>
                        <button className={`border-r-2 h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white disabled:bg-blue-400 disabled:text-white`} disabled={page <= 1 ? 1 : 0} onClick={() => setPage(page <= 1 ? page : page - 1)}>{"<<"}</button>
                        <p className='border-r-2 h-full w-full flex items-center justify-center bg-gray-300'>{`${page}/${pageInfo.totalPages}`}</p>
                        <button className='h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white disabled:bg-blue-400 disabled:text-white' onClick={() => setPage(pageInfo.totalPages <= page ? page : page + 1)} disabled={page >= pageInfo.totalPages ? 1 : 0}>{">>"}</button>
                    </div>}
                </div>
                {updateDetails && <UpdateDetails product={updateDetails} setUpdateDetails={setUpdateDetails} />}
            </div>
            <Footer />
        </>
    )
}

