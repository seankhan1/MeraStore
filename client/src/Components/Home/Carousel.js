import { Link } from 'react-router-dom';
import { Carousel } from "@material-tailwind/react";

const data = [
    {
        "aria-label": "Slide 1",
        "small-text-hero": "Men-New Season",
        "big-text-hero": "New Arrival",
        "image": "https://preview.colorlib.com/theme/cozastore/images/slide-02.jpg.webp"
    },
    {
        "aria-label": "Slide 5",
        "small-text-hero": "Bags Season",
        "big-text-hero": "New Arrival",
        "image": "https://images.pexels.com/photos/7009501/pexels-photo-7009501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "aria-label": "Slide 2",
        "small-text-hero": "Laptop Season",
        "big-text-hero": "New Arrival",
        "image": "https://images.pexels.com/photos/6446678/pexels-photo-6446678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        "aria-label": "Slide 3",
        "small-text-hero": "Women-New Season",
        "big-text-hero": "New Arrival",
        "image": "https://preview.colorlib.com/theme/cozastore/images/slide-01.jpg.webp"
    },
    {
        "aria-label": "Slide 4",
        "small-text-hero": "Grocery Season",
        "big-text-hero": "New Arrival",
        "image": "https://images.pexels.com/photos/4033001/pexels-photo-4033001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
]


export default function CarouselComponent() {

    return (
        <>
            <Carousel className="relative top-0 md:top-[-6rem] h-[100vh] z-0" autoplay={true} loop={true}>
                <div className="relative h-full w-full">
                    <img
                        src={data[0].image}
                        alt={data[0]['small-text-hero']}
                        className="h-full w-full object-cover"
                    />
                    <div className="w-3/4 md:w-2/4">
                        <div className='absolute left-[10%] top-1/2 transform -translate-y-1/2 z-20'>
                            <h3 className='font-semibold text-[1.5rem] md:text-[2rem]'>{data[0]['small-text-hero']}</h3>
                            <h1 className='font-bold text-[3rem] md:text-[4rem] font-roboto'>{data[0]['big-text-hero']}</h1>
                            <Link to='/shop' className='bg-blue-500 text-white rounded-full py-2 px-6 hover:shadow-md hover:shadow-blue-300'>SHOW NOW</Link>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src={data[1].image}
                        alt={data[1]['small-text-hero']}
                        className="h-full w-full object-cover"
                    />
                    <div className="w-3/4 md:w-2/4">
                        <div className='absolute left-[10%] top-1/2 transform -translate-y-1/2 z-20'>
                            <h3 className='font-semibold text-[1.5rem] md:text-[2rem]'>{data[1]['small-text-hero']}</h3>
                            <h1 className='font-bold text-[3rem] md:text-[4rem] font-roboto'>{data[1]['big-text-hero']}</h1>
                            <Link to='/shop' className='bg-blue-500 text-white rounded-full py-2 px-6 hover:shadow-md hover:shadow-blue-300'>SHOW NOW</Link>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src={data[2].image}
                        alt={data[2]['small-text-hero']}
                        className="h-full w-full object-cover"
                    />
                    <div className="w-3/4 md:w-2/4">
                        <div className='absolute left-[10%] top-1/2 transform -translate-y-1/2 z-20'>
                            <h3 className='font-semibold text-[1.5rem] md:text-[2rem]'>{data[2]['small-text-hero']}</h3>
                            <h1 className='font-bold text-[3rem] md:text-[4rem] font-roboto'>{data[2]['big-text-hero']}</h1>
                            <Link to='/shop' className='bg-blue-500 text-white rounded-full py-2 px-6 hover:shadow-md hover:shadow-blue-300'>SHOW NOW</Link>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src={data[3].image}
                        alt={data[3]['small-text-hero']}
                        className="h-full w-full object-cover"
                    />
                    <div className="w-3/4 md:w-2/4">
                        <div className='absolute left-[10%] top-1/2 transform -translate-y-1/2 z-20'>
                            <h3 className='font-semibold text-[1.5rem] md:text-[2rem]'>{data[3]['small-text-hero']}</h3>
                            <h1 className='font-bold text-[3rem] md:text-[4rem] font-roboto'>{data[3]['big-text-hero']}</h1>
                            <Link to='/shop' className='bg-blue-500 text-white rounded-full py-2 px-6 hover:shadow-md hover:shadow-blue-300'>SHOW NOW</Link>
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    )
}


