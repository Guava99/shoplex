import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from '../pages/Add'
import List from '../pages/List'
import Orders from '../pages/Orders'
import Dashboard from '../pages/Dashboard'
import Edit from '../pages/Edit'

const AdminPanel = ({ token, setToken }) => {
  return (
    <div className='min-h-screen bg-[#FDFCFB]'>
      <Navbar setToken={setToken} />
      <div className='flex w-full'>
        <Sidebar />
        <div className='flex-1 p-8 md:p-12'>
          <div className='max-w-6xl mx-auto'>
            <Routes>
              <Route path='dashboard' element={<Dashboard token={token} />} />
              <Route path='add' element={<Add token={token} />} />
              <Route path='list' element={<List token={token} />} />
              <Route path='orders' element={<Orders token={token} />} />
              <Route path='edit/:id' element={<Edit token={token} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AdminPanel