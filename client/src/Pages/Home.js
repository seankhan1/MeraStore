import { useDispatch, useSelector } from 'react-redux'
import AlertComponent from '../Components/AlertComponent'
import CarouselComponent from '../Components/Home/Carousel'
import Categories from '../Components/Home/Categories'
import Navbar from '../Components/Navbar'
import { useEffect, useState } from 'react'
import { alertReset } from '../store/Slices/users.slices'
import { fetchWish } from '../store/Slices/wishlist.slice'
import Footer from '../Components/Footer'
import { fetchCart } from '../store/Slices/cart.slice'

export default function Home() {
  const categories = useSelector(state => state.categories)
  const users = useSelector(state => state.users)
  const wishlist = useSelector(state => state.wishlist)
  const [error, setError] = useState({
    status: null, message: null, isAlert: false
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (users.isAlert) {
      setError(prev => ({
        ...prev,
        isAlert: true,
        message: users.message,
        status: users.status
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
    return () => dispatch(alertReset())
  }, [users, categories, wishlist])

  return (
    <div>
      <Navbar />
      {error.isAlert && <AlertComponent status={error.status} message={error.message} />}
      <CarouselComponent />
      <div className='max-w-[1400px] m-auto px-8 my-12'>
        <Categories />
      </div>
      <Footer />
    </div>
  )
}
