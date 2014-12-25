import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className='w-full relative h-[200px]'>
        <h1 className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white text-[3rem]'>About</h1>
        <img src='https://preview.colorlib.com/theme/cozastore/images/bg-01.jpg.webp' alt='about' className='w-full h-full object-cover' />
      </div>
      <div className='m-auto p-4 w-full max-w-[1400px]'>
        <div className='mt-8'>
          <img src="https://cdn.pixabay.com/photo/2019/09/30/15/22/shopping-cart-4516039_1280.jpg" className='w-full md:w-min-[300px] md:w-1/3 float-right' alt="online shopping" />
          <p className='text-lg'>Welcome to <strong className='text-xl'>MeraStore!</strong></p>
          <p className='mt-4'>At MeraStore, we're more than just an online shopping platform; we're your one-stop destination for a world of products. Established with a passion for bringing the best to our customers, we take pride in our diverse range of offerings and commitment to providing an exceptional shopping experience.</p>

          <p className='text-2xl mt-8 font-bold'>Our Story</p>
          <p className='mt-4'>MeraStore was born out of a vision to connect people with the products they desire. Whether you're looking for the latest electronics, trendy fashion, home essentials, or unique gifts, we've got it all. Our journey began with a small team of dedicated individuals who shared a common goal - to create an online shopping platform that's intuitive, reliable, and, most importantly, customer-centric.</p>

          <p className='text-2xl mt-8 font-bold'>Our Mission</p>
          <p className='mt-4'>Our mission is to empower you with the freedom to choose from a vast selection of products, all in one convenient place. We aim to:</p>
          <ul className="list-disc ml-4 mt-4">
            <li>Provide a wide range of products to cater to every need and preference.</li>
            <li>Offer a seamless shopping experience with user-friendly features.</li>
            <li>Ensure the highest standards of quality and authenticity in our product listings.</li>
            <li>Deliver excellent customer service to assist you throughout your shopping journey.</li>
          </ul>

          <p className='text-2xl mt-8 font-bold'>What Sets Us Apart</p>
          <p className='mt-4'>MeraStore is committed to providing a unique shopping experience. Here's what sets us apart:</p>
          <ul className="list-disc ml-4 mt-4">
            <li>Product Variety: MeraStore offers an extensive and ever-expanding catalog of products, from the latest tech gadgets to timeless fashion pieces, kitchen appliances to gardening tools.</li>
            <li>Quality Assurance: We partner with trusted brands and sellers to ensure that every product meets the highest standards of quality and authenticity.</li>
            <li>User-Friendly Interface: Our website is designed to be intuitive and easy to navigate, making your shopping experience hassle-free.</li>
            <li>Customer Support: Our dedicated support team is here to assist you with any questions, concerns, or issues you may encounter during your shopping journey.</li>
          </ul>

          <p className='text-2xl mt-8 font-bold'>Join Us on Our Journey</p>
          <p className='mt-4'>We invite you to explore our extensive range of products and experience the convenience of shopping at MeraStore. Join us on our mission to make your life more exciting, convenient, and enjoyable. Your feedback and suggestions are invaluable to us, as we constantly strive to improve and grow.</p>

          <p className='mt-4'>At MeraStore, your satisfaction is our priority. Thank you for choosing us as your trusted shopping partner.</p>

          <p className='mt-4'>Happy Shopping!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
