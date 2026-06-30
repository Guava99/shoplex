import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div id="best-seller" className='my-16 px-4 sm:px-0 animate-fade-in-up'>
      <div className='text-center py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-full sm:w-2/3 lg:w-1/2 m-auto text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed mt-2'>
          Discover our most-loved products handpicked by customers. These bestselling items combine quality, style, and value.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8 mt-6'>
        {
          bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} sizes={item.sizes} stock={item.stock} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
