import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import SocialProof from '../components/SocialProof';
import FitFinder from '../components/FitFinder';
import SizeChartModal from '../components/SizeChartModal';
import PincodeChecker from '../components/PincodeChecker';
import { LucideHeart, LucideMove3d, LucideImage, LucideShoppingBag, LucideStar, LucideMessageSquare, LucideRuler } from 'lucide-react';
import ThreeSixtyViewer from '../components/ThreeSixtyViewer';
import axios from 'axios';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, wishlist, toggleWishlist, formatPrice, backendUrl, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [show360, setShow360] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showFitFinder, setShowFitFinder] = useState(false)
  const [showSizeChart, setShowSizeChart] = useState(false)

  const isWishlisted = wishlist && wishlist.find(item => item && item._id && item._id.toString() === productId?.toString())

  const fetchProductData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId });
      if (response.data.success) {
        setProductData(response.data.product);
        setImage(response.data.product.image[0]);
      }
    } catch (error) {
      console.error('Error fetching product detail:', error);
      const product = products.find((item) => String(item._id) === String(productId));
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to leave a review');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(backendUrl + '/api/product/review',
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success('Review added successfully!');
        setComment('');
        fetchProductData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 mx-4 page-transition'>

      {/* Main Product Info Section */}
      <div className='flex gap-8 sm:gap-12 flex-col lg:flex-row'>

        {/* Left Side: Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full no-scrollbar'>
            {
              productData.image.map((item, index) => (
                <img 
                  onClick={() => { setImage(item); setShow360(false); }} 
                  src={item} 
                  key={index} 
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border rounded-lg transition-all duration-200 ${image === item && !show360 ? 'border-[var(--ink)] p-0.5 scale-102 shadow-sm' : 'border-[var(--border)] opacity-80 hover:opacity-100'}`} 
                  alt="" 
                />
              ))
            }
            {/* 360 viewer option */}
            <div
              onClick={() => setShow360(!show360)}
              className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer aspect-square rounded-lg flex flex-col items-center justify-center gap-1 border transition-all ${show360 ? 'border-[var(--ink)] bg-[var(--surface-elevated)]' : 'border-dashed border-[var(--border-strong)] hover:border-[var(--ink)]'}`}
            >
              <LucideMove3d className={`${show360 ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)]'}`} />
              <span className='text-[10px] font-bold text-[var(--ink-soft)] uppercase'>360°</span>
            </div>
          </div>

          {/* Main Display Image */}
          <div className='w-full sm:w-[80%]'>
            {show360 ? (
              <ThreeSixtyViewer images={productData.threeSixtyImages && productData.threeSixtyImages.length > 0 ? productData.threeSixtyImages : productData.image} />
            ) : (
              <div className='relative group overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm'>
                <img className='w-full h-auto transform transition-transform duration-700 group-hover:scale-105' src={image} alt="" />
                <div className='absolute bottom-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white'>
                  <LucideImage className='text-[var(--ink)]' size={20} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className='flex-1 flex flex-col gap-6 lg:pl-6'>
          <div>
            <h1 className='text-3xl font-semibold font-heading tracking-tight text-[var(--ink)] mb-2'>{productData.name}</h1>
            
            <div className='flex items-center gap-2 mt-3'>
              <div className='flex gap-0.5'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <LucideStar
                    key={star}
                    size={16}
                    className={star <= Math.round(productData.averageRating || 0) ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-[var(--border-strong)]'}
                  />
                ))}
              </div>
              <p className='text-xs text-[var(--ink-muted)] font-medium ml-1'>
                {productData.reviews?.length || 0} reviews
              </p>
            </div>
          </div>

          <div className='flex items-baseline gap-3 mt-1'>
            <span className='text-3xl font-bold text-[var(--ink)]'>{currency}{formatPrice(productData.price)}</span>
            {productData.originalPrice && (
              <span className='text-xl text-[var(--ink-muted)] line-through font-medium'>
                {currency}{formatPrice(productData.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {productData.stock !== undefined && (
            <div className='mt-1'>
              {productData.stock === 0 ? (
                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full border border-red-100'>
                  <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                  Out of Stock
                </span>
              ) : productData.stock <= 5 ? (
                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-100 animate-pulse'>
                  <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' /></svg>
                  Only {productData.stock} left!
                </span>
              ) : null}
            </div>
          )}

          {/* Social proof widgets */}
          <SocialProof productId={productData._id} />

          <p className='text-[var(--ink-soft)] leading-relaxed text-sm sm:text-base border-t border-[var(--border)] pt-5'>
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className='flex flex-col gap-3.5 my-2'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-xs uppercase tracking-wider text-[var(--ink)]'>
                Select Size
              </p>
              <div className='flex items-center gap-3'>
                <button 
                  onClick={() => setShowSizeChart(true)}
                  className='text-xs text-[var(--ink)] font-bold hover:underline flex items-center gap-1 transition-colors'
                >
                  <LucideRuler size={14} className='text-[var(--accent)]' />
                  Size Chart
                </button>
                <span className='text-[var(--border-strong)]'>|</span>
                <button 
                  onClick={() => setShowFitFinder(true)}
                  className='text-xs text-[var(--accent)] font-semibold hover:underline flex items-center gap-1.5 transition-colors'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                  </svg>
                  Find your fit
                </button>
              </div>
            </div>
            <div className='flex gap-2.5 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`w-12 h-12 rounded-full border text-xs font-semibold uppercase transition-all duration-200 active:scale-95 ${item === size
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-white shadow-sm scale-105'
                    : 'border-[var(--border)] bg-transparent text-[var(--ink-soft)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart & Wishlist */}
          <div className='flex items-center gap-4 mt-2'>
            <button
              disabled={productData.stock === 0}
              onClick={async () => {
                try {
                  if (!size) {
                    toast.error('Please select a size first');
                    return;
                  }
                  await addToCart(productData._id, size);
                } catch (error) {
                  console.error('Failed to add to cart:', error);
                  toast.error('Failed to add item to cart');
                }
              }}
              className={`h-14 rounded-full text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 flex-1 min-w-[200px] transition-colors ${productData.stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'btn-primary hover:bg-[var(--accent-hover)]'}`}
            >
              <LucideShoppingBag size={18} />
              {productData.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(productData._id)}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-90 ${isWishlisted 
                ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-soft)]/80' 
                : 'bg-transparent border-[var(--border)] text-[var(--ink-soft)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)]'}`}
            >
              <LucideHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Pincode & Delivery Serviceability Checker */}
          <div className='mt-2'>
            <PincodeChecker />
          </div>

          {/* Shoplex Promise List */}
          <div className='border-t border-[var(--border)] pt-6 mt-4 flex flex-col gap-4 text-xs text-[var(--ink-soft)] font-medium'>
            <div className='flex items-center gap-3.5'>
              <div className='w-9 h-9 rounded-full bg-[var(--success-soft)] text-[var(--success)] flex items-center justify-center flex-shrink-0'>
                <svg className='w-4.5 h-4.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
              </div>
              <div>
                <p className='text-[var(--ink)] font-semibold'>100% Original & Quality Assured</p>
                <p className='text-[var(--ink-muted)] text-[10px] mt-0.5'>Directly sourced from certified brands</p>
              </div>
            </div>
            <div className='flex items-center gap-3.5'>
              <div className='w-9 h-9 rounded-full bg-[var(--gold-soft)] text-[var(--gold)] flex items-center justify-center flex-shrink-0'>
                <svg className='w-4.5 h-4.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                </svg>
              </div>
              <div>
                <p className='text-[var(--ink)] font-semibold'>Complimentary Delivery</p>
                <p className='text-[var(--ink-muted)] text-[10px] mt-0.5'>Free shipping on orders above ₹999</p>
              </div>
            </div>
            <div className='flex items-center gap-3.5'>
              <div className='w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center flex-shrink-0'>
                <svg className='w-4.5 h-4.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                </svg>
              </div>
              <div>
                <p className='text-[var(--ink)] font-semibold'>Hassle-Free Returns</p>
                <p className='text-[var(--ink-muted)] text-[10px] mt-0.5'>Easy 30-day return policy for ultimate peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Specs & Reviews Section */}
      <div className='mt-16 border-t border-[var(--border)] pt-12'>
        <div className='flex gap-8 border-b border-[var(--border)] mb-8'>
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 -mb-[2px] ${activeTab === 'description' ? 'text-[var(--ink)] border-[var(--ink)]' : 'text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]'}`}
          >
            Product Specs & Overview
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 -mb-[2px] ${activeTab === 'reviews' ? 'text-[var(--ink)] border-[var(--ink)]' : 'text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]'}`}
          >
            Reviews ({productData.reviews?.length || 0})
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='text-[var(--ink-soft)] leading-relaxed text-sm sm:text-base space-y-4'>
              <h3 className='font-bold text-lg text-[var(--ink)]'>About This Garment</h3>
              <p>{productData.description || 'Welcome to Shoplex! Our curated collection brings you the finest quality clothing designed for comfort and style.'}</p>
              <p>Crafted with premium materials and precision stitching to maintain shape, color, and texture even after multiple washes.</p>
            </div>

            {/* Specifications Grid */}
            <div className='bg-[var(--surface-elevated)] p-6 rounded-xl border border-[var(--border)] space-y-4'>
              <h3 className='font-bold text-base text-[var(--ink)] uppercase tracking-wider text-xs'>Product Specifications</h3>
              <div className='grid grid-cols-2 gap-y-3 text-xs'>
                <div>
                  <span className='text-[var(--ink-muted)] block'>Fabric Material</span>
                  <span className='font-bold text-[var(--ink)]'>100% Premium Cotton</span>
                </div>
                <div>
                  <span className='text-[var(--ink-muted)] block'>Fit Type</span>
                  <span className='font-bold text-[var(--ink)]'>Regular / Tailored</span>
                </div>
                <div>
                  <span className='text-[var(--ink-muted)] block'>Neckline / Collar</span>
                  <span className='font-bold text-[var(--ink)]'>Crew Neck / Classic</span>
                </div>
                <div>
                  <span className='text-[var(--ink-muted)] block'>Weave Pattern</span>
                  <span className='font-bold text-[var(--ink)]'>Single Jersey Knit</span>
                </div>
                <div>
                  <span className='text-[var(--ink-muted)] block'>Transparency</span>
                  <span className='font-bold text-[var(--ink)]'>Opaque</span>
                </div>
                <div>
                  <span className='text-[var(--ink-muted)] block'>Wash Care</span>
                  <span className='font-bold text-[var(--ink)]'>Machine Wash Cold</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='max-w-4xl'>
            <div className='mb-10 bg-[var(--surface-elevated)] p-6 rounded-xl border border-[var(--border)]'>
              <h3 className='text-base font-bold text-[var(--ink)] mb-4 flex items-center gap-2'>
                <LucideMessageSquare size={18} className='text-[var(--accent)]' />
                Leave a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className='space-y-4'>
                <div>
                  <label className='block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider mb-1.5'>Rating</label>
                  <div className='flex gap-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setRating(star)}
                        className='transition-transform hover:scale-125 duration-150'
                      >
                        <LucideStar
                          size={22}
                          className={star <= rating ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-[var(--border-strong)]'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className='block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider mb-1.5'>Comment</label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Share your thoughts about this product...'
                    className='w-full p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10 focus:border-[var(--ink)] transition-all text-sm'
                  />
                </div>
                <button
                  disabled={submitting}
                  type='submit'
                  className='btn-primary py-3 px-8 text-xs font-bold uppercase tracking-wider rounded-full'
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </div>

            <div className='space-y-6'>
              {productData.reviews && productData.reviews.length > 0 ? (
                productData.reviews.map((rev, index) => (
                  <div key={rev.id || index} className='border-b border-[var(--border)] pb-6 last:border-0'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <p className='font-bold text-[var(--ink)] text-sm sm:text-base'>{rev.userName}</p>
                        <div className='flex gap-0.5 mt-1'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <LucideStar
                              key={star}
                              size={12}
                              className={star <= rev.rating ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-[var(--border-strong)]'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className='text-xs text-[var(--ink-muted)] italic font-medium'>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className='text-sm text-[var(--ink-soft)] leading-relaxed'>{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className='text-center py-10'>
                  <p className='text-[var(--ink-muted)] italic text-sm'>No reviews yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      {/* Modals */}
      <FitFinder 
        isOpen={showFitFinder} 
        onClose={() => setShowFitFinder(false)} 
        onSelectSize={(recommendedSize) => setSize(recommendedSize)}
        availableSizes={productData.sizes || []}
        productCategory={productData.category} 
      />
      <SizeChartModal isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} category={productData.category} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
