import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome to Shoplex</h1>
        <p className='text-gray-600 mb-8'>Your e-commerce platform</p>
        <div className='space-x-4'>
          <Link to='/admin/login' className='bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors inline-block'>
            Admin Dashboard
          </Link>
          <Link to='/' className='bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-block'>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage