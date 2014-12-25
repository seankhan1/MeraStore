import React from 'react'

export default function Footer() {
    return (
        <footer className='bg-black text-white'>
            <div className='max-w-[1400px] m-auto p-8 flex justify-between gap-4 flex-wrap sm:flex-nowrap'>
                <div className='w-full flex justify-between sm:flex-nowrap md:w-1/3'>
                    <div className='w-full pt-8'>
                        <h4 className='font-bold'>CATEGORIES</h4>
                        <ul className='text-[12px] text-gray-400 pt-6 flex flex-col gap-3'>
                            <li><a href="/">Women</a></li>
                            <li><a href="/">Men</a></li>
                            <li><a href="/">Shoes</a></li>
                            <li><a href="/">Watches</a></li>
                        </ul>
                    </div>
                    <div className='w-full pt-8'>
                        <h4 className='font-bold'>HELP</h4>
                        <ul className='text-[12px] text-gray-400 pt-6 flex flex-col gap-3'>
                            <li><a href="/">Track Order</a></li>
                            <li><a href="/">Returns</a></li>
                            <li><a href="/">Shipping</a></li>
                            <li><a href="/">FAQs</a></li>
                        </ul>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-4 md:flex-row md:w-2/3'>
                    <div className='w-full'>
                        <h4 className='font-bold  pt-8'>GET IN TOUCH</h4>
                        <p className='text-[12px] text-gray-400 pt-6'>Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>
                        <p className='flex gap-3 p-2 pl-0'>
                            <a href="/"><i className="fa-brands fa-square-twitter fa-2x"></i></a>
                            <a href="/"><i className="fa-brands fa-instagram fa-2x"></i></a>
                        </p>
                    </div>
                    <div className='w-full'>
                        <h4 className='font-bold pt-8'>NEWSLETTER</h4>
                        <p className='pt-4'>
                            <a className='text-[14px] text-gray-400' href="mailto:xyz.com">xyz@gmail.com</a>
                        </p>
                        <hr className='mt-1 mb-2 border-b-2 border-gray-800 rounded-xl' />
                        <p className='pt-4'>
                            <a href='/' className='font-bold bg-blue-700 p-3 rounded-[999px] hover:bg-blue-500 hover:text-white'>SUBSCRIBE</a>
                        </p>
                    </div>
                </div>

            </div>
            <p className='text-center p-4 w-full text-[12px]'>Copyright &#169;2023 ALl rights reserved. </p>
        </footer >
    )
}
