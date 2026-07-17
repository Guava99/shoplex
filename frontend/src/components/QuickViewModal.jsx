import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const { currency, formatPrice, addToCart, toggleWishlist, wishlist } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.find(item => item && item._id === product._id);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Please select a size');
      return;
    }
    addToCart(product._id, selectedSize || 'M');
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 fade-in'>
      <div className='relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl slide-up'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors'
        >
          <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        <div className='grid md:grid-cols-2 gap-8 p-8 overflow-y-auto max-h-[90vh]'>
          {/* Left - Images */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div className='relative aspect-square bg-gray-100 rounded-2xl overflow-hidden'>
              <img
                src={product.image[selectedImage]}
                alt={product.name}
                className='w-full h-full object-cover'
              />
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm flex items-center justify-center transition-all ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
                }`}
              >
                <svg className='w-6 h-6' fill={isWishlisted ? 'currentColor' : 'none'} stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className='grid grid-cols-4 gap-2'>
              {product.image.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedImage ? 'border-indigo-500 scale-105' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className='space-y-6'>
            {/* Category Badge */}
            <div className='flex items-center gap-2'>
              <span className='bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold'>
                {product.category}
              </span>
              <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold'>
                {product.subCategory}
              </span>
              {product.bestseller && (
                <span className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
                  <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  Bestseller
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className='text-3xl font-bold text-gray-900'>{product.name}</h2>

            {/* Rating */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className='w-5 h-5 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <span className='text-gray-600 text-sm'>(4.9/5 • 156 reviews)</span>
            </div>

            {/* Price */}
            <div className='flex items-baseline gap-3'>
              <span className='text-4xl font-bold gradient-text'>{currency}{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className='text-xl text-gray-400 line-through'>{currency}{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Description */}
            <p className='text-gray-600 leading-relaxed'>{product.description}</p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className='text-sm font-semibold text-gray-700 mb-3 block'>Select Size:</label>
                <div className='flex gap-2'>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className='space-y-3 pt-4'>
              <button onClick={handleAddToCart} className='btn-primary w-full py-4 text-lg'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
                Add to Cart
              </button>
              <button
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  onClose();
                }}
                className='btn-secondary w-full py-4 text-lg'
              >
                View Full Details
              </button>
            </div>

            {/* Features */}
            <div className='grid grid-cols-2 gap-4 pt-4 border-t border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                  <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <div>
                  <div className='font-semibold text-sm text-gray-900'>Free Shipping</div>
                  <div className='text-xs text-gray-600'>On orders over ₹500</div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                  </svg>
                </div>
                <div>
                  <div className='font-semibold text-sm text-gray-900'>Easy Returns</div>
                  <div className='text-xs text-gray-600'>7 days return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
