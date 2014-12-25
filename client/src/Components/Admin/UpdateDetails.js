import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../store/Slices/categories.slices"
import { updateProduct } from "../../store/Slices/products.slices"


const UpdateDetails = (props) => {
    const {
        _id,
        title,
        description,
        discountPercentage,
        rating,
        brand,
        category,
        thumbnail,
        images
    } = props.product

    const [details, setDetails] = useState({
        title,
        description,
        discountPercentage,
        rating,
        brand,
        category,
        thumbnail,
        images
    })
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.categories)

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id, product: details }));
        props.setUpdateDetails(null)
    };

    return (
        <>
            <div className='fixed w-full h-full top-0 left-0 bg-[#0000004d] z-50' >
                <form className="absolute -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2 w-[90%] lg:w-[800px] md:h-[400px] h-min-[600px] bg-white flex flex-col flex-wrap md:flex-row justify-around p-4 py-12" onSubmit={(e) => formSubmit(e)}>
                    <i className="fa-solid fa-x absolute right-2 top-2 cursor-pointer" onClick={() => props.setUpdateDetails(null)}></i>
                    <div className='flex flex-col'>
                        <label htmlFor="title" className='text-xl'>Title</label>
                        <input type="text" value={details.title} name='title' id='title' onChange={(e) => handleOnChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="description" className='text-xl'>Description</label>
                        <input type="text" value={details.description} name='description' id='description' onChange={(e) => handleOnChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="discountPercentage" className='text-xl'>Discount Percentage</label>
                        <input type="number" value={details.discountPercentage} name='discountPercentage' id='discountPercentage' onChange={(e) => handleOnChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="rating" className='text-xl'>Rating</label>
                        <input type="number" value={details.rating} name='rating' id='rating' onChange={(e) => handleOnChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="brand" className='text-xl'>Brand</label>
                        <input type="text" value={details.brand} name='brand' id='brand' onChange={(e) => handleOnChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="category" className='text-xl'>Category</label>
                        <select type="text" value={details.category} name='category' id='category' onChange={(e) => handleOnChange(e)} >
                            {categories && categories.map((category, index) => (<option key={index} value={category.categoryName}>{category.category}</option>))}
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="thumbnail" className='text-xl'>Thumbnail URL</label>
                        <input type="text" value={details.thumbnail} name='thumbnail' id='thumbnail' onChange={(e) => handleOnChange(e)} />
                    </div>
                    <button type="submit" className='bg-blue-500 flex items-center justify-center px-8 mt-6 h-[50px] py-0 rounded-full text-white'>Udpate</button>
                </form>
            </div>
        </>
    )
}

export default UpdateDetails