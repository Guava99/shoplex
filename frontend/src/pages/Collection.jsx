import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  // Listen for category navigation from CategoryCards on the homepage
  useEffect(() => {
    const handler = (e) => {
      setCategory([e.detail])
    }
    window.addEventListener('setCategory', handler)
    return () => window.removeEventListener('setCategory', handler)
  }, [])

  return (
    <div className='flex flex-col lg:flex-row gap-8 pt-8 mx-4 animate-fade-in-up page-transition'>

      <div className='lg:w-64 flex-shrink-0'>
        <div className='modern-card sticky top-24'>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='w-full flex items-center justify-between p-4 text-left font-semibold text-[var(--ink)] lg:cursor-default'
          >
            <span className='flex items-center gap-2'>
              <svg className='w-5 h-5 text-[var(--accent)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z' />
              </svg>
              Filters
            </span>
            <svg className={`w-5 h-5 lg:hidden transition-transform ${showFilter ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </button>

          <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>

            <div className='p-4 border-b border-[var(--border)]'>
              <h3 className='font-bold text-xs uppercase tracking-wider text-[var(--ink)] mb-4 flex items-center gap-2'>
                <svg className='w-4 h-4 text-[var(--ink-muted)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
                Categories
              </h3>
              <div className='space-y-3'>
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                    <input
                      className='w-4 h-4 text-[var(--accent)] border-[var(--border-strong)] rounded focus:ring-[var(--accent)]'
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                    />
                    <span className='text-sm text-[var(--ink-soft)] group-hover:text-[var(--accent)] transition-colors'>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>


            <div className='p-4'>
              <h3 className='font-bold text-xs uppercase tracking-wider text-[var(--ink)] mb-4 flex items-center gap-2'>
                <svg className='w-4 h-4 text-[var(--ink-muted)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                </svg>
                Product Type
              </h3>
              <div className='space-y-3'>
                {['Topwear', 'Bottomwear', 'Winterwear'].map((subCat) => (
                  <label key={subCat} className='flex items-center gap-3 cursor-pointer group'>
                    <input
                      className='w-4 h-4 text-[var(--accent)] border-[var(--border-strong)] rounded focus:ring-[var(--accent)]'
                      type="checkbox"
                      value={subCat}
                      onChange={toggleSubCategory}
                    />
                    <span className='text-sm text-[var(--ink-soft)] group-hover:text-[var(--accent)] transition-colors'>
                      {subCat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='flex-1 min-w-0'>

        <div className='modern-card mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4'>
            <div>
              <h1 className='font-heading text-2xl font-extrabold text-[var(--ink)] mb-1'>
                Shop Collection
              </h1>
              <p className='text-sm text-[var(--accent)] font-semibold'>
                Discover our curated collection of {filterProducts.length} items
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <label className='text-xs font-bold uppercase tracking-wider text-[var(--ink)]'>Sort by</label>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className='input-field min-w-[160px] py-2 text-sm'
              >
                <option value="relavent">Relevance</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>


        {filterProducts.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                sizes={item.sizes}
                stock={item.stock}
              />
            ))}
          </div>
        ) : (
          <div className='modern-card p-12 text-center'>
            <svg className='w-12 h-12 text-[var(--ink-muted)] mx-auto mb-4 opacity-60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
            </svg>
            <h3 className='text-base font-bold text-[var(--ink)] mb-1'>No products found</h3>
            <p className='text-sm text-[var(--ink-muted)]'>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
