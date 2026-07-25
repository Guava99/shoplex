import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, ListOrdered, ShoppingBag } from 'lucide-react'

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-4 rounded-l-full transition-all duration-300 font-semibold ${isActive
      ? 'bg-gradient-to-r from-orange-50 to-white text-orange-600 border-r-4 border-orange-500 shadow-[-4px_4px_12px_rgba(245,158,11,0.05)]'
      : 'text-amber-800/70 hover:text-orange-600 hover:bg-orange-50/50'
    }`

  return (
    <div className='w-[18%] min-h-screen bg-white border-r border-orange-200/60 shadow-[4px_0_24px_rgba(139,69,19,0.03)]'>
      <div className='flex flex-col gap-2 pt-10 pl-6 text-[15px]'>
        <div className='mb-8 px-4'>
          <h2 className='text-xs font-bold uppercase tracking-widest text-orange-400 mb-4'>
            Main Menu
          </h2>
        </div>

        <NavLink className={linkClass} to="dashboard">
          <LayoutDashboard size={20} />
          <p className='hidden lg:block'>Dashboard</p>
        </NavLink>

        <NavLink className={linkClass} to="add">
          <PlusCircle size={20} />
          <p className='hidden lg:block'>Add Items</p>
        </NavLink>

        <NavLink className={linkClass} to="list">
          <ListOrdered size={20} />
          <p className='hidden lg:block'>List Items</p>
        </NavLink>

        <NavLink className={linkClass} to="orders">
          <ShoppingBag size={20} />
          <p className='hidden lg:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}


export default Sidebar