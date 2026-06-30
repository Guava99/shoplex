import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { LucideHeart, LucideShoppingBag } from 'lucide-react'

const ProductItem = (props) => {
  const { image, name, price, sizes, stock } = props;
  const id = props.id || props._id || props.item?._id || props.item?.id;

  const { currency, addToCart, formatPrice, toggleWishlist, wishlist } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState('');
  const [showSizes, setShowSizes] = useState(false);

  const isWishlisted = wishlist && wishlist.find(item => item && item._id && item._id.toString() === id?.toString());

  const handleSizeSelect = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  const handleCloseSizes = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSizes(false);
    setSelectedSize('');
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id || !image || !name || !price) {
      console.error('Missing required product data');
      return;
    }

    if (!selectedSize && sizes?.length > 0) {
      setShowSizes(true);
      return;
    }

    try {
      const size = selectedSize || sizes?.[0] || 'M';
      if (stock === 0) return;
      await addToCart(id, size);
      setShowSizes(false);
      setSelectedSize('');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  return (
    <div className='group relative h-full flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[var(--border-strong)] transition-all duration-300'>
      <Link onClick={() => { try { window.scrollTo(0, 0) } catch (e) { } }} to={`/product/${id}`} className='flex flex-col h-full'>
        {/* Product Image Container */}
        <div className='relative overflow-hidden aspect-[4/5] bg-[var(--surface-elevated)]'>
          <img
            className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
            src={image?.[0] || '/placeholder.jpg'}
            alt={name || 'Product'}
            loading="lazy"
          />
          <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

          {/* New / Sale / Out of Stock Badge */}
          <div className='absolute top-3 left-3'>
            {stock === 0 ? (
              <span className='bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm'>
                Sold Out
              </span>
            ) : stock !== undefined && stock <= 5 ? (
              <span className='bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm'>
                Only {stock} left
              </span>
            ) : (
              <span className='bg-[var(--accent)] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm'>
                New
              </span>
            )}
          </div>
          {/* Out of stock overlay */}
          {stock === 0 && (
            <div className='absolute inset-0 bg-white/60 flex items-center justify-center z-[1]'>
              <span className='text-sm font-bold text-[var(--ink-muted)] uppercase tracking-wider'>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className='p-4 flex-1 flex flex-col justify-between bg-[var(--surface)]'>
          <div>
            <h3 className='font-bold text-[var(--ink)] text-sm sm:text-base line-clamp-2 hover:text-[var(--accent)] transition-colors duration-200'>
              {name}
            </h3>
            {/* Swatches Container - Slide-open animation on hover */}
            <div className='flex flex-col gap-2 overflow-hidden max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300 ease-out'>
              {/* Color dots */}
              <div className='flex items-center gap-1.5'>
                <span className='text-[9px] text-[var(--ink-muted)] font-bold uppercase tracking-wider mr-1'>Colors:</span>
                <span className='w-2.5 h-2.5 rounded-full bg-[#1a1a2e] border border-white/20 shadow-xs cursor-pointer hover:scale-110 transition-transform'></span>
                <span className='w-2.5 h-2.5 rounded-full bg-[#e85d4a] border border-white/20 shadow-xs cursor-pointer hover:scale-110 transition-transform'></span>
                <span className='w-2.5 h-2.5 rounded-full bg-[#c8a96e] border border-white/20 shadow-xs cursor-pointer hover:scale-110 transition-transform'></span>
                <span className='w-2.5 h-2.5 rounded-full bg-[#faf8f5] border border-[var(--border-strong)] shadow-xs cursor-pointer hover:scale-110 transition-transform'></span>
              </div>
              
              {/* Size chips */}
              {sizes && sizes.length > 0 && (
                <div className='flex items-center gap-1 flex-wrap'>
                  <span className='text-[9px] text-[var(--ink-muted)] font-bold uppercase tracking-wider mr-1'>Sizes:</span>
                  {sizes.slice(0, 4).map(s => (
                    <span key={s} className='px-1.5 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded text-[9px] font-bold text-[var(--ink-soft)] uppercase'>{s}</span>
                  ))}
                  {sizes.length > 4 && <span className='text-[9px] text-[var(--ink-muted)] font-bold'>+{sizes.length - 4}</span>}
                </div>
              )}
            </div>
            
            {/* Standard display when not hovered */}
            <p className='text-[10px] text-[var(--ink-muted)] font-semibold uppercase tracking-wider mt-1.5 group-hover:hidden'>
              New Season Essentials
            </p>
          </div>
          
          <div className='mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2'>
            <p className='text-base sm:text-lg font-bold text-[var(--accent)]'>
              {currency}{formatPrice(price)}
            </p>
            {/* Rating */}
            <div className='flex items-center gap-1 bg-[var(--gold-soft)] px-2 py-0.5 rounded text-[var(--gold)] text-xs font-bold'>
              <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 20 20'>
                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
              </svg>
              <span>4.5</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Floating Action Buttons */}
      <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0 z-10'>
        <button
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            toggleWishlist(id); 
          }}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm border ${
            isWishlisted 
              ? 'bg-[var(--accent)] text-white border-[var(--accent)]' 
              : 'bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--accent)] border-[var(--border)]'
          }`}
        >
          <LucideHeart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={handleAddToCart}
          className='w-9 h-9 bg-[var(--ink)] text-[var(--surface)] rounded-lg flex items-center justify-center hover:bg-[var(--accent)] hover:text-white hover:scale-105 shadow-sm transition-all duration-200'
        >
          <LucideShoppingBag size={16} />
        </button>
      </div>

      {/* Size Selector Overlay */}
      {showSizes && sizes?.length > 0 && (
        <div className='absolute inset-2 bg-[var(--surface)] rounded-xl p-5 z-20 flex flex-col justify-between border-2 border-[var(--border-strong)] shadow-2xl animate-fade-in-up'>
          <div>
            <p className='text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider mb-3.5'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeSelect(e, size)}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg border-2 transition-all duration-150 active:scale-95 ${
                    selectedSize === size
                      ? 'bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)] shadow-md scale-105'
                      : 'border-[var(--border)] text-[var(--ink)] bg-[var(--surface-elevated)] hover:border-[var(--ink-muted)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className='flex gap-2 mt-4 pt-3 border-t border-[var(--border)]'>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className='flex-1 h-10 bg-[var(--ink)] text-[var(--surface)] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm'
            >
              Confirm
            </button>
            <button
              onClick={handleCloseSizes}
              className='w-10 h-10 flex items-center justify-center bg-[var(--surface-elevated)] border border-[var(--border-strong)] text-[var(--ink)] rounded-xl hover:text-[var(--accent)] hover:border-[var(--accent-muted)] transition-all duration-150'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductItem
