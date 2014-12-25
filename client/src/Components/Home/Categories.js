import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/Slices/categories.slices';
import { Link } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';

export default function Categories() {
    const dispatch = useDispatch()
    const { categories, isPending, isError } = useSelector(state => state.categories);
    const { isLogedIn } = useSelector(state => state.users)
    const categoriesSliderRef = useRef(); // Separate ref for categories slider
    const wishlistSliderRef = useRef();  // Separate ref for wishlist slider
    const wishlist = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        arrows: false,
    };

    return (
        <>
            {(isPending || isError) && (<Spinner color="blue" className="h-16 w-16 m-auto" />)}
            {!isError && !isPending && (<div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                <div className='flex flex-col gap-4 justify-center items-center text-center md:border-2 w-full md:w-[30%] lg:w-1/3 h-[200px]'>
                    <h3 className='text-4xl'>Top Categories </h3>
                    <Link to="/shop" className='bg-blue-500 text-white rounded-full py-2 px-6 hover:shadow-md hover:shadow-blue-300'>SHOP NOW</Link>
                </div>
                <Slider className='carousel-container cursor-pointer w-full md:w-[70%] lg:w-3/4' ref={categoriesSliderRef} {...settings}>
                    {
                        categories.map((category) => (
                            <div key={category.image} className='relative h-[200px] border-[1px] group'>
                                <h4 className='absolute left-0 -bottom-[120%] group-hover:bottom-0 flex justify-center items-center h-full z-50 w-full bg-black opacity-50 text-white text-xl'>{category.category}</h4>
                                <img src={category.image} alt={category.category} className='absolute top-0 left-0 w-full h-full object-top object-cover' />
                            </div>
                        ))
                    }
                </Slider>
            </div>)}

            {(wishlist.isPending) && (<Spinner color="blue" className="h-16 w-16 m-auto" />)}
            {isLogedIn && !wishlist.isError && !wishlist.isPending && wishlist.wish.length !== 0 && (<div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-8'>
                <div className='flex flex-col  gap-4 justify-center items-center text-center md:border-2 w-full md:w-[30%] lg:w-1/3 h-[200px]'>
                    <h3 className='text-4xl'> Your Wish List </h3>
                    <Link to="/shop" className='bg-blue-500 text-white rounded-full py-2 px-6 hover:shadow-md hover:shadow-blue-300'>SHOW NOW</Link>
                </div>
                <Slider className='carousel-container cursor-pointer w-full md:w-[70%] lg:max-w-3/4 h-[207px] overflow-hidden' ref={wishlistSliderRef} {...settings}>
                    {
                        wishlist.wish.map((wishItem) => (
                            <div key={wishItem._id} className='relative h-[200px] border-[1px] group'>
                                <h4 className='absolute left-0 -bottom-[120%] group-hover:bottom-0 flex justify-center items-center h-full z-50 w-full bg-black opacity-50 text-white text-xl text-center'>{wishItem.title}</h4>
                                <img src={wishItem.thumbnail} alt={wishItem.category} className='absolute top-0 left-0 w-full h-full object-top object-cover' />
                            </div>
                        ))
                    }
                </Slider>
            </div>)}
        </>
    );
}
