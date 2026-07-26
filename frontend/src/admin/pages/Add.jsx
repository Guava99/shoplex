import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [stock, setStock] = useState("50");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("stock", stock)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setStock('50')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className='p-6 animate-fade-in-up'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold gradient-text mb-2'>Add New Product</h1>
        <p className='text-gray-600'>Create and add new products to your inventory</p>
      </div>

      <div className='modern-card max-w-4xl'>

        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-8'>
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-4'>
              <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <h3 className='text-lg font-semibold text-amber-800'>Product Images</h3>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[{ img: image1, setImg: setImage1, id: 'image1' },
              { img: image2, setImg: setImage2, id: 'image2' },
              { img: image3, setImg: setImage3, id: 'image3' },
              { img: image4, setImg: setImage4, id: 'image4' }].map((item, index) => (
                <label key={index} htmlFor={item.id} className='cursor-pointer group'>
                  <div className='w-full aspect-square border-2 border-dashed border-orange-200 rounded-xl overflow-hidden hover:border-orange-400 transition-all group-hover:scale-105'>
                    <img
                      className='w-full h-full object-cover'
                      src={!item.img ? assets.upload_area : URL.createObjectURL(item.img)}
                      alt="Upload"
                    />
                  </div>
                  <input onChange={(e) => item.setImg(e.target.files[0])} type="file" id={item.id} hidden />
                </label>
              ))}
            </div>
          </div>



          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
                <label className='font-semibold text-amber-800'>Product Name</label>
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full'
                type="text"
                placeholder='Enter product name'
                required
              />
            </div>

            <div>
              <div className='flex items-center gap-2 mb-3'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                </svg>
                <label className='font-semibold text-amber-800'>Price (₹)</label>
              </div>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className='w-full'
                type="number"
                placeholder='0.00'
                required
              />
            </div>

            <div>
              <div className='flex items-center gap-2 mb-3'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                </svg>
                <label className='font-semibold text-amber-800'>Stock Quantity</label>
              </div>
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                className='w-full'
                type="number"
                placeholder='50'
                required
              />
            </div>
          </div>

          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
              <label className='font-semibold text-amber-800'>Product Description</label>
            </div>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className='w-full min-h-[120px] resize-none'
              placeholder='Describe your product in detail...'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                </svg>
                <label className='font-semibold text-amber-800'>Category</label>
              </div>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-3'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
                <label className='font-semibold text-amber-800'>Sub Category</label>
              </div>
              <select onChange={(e) => setSubCategory(e.target.value)} className='w-full'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          </div>

          <div className='w-full'>
            <div className='flex items-center gap-2 mb-4'>
              <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 10h16M4 14h16M4 18h16' />
              </svg>
              <h3 className='text-lg font-semibold text-amber-800'>Available Sizes</h3>
            </div>
            <div className='flex gap-3 flex-wrap'>
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border-2 ${sizes.includes(size)
                    ? "bg-gradient-to-r from-orange-400 to-amber-400 border-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-white border-gray-300 text-gray-600 hover:border-orange-300 hover:text-orange-600 hover:scale-105"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200'>
            <input
              onChange={() => setBestseller(prev => !prev)}
              checked={bestseller}
              type="checkbox"
              id='bestseller'
              className='w-5 h-5 text-orange-600 rounded focus:ring-orange-500'
            />
            <label className='cursor-pointer font-semibold text-amber-800 flex items-center gap-2' htmlFor="bestseller">
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
              Mark as Bestseller
            </label>
          </div>

          <div className='flex gap-4 pt-4'>
            <button type="submit" className='btn-primary flex items-center gap-2 text-lg px-8 py-3'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg>
              Add Product
            </button>
            <button type="button" className='btn-secondary px-8 py-3'>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Add