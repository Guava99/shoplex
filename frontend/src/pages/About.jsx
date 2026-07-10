import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>
          <img className='w-full md:max-w-[450px] rounded-xl shadow-sm border border-[var(--border)]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[var(--ink-soft)]'>
              <p>Shoplex was founded with a vision to create a seamless online shopping experience that brings quality products directly to your doorstep. We believe shopping should be convenient, trustworthy, and enjoyable.</p>
              <p>Our carefully curated collection features products that meet our high standards for quality, style, and value. We work directly with trusted suppliers and emerging brands to offer you the latest trends and timeless classics.</p>
              <div className='bg-[var(--accent-soft)] p-6 rounded-xl border-l-4 border-[var(--accent)]'>
                <b className='text-[var(--ink)] text-lg'>Our Mission</b>
                <p className='mt-2'>To make quality shopping accessible to everyone through innovative technology, exceptional service, and a commitment to customer satisfaction in the digital age.</p>
              </div>
              <div className='flex gap-6 mt-4'>
                <div className='text-center'>
                  <div className='text-2xl font-extrabold text-[var(--accent)]'>10K+</div>
                  <div className='text-xs text-[var(--ink-muted)] uppercase tracking-wider font-bold mt-1'>Happy Customers</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-extrabold text-[var(--accent)]'>500+</div>
                  <div className='text-xs text-[var(--ink-muted)] uppercase tracking-wider font-bold mt-1'>Products</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-extrabold text-[var(--accent)]'>99%</div>
                  <div className='text-xs text-[var(--ink-muted)] uppercase tracking-wider font-bold mt-1'>Satisfaction</div>
                </div>
              </div>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
          <div className='modern-card text-center hover:scale-102 transition-transform duration-300'>
            <div className='w-14 h-14 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-5'>
              <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <b className='text-lg text-[var(--ink)]'>Quality Assurance</b>
            <p className='text-sm text-[var(--ink-soft)] mt-3 leading-relaxed'>Every product is carefully vetted and tested to meet our high standards before reaching you.</p>
          </div>
          <div className='modern-card text-center hover:scale-102 transition-transform duration-300'>
            <div className='w-14 h-14 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-5'>
              <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <b className='text-lg text-[var(--ink)]'>Fast & Secure</b>
            <p className='text-sm text-[var(--ink-soft)] mt-3 leading-relaxed'>Lightning-fast checkout with bank-level security and multiple payment options for your convenience.</p>
          </div>
          <div className='modern-card text-center hover:scale-102 transition-transform duration-300'>
            <div className='w-14 h-14 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-5'>
              <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z' />
              </svg>
            </div>
            <b className='text-lg text-[var(--ink)]'>24/7 Support</b>
            <p className='text-sm text-[var(--ink-soft)] mt-3 leading-relaxed'>Our dedicated support team is always ready to help you with any questions or concerns.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
