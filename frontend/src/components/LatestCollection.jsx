import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products])

  return (
    <div id="latest-collection" className='my-16 px-4 sm:px-0 animate-fade-in-up'>
      <div className='text-center py-8'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-full sm:w-2/3 lg:w-1/2 m-auto text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed mt-2'>
          Explore our newest arrivals featuring the latest trends in fashion. Fresh styles added regularly to keep your wardrobe updated.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8 mt-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} sizes={item.sizes} stock={item.stock} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
