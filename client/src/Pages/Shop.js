import React, { useEffect, useState } from 'react';
import { fetchProducts, productAlertReset } from '../store/Slices/products.slices';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/Slices/categories.slices';
import ShowProductWindow from '../Components/Shop/ShowProductWindow';
import { Spinner } from '@material-tailwind/react';
import AlertComponent from '../Components/AlertComponent';
import Navbar from '../Components/Navbar';
import { addToWishlist, fetchWish, getUser, wishAlertReset } from '../store/Slices/wishlist.slice';
import Footer from '../Components/Footer';

export default function Shop() {
  const [showDetails, setShowDetails] = useState(null)
  const [error, setError] = useState({
    status: null, message: null, isAlert: false
  })
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const productsData = useSelector(state => state.products);
  const wishlist = useSelector(state => state.wishlist)
  const user = useSelector(state => state.users)
  const { products, pageInfo } = productsData
  const [filterProduct, setFilterProduct] = useState({
    price: "",
    category: "",
    search: "",
    maxResult: 20,
    page: pageInfo ? pageInfo.page : 1
  })

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  useEffect(() => {
    if (productsData.isAlert) {
      setError(prev => ({
        ...prev,
        isAlert: true,
        message: productsData.message,
        status: productsData.status
      }))
    }

    if (categories.isAlert) {
      setError(prev => ({
        ...prev,
        isAlert: true,
        message: categories.message,
        status: categories.status
      }))
    }

    if (wishlist.isAlert) {
      setError(prev => ({
        ...prev,
        isAlert: true,
        message: wishlist.message,
        status: wishlist.status
      }))
    }

    if (wishlist.isAlert) {
      dispatch(fetchWish())
    }

    return () => {
      dispatch(wishAlertReset())
      dispatch(productAlertReset())
    }
  }, [productsData, categories, wishlist])

  useEffect(() => {
    dispatch(fetchProducts(filterProduct));
  }, [filterProduct, dispatch]);

  const showWindow = (product) => {
    setShowDetails(product)
  }

  function wishlistChecker(_id) {
    const flag = wishlist.wish.some((product) => product._id === _id);
    return flag;
  }


  return (
    <>
      <Navbar />
      <div className={`max-w-[1400px] m-auto  ${products ? "min-h-[90vh]" : "min-h-[58.3vh]"}`}>
        {(categories.isPending || categories.isError) && (<Spinner color="blue" className="h-16 w-16 m-auto relative top-10" />)}
        {error.isAlert && <AlertComponent status={error.status} message={error.message} />}
        {(!categories.isPending && !categories.isError) && (
          <div className={`flex flex-col sm:flex-row gap-4 w-full ${products ? "min-h-[90vh]" : "min-h-[58.3vh]"} m-auto p-4 pt-0`}>
            <div className='bg-gray-200 w-full sm:w-[300px] h-[580px]'>
              <div className='w-full p-6 pb-0'>
                <p className='font-bold text-lg'>Search</p>
                <input type="text" name="" id="" className='h-10 rounded-full w-full' placeholder='Smartphones' value={filterProduct.search} onChange={(e) => setFilterProduct({ ...filterProduct, search: e.target.value, page: 1 })} />
              </div>
              <div className='p-6 flex flex-wrap gap-8'>
                <div className='w-[200px]'>
                  <p className='font-bold text-lg'>Category</p>
                  <ul className='flex pl-2 sm:flex-nowrap flex-col h-[190px] gap-2 overflow-x-auto mt-2'>
                    <li key={0} className='flex gap-2 items-center text-gray-500 hover:text-blue-500'>
                      <input type="radio" name="category" value={""} checked={filterProduct.category === ""} id={"all"} onChange={(e) => setFilterProduct({ ...filterProduct, category: e.target.value, page: 1 })} />
                      <label htmlFor={"all"}>All</label>
                    </li>
                    {categories.categories.map((category) => (
                      <li key={category._id} className='flex gap-2 items-center text-gray-500 hover:text-blue-500'>
                        <input type="radio" name="category" value={category.categoryName} checked={filterProduct.category === category.category} id={category.category} onChange={(e) => setFilterProduct({ ...filterProduct, category: e.target.value, page: 1 })} />
                        <label htmlFor={category.category}>{category.category}</label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='w-[180px]'>
                  <p className='font-bold text-lg'>Price</p>
                  <ul className='pt-2 pl-2 flex flex-wrap flex-col gap-2'>
                    <li className='flex gap-2 items-center text-gray-500'>
                      <input type="radio" name="price" id="all" value="" checked={filterProduct.price === ""} onChange={(e) => setFilterProduct({ ...filterProduct, price: e.target.value, page: 1 })} />
                      <label htmlFor="all">All</label>
                    </li>
                    <li className='flex gap-2 items-center text-gray-500'>
                      <input type="radio" name="price" id="<= 500" value="<= 500" checked={filterProduct.price === "<= 500"} onChange={(e) => setFilterProduct({ ...filterProduct, price: e.target.value, page: 1 })} />
                      <label htmlFor="<= 500">$0.00 - $500.00</label>
                    </li>
                    <li className='flex gap-2 items-center text-gray-500'>
                      <input type="radio" name="price" id="500 <= 1000" value="500 <= 1000" checked={filterProduct.price === "500 <= 1000"} onChange={(e) => setFilterProduct({ ...filterProduct, price: e.target.value, page: 1 })} />
                      <label htmlFor="500 <= 1000">$500.00 - $1000.00</label>
                    </li>
                    <li className='flex gap-2 items-center text-gray-500'>
                      <input type="radio" name="price" id="> 1000" value="> 1000" checked={filterProduct.price === "> 1000"} onChange={(e) => setFilterProduct({ ...filterProduct, price: e.target.value, page: 1 })} />
                      <label htmlFor="> 1000">$1000.00+</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <div className='flex flex-wrap gap-4 w-full pt-0'>
                {(!productsData.isError && !productsData.isPending) && products.map((product) => (
                  <div key={product._id} className='h-[350px] w-full sm:w-1/3 md:w-[220px] xl:w-[300px]'>
                    <div className='h-[80%] overflow-hidden relative group'>
                      <img src={product.thumbnail} alt={product.title} className='w-full h-full object-cover group-hover:scale-110' />
                      <button className='absolute -translate-x-1/2 left-1/2 -bottom-12 bg-white px-4 py-2 rounded-full hover:bg-black hover:text-white group-hover:bottom-2 text-xs' onClick={() => showWindow(product)}>Quick View</button>
                    </div>
                    <div className='h-[20%] p-2 flex justify-between items-center'>
                      <div>
                        <p className='text-gray-400'>{product.title}</p>
                        <p>${product.price} <span className='text-xs text-green-700'>{product.discountPercentage}% off</span></p>
                      </div>
                      <div className='text-gray-400'>
                        <i className={` fa-heart text-xl cursor-pointer ${wishlistChecker(product._id) ? "text-pink-500 fa-solid" : "fa-regular"}`} onClick={() => {
                          if (user.status === "Success") dispatch(addToWishlist(product._id))
                          else setError(prev => ({
                            ...prev,
                            isAlert: true,
                            message: "User is anuathorized",
                            status: "Failed"
                          }))
                        }}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {(!productsData.isError && !productsData.isPending && pageInfo?.totalPages) ? (
                <div className='flex items-center justify-center border w-[150px] h-[40px] mt-8'>
                  <button className={`border-r-2 h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white disabled:bg-blue-400 disabled:text-white`} disabled={filterProduct.page <= 1 ? 1 : 0} onClick={() => setFilterProduct({ ...filterProduct, page: filterProduct.page <= 1 ? filterProduct.page : filterProduct.page - 1 })}>{"<<"}</button>
                  <p className='border-r-2 h-full w-full flex items-center justify-center bg-gray-300'>{`${filterProduct.page}/${pageInfo.totalPages}`}</p>
                  <button className='h-full w-full flex items-center justify-center hover:bg-blue-500 hover:text-white' onClick={() => setFilterProduct({ ...filterProduct, page: filterProduct.page >= pageInfo.totalPages ? filterProduct.page : filterProduct.page + 1 })} disabled={filterProduct.page >= pageInfo.totalPages ? 1 : 0}>{">>"}</button>
                </div>
              ) : (<div className='py-16'>No products found!</div>)}
            </div>
            {showDetails && <ShowProductWindow product={showDetails} setShowDetails={setShowDetails} />}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}


