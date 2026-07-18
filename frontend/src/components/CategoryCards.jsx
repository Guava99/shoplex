import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import categoryMen from '../assets/category_men.png'
import categoryWomen from '../assets/category_women.png'
import categoryKids from '../assets/category_kids.png'
import { LucideArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Men',
    label: "Men's Collection",
    subtitle: 'Refined essentials for the modern man',
    image: categoryMen,
    itemCount: '200+ styles',
    accent: 'from-stone-900/80',
  },
  {
    name: 'Women',
    label: "Women's Collection",
    subtitle: 'Elegant pieces for every occasion',
    image: categoryWomen,
    itemCount: '250+ styles',
    accent: 'from-rose-900/70',
  },
  {
    name: 'Kids',
    label: "Kids' Collection",
    subtitle: 'Fun, colorful & comfortable fits',
    image: categoryKids,
    itemCount: '100+ styles',
    accent: 'from-amber-900/70',
  },
]

const CategoryCards = () => {
  const { navigate } = useContext(ShopContext)

  const handleNavigate = (categoryName) => {
    navigate('/collection')
    // Use a slight delay so the Collection page mounts first, then we can set the filter
    setTimeout(() => {
      // Dispatch a custom event so Collection page can pick it up
      window.dispatchEvent(new CustomEvent('setCategory', { detail: categoryName }))
    }, 100)
  }

  return (
    <div className='my-12 sm:my-16 px-4 sm:px-0 animate-fade-in-up'>
      {/* Section Header */}
      <div className='text-center mb-8 sm:mb-10'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2'>Shop by Category</p>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight'>
          Find Your <span className='font-editorial italic font-normal text-[var(--accent)] text-4xl sm:text-5xl'>Vibe</span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto'>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleNavigate(cat.name)}
            className='group relative aspect-[3/4] sm:aspect-[2/3] rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer text-left'
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.label}
              className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500`} />

            {/* Dark bottom gradient for text legibility */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />

            {/* Content */}
            <div className='absolute inset-0 flex flex-col justify-end p-6 sm:p-7'>
              {/* Item count badge */}
              <div className='inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 w-fit border border-white/10'>
                {cat.itemCount}
              </div>

              {/* Title */}
              <h3 className='text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-tight mb-1'>
                {cat.label}
              </h3>

              {/* Subtitle */}
              <p className='text-white/70 text-xs sm:text-sm font-medium mb-4'>
                {cat.subtitle}
              </p>

              {/* CTA */}
              <div className='flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300'>
                <span>Explore</span>
                <LucideArrowRight size={14} className='transition-transform duration-300 group-hover:translate-x-1' />
              </div>
            </div>

            {/* Top-right hover indicator */}
            <div className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100'>
              <LucideArrowRight size={16} className='text-white' />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryCards
