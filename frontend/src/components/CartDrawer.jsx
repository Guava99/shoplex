import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { EmptyCartCharacter } from './Illustrations'

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setCartOpen, 
    products, 
    currency, 
    cartItems, 
    updateQuantity, 
    updateCartItemSize, 
    navigate, 
    formatPrice,
    getCartAmount 
  } = useContext(ShopContext);

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
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[450px] max-w-[90vw] bg-[var(--surface)] border-l border-[var(--border)] z-[101] shadow-2xl transition-transform duration-350 ease-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--surface-elevated)]'>
          <div>
            <h3 className='font-heading text-lg font-bold text-[var(--ink)] uppercase tracking-wider'>Your Cart</h3>
            <p className='text-xs text-[var(--ink-muted)] mt-0.5'>Review your selection before checkout</p>
          </div>
          <button 
            onClick={() => setCartOpen(false)}
            className='p-2 rounded-lg hover:bg-[var(--surface)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors'
            aria-label="Close cart"
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {(() => {
          const subtotal = getCartAmount();
          const target = 999;
          const remaining = Math.max(0, target - subtotal);
          const percent = Math.min(100, Math.round((subtotal / target) * 100));

          return (
            <div className='px-6 py-3.5 bg-[var(--surface-dark)] text-white border-b border-[var(--ink)] space-y-2'>
              <div className='flex items-center justify-between text-xs font-semibold'>
                {remaining > 0 ? (
                  <span>
                    Add <strong className='text-[var(--gold)] font-bold'>{currency}{formatPrice(remaining)}</strong> more for <span className='text-[var(--accent)] font-bold'>FREE Shipping</span> 🚚
                  </span>
                ) : (
                  <span className='text-emerald-400 font-bold flex items-center gap-1.5'>
                    ✨ You've unlocked FREE Express Shipping!
                  </span>
                )}
                <span className='text-white/60 font-mono text-[11px]'>{percent}%</span>
              </div>
              <div className='w-full h-2 bg-white/15 rounded-full overflow-hidden'>
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    remaining === 0 ? 'bg-emerald-400' : 'bg-gradient-to-r from-[var(--accent)] to-[var(--gold)]'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })()}

        {/* Scrollable Items */}
        <div className='flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar'>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div key={`${item._id}-${item.size}`} className='flex items-start gap-4 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0'>
                  {/* Thumb */}
                  <div className='w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)]'>
                    <img className='w-full h-full object-cover' src={productData.image[0]} alt={productData.name} />
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-sm text-[var(--ink)] line-clamp-1'>{productData.name}</h4>
                    <p className='text-[var(--accent)] font-bold text-sm mt-1'>{currency}{formatPrice(productData.price)}</p>
                    
                    {/* Size and Qty Selector row */}
                    <div className='flex items-center gap-3 mt-2'>
                      <div className='flex items-center gap-1.5'>
                        <span className='text-[10px] text-[var(--ink-muted)] font-bold uppercase'>Size:</span>
                        <select
                          onChange={(e) => updateCartItemSize(item._id, item.size, e.target.value)}
                          className='px-2 py-0.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] rounded text-xs focus:outline-none focus:border-[var(--ink)]'
                          value={item.size}
                        >
                          {productData.sizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>

                      <div className='flex items-center border border-[var(--border)] rounded overflow-hidden bg-[var(--surface)]'>
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                          className='px-2 py-0.5 hover:bg-[var(--surface-elevated)] text-[var(--ink-soft)] text-xs font-bold'
                        >
                          -
                        </button>
                        <span className='px-2 text-xs text-[var(--ink)] font-bold'>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className='px-2 py-0.5 hover:bg-[var(--surface-elevated)] text-[var(--ink-soft)] text-xs font-bold'
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                  <button 
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className='p-1.5 rounded hover:bg-[var(--error-soft)] hover:text-[var(--error)] text-[var(--ink-muted)] transition-colors'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                  </button>
                </div>
              )
            })
          ) : (
            <div className='flex flex-col items-center justify-center py-16 text-center select-none'>
              <EmptyCartCharacter size={140} />
              <h4 className='font-bold text-[var(--ink)] mt-6'>Your cart is empty</h4>
              <p className='text-xs text-[var(--ink-muted)] mt-1.5 max-w-[200px]'>Add some premium clothes to get started!</p>
              <button 
                onClick={() => { setCartOpen(false); navigate('/collection') }}
                className='btn-primary mt-6 text-xs py-2.5 px-6'
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer block */}
        {cartData.length > 0 && (
          <div className='p-6 border-t border-[var(--border)] bg-[var(--surface-elevated)] space-y-4 shadow-sm'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-bold text-[var(--ink-soft)] uppercase tracking-wider text-xs'>Subtotal</span>
              <span className='font-extrabold text-base text-[var(--ink)]'>{currency}{formatPrice(getCartAmount())}</span>
            </div>
            <p className='text-[10px] text-[var(--ink-muted)] leading-normal'>Shipping and taxes calculated at checkout. Free delivery applies on orders above ₹500.</p>
            
            <div className='grid grid-cols-2 gap-3 pt-2'>
              <button 
                onClick={() => { setCartOpen(false); navigate('/cart') }}
                className='btn-secondary w-full py-3.5 text-xs font-bold uppercase tracking-wider bg-[var(--surface)] border-[var(--border)]'
              >
                View Full Cart
              </button>
              <button 
                onClick={() => { setCartOpen(false); navigate('/place-order') }}
                className='btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider'
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
