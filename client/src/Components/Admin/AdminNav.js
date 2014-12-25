import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNav() {
  return (
      <div className='bg-red-500 text-white py-6'>
          <p className='text-4xl text-center mb-4'>Admin Panel</p>
          <ul className='flex gap-4 justify-center pt-4 border-t-2 border-white'>
              <li> <Link to="/admin">Products</Link></li>
              <li> <Link to="/admin/users">Users</Link></li>
              <li> <Link to="/admin/orders">Orders</Link></li>
          </ul>
    </div>
  )
}
