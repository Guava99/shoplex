import React, { useState } from 'react';

const ProductFilters = ({ onFilterChange, products }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Men', 'Women', 'Kids'];
  const subCategories = ['Topwear', 'Bottomwear', 'Winterwear'];
  
  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, subCategories: selectedSubCategories, priceRange, sortBy });
  };

  const handleSubCategoryToggle = (subCategory) => {
    const newSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter(s => s !== subCategory)
      : [...selectedSubCategories, subCategory];
    setSelectedSubCategories(newSubCategories);
    onFilterChange({ categories: selectedCategories, subCategories: newSubCategories, priceRange, sortBy });
  };

  const handlePriceChange = (value) => {
    const newRange = [0, parseInt(value)];
    setPriceRange(newRange);
    onFilterChange({ categories: selectedCategories, subCategories: selectedSubCategories, priceRange: newRange, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ categories: selectedCategories, subCategories: selectedSubCategories, priceRange, sortBy: value });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setPriceRange([0, 10000]);
    setSortBy('relevant');
    onFilterChange({ categories: [], subCategories: [], priceRange: [0, 10000], sortBy: 'relevant' });
  };

  const activeFilterCount = selectedCategories.length + selectedSubCategories.length + (priceRange[1] < 10000 ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className='lg:hidden mb-4'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='btn-secondary w-full flex items-center justify-center gap-2'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className='bg-indigo-500 text-white text-xs px-2 py-1 rounded-full'>{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <div className='card p-6 space-y-6 sticky top-24'>
          {/* Header */}
          <div className='flex items-center justify-between pb-4 border-b border-gray-100'>
            <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
              <svg className='w-5 h-5 text-indigo-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' />
              </svg>
              Filters
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className='text-sm text-indigo-600 hover:text-indigo-800 font-semibold'
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort By */}
          <div>
            <label className='text-sm font-semibold text-gray-700 mb-3 block'>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className='input-field text-sm'
            >
              <option value='relevant'>Most Relevant</option>
              <option value='low-high'>Price: Low to High</option>
              <option value='high-low'>Price: High to Low</option>
              <option value='newest'>Newest First</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className='text-sm font-semibold text-gray-700 mb-3 block'>
              Price Range
            </label>
            <div className='space-y-4'>
              <input
                type='range'
                min='0'
                max='10000'
                step='100'
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e.target.value)}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500'
              />
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>₹0</span>
                <span className='text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-lg'>
                  ₹{priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className='text-sm font-semibold text-gray-700 mb-3 block'>
              Categories
            </label>
            <div className='space-y-2'>
              {categories.map((category) => (
                <label
                  key={category}
                  className='flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <input
                    type='checkbox'
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer'
                  />
                  <span className='text-gray-700 group-hover:text-gray-900 font-medium'>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub Categories */}
          <div>
            <label className='text-sm font-semibold text-gray-700 mb-3 block'>
              Type
            </label>
            <div className='space-y-2'>
              {subCategories.map((subCategory) => (
                <label
                  key={subCategory}
                  className='flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <input
                    type='checkbox'
                    checked={selectedSubCategories.includes(subCategory)}
                    onChange={() => handleSubCategoryToggle(subCategory)}
                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer'
                  />
                  <span className='text-gray-700 group-hover:text-gray-900 font-medium'>{subCategory}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className='pt-4 border-t border-gray-100'>
              <div className='text-sm font-semibold text-gray-700 mb-2'>Active Filters:</div>
              <div className='flex flex-wrap gap-2'>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className='bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1'
                  >
                    {cat}
                    <button onClick={() => handleCategoryToggle(cat)} className='hover:text-indigo-900'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </span>
                ))}
                {selectedSubCategories.map((sub) => (
                  <span
                    key={sub}
                    className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1'
                  >
                    {sub}
                    <button onClick={() => handleSubCategoryToggle(sub)} className='hover:text-purple-900'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
