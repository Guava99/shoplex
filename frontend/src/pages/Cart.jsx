import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, updateCartItemSize, navigate, formatPrice } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-5 border-b border-[var(--border)] text-[var(--ink-soft)] flex flex-col gap-4 sm:grid sm:grid-cols-[4fr_2fr_0.5fr] sm:items-center page-transition'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded-lg object-cover border border-[var(--border)]' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-sm sm:text-base font-bold text-[var(--ink)]'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-[var(--accent)] font-extrabold'>{currency}{formatPrice(productData.price)}</p>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-[var(--ink-muted)]'>Size:</span>
                        <select
                          onChange={(e) => updateCartItemSize(item._id, item.size, e.target.value)}
                          className='px-2.5 py-1.5 border border-[var(--border)] bg-white rounded text-[var(--ink-soft)] text-xs sm:text-sm focus:outline-none focus:border-[var(--ink)]'
                          value={item.size}
                        >
                          {productData.sizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between sm:justify-start sm:gap-6 w-full'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs text-[var(--ink-muted)] uppercase tracking-wider font-bold sm:hidden'>Quantity:</span>
                    <input 
                      onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                      className='border border-[var(--border)] rounded max-w-16 sm:max-w-20 px-2.5 py-1.5 focus:outline-none focus:border-[var(--ink)] text-sm' 
                      type="number" 
                      min={1} 
                      defaultValue={item.quantity} 
                    />
                  </div>
                  <button 
                    onClick={() => updateQuantity(item._id, item.size, 0)} 
                    className='p-2 rounded hover:bg-[var(--error-soft)] hover:text-[var(--error)] text-[var(--ink-muted)] transition-colors sm:mr-4'
                    title="Remove Item"
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                  </button>
                </div>
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button 
              onClick={() => navigate('/place-order')} 
              className='btn-primary w-full sm:w-auto mt-6 uppercase tracking-wider py-4'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
