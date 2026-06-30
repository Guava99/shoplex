import React, { useState, useEffect, useCallback } from 'react'
import { assets } from '../assets/assets'
import { ShoppingCharacter } from './Illustrations'
import heroSlide2 from '../assets/hero_slide_2.png'
import heroSlide3 from '../assets/hero_slide_3.png'

const slides = [
  {
    badge: '✨ Curated Fashion Collection',
    heading: <>Discover Your <br /><span className='font-editorial italic font-normal text-[var(--accent)] capitalize text-5xl sm:text-6xl lg:text-7xl'>Perfect Style</span></>,
    description: 'Elevate your everyday wardrobe with our carefully curated collection of premium clothing. Quality materials meet timeless silhouettes.',
    cta: 'Shop New Arrivals',
    ctaAction: 'latest-collection',
    image: assets.hero_img || '/placeholder.jpg',
    imageAlt: 'Elegant fashion collection',
  },
  {
    badge: '🔥 Streetwear Edit',
    heading: <>Urban Style <br /><span className='font-editorial italic font-normal text-[var(--accent)] capitalize text-5xl sm:text-6xl lg:text-7xl'>Redefined</span></>,
    description: 'From city streets to weekend hangouts — discover bold silhouettes and relaxed fits that make a statement without trying too hard.',
    cta: 'Shop Streetwear',
    ctaAction: 'latest-collection',
    image: heroSlide2,
    imageAlt: 'Modern streetwear collection',
  },
  {
    badge: '🏷️ Curated Essentials',
    heading: <>Build Your <br /><span className='font-editorial italic font-normal text-[var(--accent)] capitalize text-5xl sm:text-6xl lg:text-7xl'>Capsule Wardrobe</span></>,
    description: 'Less is more. Invest in quality basics that mix and match effortlessly. Timeless pieces you\'ll reach for every single day.',
    cta: 'Explore Essentials',
    ctaAction: 'latest-collection',
    image: heroSlide3,
    imageAlt: 'Premium capsule wardrobe essentials',
  },
]

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === current) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning, current])

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length)
  }, [current, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length)
  }, [current, goToSlide])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = slides[current]

  return (
    <div className='relative overflow-hidden bg-[var(--surface-elevated)] rounded-2xl my-6 border border-[var(--border)]'>
      {/* Background soft lighting */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-[var(--accent-soft)] rounded-full filter blur-3xl opacity-60'></div>
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--gold-soft)] rounded-full filter blur-3xl opacity-60'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24 z-10'>
        <div className='grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center'>
          {/* Left Content */}
          <div className='text-center lg:text-left space-y-8' key={current}>
            {/* Badge */}
            <div
              className='inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--ink)] px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm animate-fade-in-up'
            >
              <span className='animate-wiggle inline-block'>{slide.badge.split(' ')[0]}</span>
              {slide.badge.split(' ').slice(1).join(' ')}
            </div>

            {/* Main Heading */}
            <h1
              className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--ink)] animate-fade-in-up'
              style={{ animationDelay: '0.1s' }}
            >
              {slide.heading}
            </h1>

            {/* Description */}
            <div className='relative max-w-xl mx-auto lg:mx-0'>
              <p
                className='text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed animate-fade-in-up'
                style={{ animationDelay: '0.2s' }}
              >
                {slide.description}
              </p>
              {/* Cute Cartoon Illustration floating next to text on large screens */}
              <div className='hidden xl:block absolute -right-24 -top-8 animate-float'>
                <ShoppingCharacter size={70} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up'
              style={{ animationDelay: '0.3s' }}
            >
              <button 
                onClick={() => {
                  const el = document.getElementById(slide.ctaAction);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className='btn-primary px-8 py-4 text-base'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
                {slide.cta}
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('our-policy');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className='btn-secondary px-8 py-4 text-base bg-[var(--surface-elevated)]/40 backdrop-blur-sm'
              >
                Why Choose Us
              </button>
            </div>

            {/* Stats */}
            <div className='flex items-center gap-6 sm:gap-10 justify-center lg:justify-start pt-6 border-t border-[var(--border-strong)] max-w-md mx-auto lg:mx-0'>
              <div>
                <div className='text-2xl font-bold text-[var(--ink)]'>10K+</div>
                <div className='text-xs text-[var(--ink-soft)] uppercase tracking-wider font-semibold mt-0.5'>Happy Clients</div>
              </div>
              <div className='w-px h-8 bg-[var(--border-strong)]'></div>
              <div>
                <div className='text-2xl font-bold text-[var(--ink)]'>500+</div>
                <div className='text-xs text-[var(--ink-soft)] uppercase tracking-wider font-semibold mt-0.5'>Styles</div>
              </div>
              <div className='w-px h-8 bg-[var(--border-strong)]'></div>
              <div>
                <div className='text-2xl font-bold text-[var(--accent)]'>4.9★</div>
                <div className='text-xs text-[var(--ink-soft)] uppercase tracking-wider font-semibold mt-0.5'>Reviews</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className='relative flex justify-center items-center'>
            {/* Elegant Image Container */}
            <div className='relative w-full max-w-[420px] aspect-[3/4] rounded-xl overflow-hidden border border-[var(--border-strong)] shadow-md bg-[var(--surface)] group'>
              <img 
                key={current}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in-up' 
                src={slide.image} 
                alt={slide.imageAlt} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[var(--ink)]/30 to-transparent'></div>
            </div>

            {/* Mobile/Tablet float illustration */}
            <div className='xl:hidden absolute -bottom-6 -left-6 animate-float'>
              <ShoppingCharacter size={80} />
            </div>

            {/* Sparkle decorative icons */}
            <div className='absolute top-8 left-4 sm:left-12 text-2xl opacity-60 animate-gentle-pulse'>✨</div>
            <div className='absolute bottom-16 right-4 sm:right-12 text-2xl opacity-60 animate-float animation-delay-1000'>🌸</div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className='flex items-center justify-center lg:justify-start gap-4 mt-10'>
          {/* Prev/Next Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className='w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-elevated)] hover:border-[var(--ink-muted)] transition-all active:scale-90 disabled:opacity-50'
            aria-label='Previous slide'
          >
            <svg className='w-4 h-4 text-[var(--ink)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className='flex items-center gap-2'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === current
                    ? 'w-8 bg-[var(--accent)]'
                    : 'w-2 bg-[var(--border-strong)] hover:bg-[var(--ink-muted)]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className='w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-elevated)] hover:border-[var(--ink-muted)] transition-all active:scale-90 disabled:opacity-50'
            aria-label='Next slide'
          >
            <svg className='w-4 h-4 text-[var(--ink)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>

          {/* Slide counter */}
          <span className='text-xs text-[var(--ink-muted)] font-mono font-bold ml-2'>
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero
