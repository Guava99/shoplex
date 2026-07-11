import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { LucideHeartOff, LucideShoppingBag } from 'lucide-react'

const Wishlist = () => {
    const { wishlist, currency, navigate, toggleWishlist } = useContext(ShopContext)

    return (
        <div className='border-t pt-14 animate-fade-in'>
            <div className='text-2xl mb-6'>
                <Title text1={'MY'} text2={'WISHLIST'} />
            </div>

            {wishlist.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
                    {wishlist.map((item, index) => {
                        console.log('Wishlist mapping item:', item);
                        return (
                            <div key={index} className='relative group'>
                                <ProductItem
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    sizes={item.sizes}
                                    stock={item.stock}
                                    item={item}
                                />
                               
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const designId = item.id || item._id;
                                        console.log('Trash clicked for item:', item, 'Extracted ID:', designId);
                                        toggleWishlist(designId);
                                    }}
                                    className='absolute top-2 right-2 p-2 bg-white/80 hover:bg-red-500 hover:text-white text-gray-400 rounded-full shadow-md transition-all z-10'
                                    title="Remove from wishlist"
                                >
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-20 text-center space-y-4'>
                    <div className='bg-amber-50 p-6 rounded-full'>
                        <LucideHeartOff size={48} className='text-amber-300' />
                    </div>
                    <h2 className='text-xl font-medium text-amber-900'>Your wishlist is empty</h2>
                    <p className='text-amber-700 max-w-xs'>
                        Save items you love and they'll show up here! We'll even notify you if the price drops.
                    </p>
                    <button
                        onClick={() => navigate('/collection')}
                        className='flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-full hover:bg-amber-900 transition-all shadow-lg active:scale-95'
                    >
                        <LucideShoppingBag size={18} />
                        Explore Collection
                    </button>
                </div>
            )}
        </div>
    )
}

export default Wishlist
