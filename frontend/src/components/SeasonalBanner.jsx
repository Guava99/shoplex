import React from 'react'
import { FashionCharacter } from './Illustrations'

const SeasonalBanner = () => {
  return (
    <div className='my-12 mx-4 sm:mx-0'>
      <div className='relative bg-[var(--surface-dark)] text-white rounded-2xl p-8 sm:p-12 overflow-hidden border border-[var(--ink)] shadow-lg'>
        {/* Decorative subtle ambient lights */}
        <div className='absolute -top-24 -left-24 w-60 h-60 bg-[var(--accent)] rounded-full filter blur-[80px] opacity-25'></div>
        <div className='absolute -bottom-24 -right-24 w-60 h-60 bg-[var(--gold)] rounded-full filter blur-[80px] opacity-25'></div>

        <div className='relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center max-w-5xl mx-auto'>
          <div className='text-left space-y-6'>
            <div className='inline-flex items-center gap-2 bg-[var(--accent)] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm'>
              🏷️ Limited Edition
            </div>
            
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white'>
              Cozy Autumn <br />
              <span className='font-editorial italic font-normal text-[var(--accent)] capitalize text-4xl sm:text-5xl lg:text-6xl'>Essentials</span>
            </h2>
            
            <p className='text-sm sm:text-base text-white/70 leading-relaxed max-w-xl'>
              Embrace the transition of seasons with our new knitwear, jackets, and thermal wear collection. Perfect for those crisp morning walks and cozy fireside evenings.
            </p>
            
            <div className='flex flex-wrap gap-4 items-center pt-2'>
              <button 
                onClick={() => {
                  const el = document.getElementById('latest-collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className='btn-accent px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg'
              >
                Explore Collection
              </button>
              <div className='border border-[var(--border-strong)] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider text-[var(--gold)] uppercase bg-[var(--surface-dark)]'>
                ✨ Save up to 30% OFF
              </div>
            </div>
          </div>
          
          {/* Elegant cartoon illustration on the right */}
          <div className='flex justify-center md:justify-end select-none relative'>
            <div className='relative bg-[var(--surface)] p-4 rounded-xl border border-[var(--border-strong)] shadow-md animate-float'>
              <FashionCharacter size={150} />
            </div>
            {/* Tiny stars floating around */}
            <div className='absolute -top-4 right-4 text-xl animate-gentle-pulse'>✨</div>
            <div className='absolute -bottom-2 -left-4 text-lg animate-wiggle'>🍁</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonalBanner