import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backendUrl, currency } from '../../App'
import { toast } from 'react-toastify'
import { Search, Trash2, Edit, Plus, Package } from 'lucide-react'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='animate-fade-in-up p-2'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-2'>
            <Package className='text-amber-600' /> Product Inventory
          </h1>
          <p className='text-gray-500 mt-1'>Manage your store's catalog ({list.length} items)</p>
        </div>

        <div className='flex gap-3'>
          <div className='relative group'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors' size={20} />
            <input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all w-full md:w-64 shadow-sm'
            />
          </div>
          <Link to='/admin/add' className='bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg active:scale-95'>
            <Plus size={20} /> <span className="hidden sm:inline">Add Product</span>
          </Link>
        </div>
      </div>

      <div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
        {/* ------- Table Header ---------- */}
        <div className='hidden md:grid grid-cols-[0.8fr_2.2fr_1fr_0.8fr_0.8fr_0.8fr] items-center bg-gray-50 border-b border-gray-100 p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
          <span>Image</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* ------ Product List ------ */}
        <div className='divide-y divide-gray-100'>
          {filteredList.map((item, index) => (
            <div key={index} className='group hover:bg-gray-50 transition-colors'>
              {/* Desktop View */}
              <div className='hidden md:grid grid-cols-[0.8fr_2.2fr_1fr_0.8fr_0.8fr_0.8fr] items-center gap-4 p-4'>
                <div className='flex items-center justify-center'>
                  <div className='relative overflow-hidden rounded-xl border border-gray-200 group-hover:border-amber-200 transition-colors shadow-sm w-16 h-16'>
                    <img className='w-full h-full object-cover' src={item.image[0]} alt={item.name} />
                  </div>
                </div>

                <div>
                  <p className='font-bold text-gray-800 group-hover:text-amber-700 transition-colors text-sm sm:text-base'>{item.name}</p>
                  <p className='text-xs text-gray-500 line-clamp-1 italic mt-0.5'>{item.description}</p>
                </div>

                <div>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200'>
                    {item.category}
                  </span>
                </div>

                <div>
                  {item.stock === 0 ? (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200'>
                      Out
                    </span>
                  ) : item.stock <= 5 ? (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'>
                      {item.stock} Left
                    </span>
                  ) : (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200'>
                      {item.stock}
                    </span>
                  )}
                </div>

                <div>
                  <p className='text-sm font-bold text-gray-700 font-mono'>{currency}{item.price}</p>
                </div>

                <div className='flex justify-center gap-2'>
                  <Link
                    to={`/admin/edit/${item._id}`}
                    className='p-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:border-amber-300 hover:text-amber-600 hover:shadow-sm transition-all'
                    title='Edit Product'
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='p-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:border-red-300 hover:text-red-600 hover:shadow-sm transition-all'
                    title='Delete Product'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className='md:hidden p-4 flex gap-4'>
                <div className='w-20 h-20 flex-shrink-0 rounded-xl border border-gray-200 overflow-hidden'>
                  <img className='w-full h-full object-cover' src={item.image[0]} alt={item.name} />
                </div>
                <div className='flex-1 flex flex-col justify-between'>
                  <div>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-bold text-gray-800 line-clamp-1'>{item.name}</h3>
                      <p className='font-mono font-bold text-amber-600'>{currency}{item.price}</p>
                    </div>
                    <p className='text-xs text-gray-500 mt-1 line-clamp-1'>{item.description}</p>
                    <div className='flex items-center gap-2 mt-2'>
                      <span className='inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-widest'>
                        {item.category}
                      </span>
                      {item.stock === 0 ? (
                        <span className='inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 uppercase tracking-wider'>
                          Out of Stock
                        </span>
                      ) : item.stock <= 5 ? (
                        <span className='inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-600 uppercase tracking-wider animate-pulse'>
                          {item.stock} Left
                        </span>
                      ) : (
                        <span className='inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-600 uppercase tracking-wider'>
                          Stock: {item.stock}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-end gap-3 mt-3'>
                    <Link to={`/admin/edit/${item._id}`} className='text-sm font-medium text-amber-600 flex items-center gap-1'>
                      <Edit size={14} /> Edit
                    </Link>
                    <button onClick={() => removeProduct(item._id)} className='text-sm font-medium text-red-500 flex items-center gap-1'>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredList.length === 0 && (
          <div className='text-center py-20 bg-white'>
            <div className='col-span-full'>
              <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100'>
                <Package className='text-gray-300' size={32} />
              </div>
              <p className='text-gray-800 text-xl font-bold mb-2'>No products found</p>
              <p className='text-gray-500'>
                {searchTerm ? `No results for "${searchTerm}"` : 'Add your first product to get started'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List