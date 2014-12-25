import { useDispatch } from "react-redux"
import { deleteProduct } from "../../store/Slices/products.slices"

const TableData = (props) => {
    const { _id, title, description, discountPercentage, rating, brand, category, images, thumbnail } = props.product
    const dispatch = useDispatch()
    return (
        <tr >
            <td className='border-2 border-black text-center font-bold p-2'>{props.index}</td>
            <td className='border-2 border-black text-center p-2'>{title}</td>
            <td className='border-2 border-black text-center p-2'>{description}</td>
            <td className='border-2 border-black text-center p-2'>{discountPercentage}</td>
            <td className='border-2 border-black text-center p-2'>{rating}</td>
            <td className='border-2 border-black text-center p-2'>{brand}</td>
            <td className='border-2 border-black text-center p-2'>{category}</td>
            <td className='border-2 border-black text-center p-2 '>
                <img src={thumbnail} className='w-[150px] h-[100px] object-cover m-auto' alt="" />
            </td>
            <td className='border-2 border-black text-center flex overflow-x-auto'>
                <img src={images[0]} className='w-[150px] h-[100px] object-cover border border-black' alt='' />
                <img src={images[1]} className='w-[150px] h-[100px] object-cover border border-black' alt='' />
                <img src={images[2]} className='w-[150px] h-[100px] object-cover border border-black' alt='' />
                <img src={images[3]} className='w-[150px] h-[100px] object-cover border border-black' alt='' />
            </td>
            <td className='text-center border-2 border-black p-2'>
                <p><i className="fa-solid fa-up-right-from-square cursor-pointer hover:text-blue-500" onClick={() => props.setUpdateDetails(props.product)}></i></p>
                <p><i className="fa-solid fa-trash cursor-pointer hover:text-blue-500" onClick={() => dispatch(deleteProduct(_id))}></i></p>
            </td>
        </tr>
    )
}

export default TableData