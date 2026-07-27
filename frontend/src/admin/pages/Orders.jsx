import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../../App'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {Authorization: `Bearer ${token}`}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className='p-6 animate-fade-in-up'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold gradient-text mb-2'>Order Management</h1>
        <p className='text-gray-600'>Manage and track all customer orders</p>
      </div>
      
      <div className='space-y-4'>
        {
          orders.map((order, index) => (
            <div className='modern-card grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start' key={index}>
              <div className='flex items-center justify-center'>
                <div className='w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center'>
                  <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                  </svg>
                </div>
              </div>
              
              <div className='space-y-3'>
                <div className='bg-orange-50 rounded-lg p-3'>
                  <h4 className='font-semibold text-amber-800 mb-2'>Order Items:</h4>
                  {order.items.map((item, index) => (
                    <p className='text-sm text-gray-700 py-0.5' key={index}>
                      {item.name} x {item.quantity} {item.size && <span className='text-orange-600'>({item.size})</span>}
                      {index < order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                
                <div className='space-y-1'>
                  <p className='font-semibold text-amber-800 flex items-center gap-2'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className='text-sm text-gray-600 ml-6'>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                    <p className='flex items-center gap-1 mt-1'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                      {order.address.phone}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='badge badge-primary'>{order.items.length} items</span>
                </div>
                <p className='text-sm'><span className='font-medium'>Method:</span> {order.paymentMethod}</p>
                <p className='text-sm flex items-center gap-2'>
                  <span className='font-medium'>Payment:</span>
                  <span className={`badge ${order.payment ? 'badge-success' : 'badge-warning'}`}>
                    {order.payment ? 'Completed' : 'Pending'}
                  </span>
                </p>
                <p className='text-sm'><span className='font-medium'>Date:</span> {new Date(Number(order.date)).toLocaleDateString()}</p>
              </div>
              
              <div className='text-center'>
                <p className='text-2xl font-bold text-amber-800'>{currency}{order.amount}</p>
              </div>
              
              <div>
                <select 
                  onChange={(event)=>statusHandler(event,order.id)} 
                  value={order.status} 
                  className='w-full font-medium'
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders