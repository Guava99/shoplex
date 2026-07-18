import React, { useState, useEffect } from 'react'
import { LucideTruck, LucidePercent, LucideShieldCheck, LucideX } from 'lucide-react'

const promos = [
  { icon: <LucidePercent size={14} />, text: 'First order? Use code FIRST20 for 20% off', highlight: 'FIRST20' },
  { icon: <LucideTruck size={14} />, text: 'Free express shipping on orders over ₹999', highlight: '₹999' },
  { icon: <LucideShieldCheck size={14} />, text: '100% Authentic Products • Easy 30-Day Returns', highlight: '30-Day' },
]

const PromoBar = () => {
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % promos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [dismissed])

  if (dismissed) return null

  const promo = promos[current]

  return (
    <div className='relative bg-[var(--ink)] text-white overflow-hidden'>
      {/* Subtle animated gradient background */}
      <div className='absolute inset-0 bg-gradient-to-r from-[var(--accent)]/15 via-transparent to-[var(--gold)]/15 animate-shimmer' />

      <div className='relative flex items-center justify-center gap-2.5 py-2 px-8 text-xs sm:text-sm font-medium tracking-wide'>
        {/* Left dots (desktop) */}
        <div className='hidden sm:flex items-center gap-1.5 mr-2'>
          {promos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Promo content */}
        <div className='flex items-center gap-2 transition-opacity duration-300' key={current}>
          <span className='text-[var(--accent)] shrink-0'>{promo.icon}</span>
          <span className='text-white/90'>
            {promo.text.split(promo.highlight).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className='font-bold text-white'>{promo.highlight}</span>}
              </React.Fragment>
            ))}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors'
          aria-label='Dismiss promo bar'
        >
          <LucideX size={14} className='text-white/60 hover:text-white' />
        </button>
      </div>
    </div>
  )
}

export default PromoBar
