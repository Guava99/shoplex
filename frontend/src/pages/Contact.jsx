import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center lg:flex-row gap-10 mb-28 items-center'>
        <img className='w-full lg:max-w-[400px] rounded-xl shadow-sm border border-[var(--border)]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6 lg:w-1/2'>
          
          <div className='modern-card w-full'>
            <h3 className='font-bold text-xl text-[var(--ink)] mb-4 flex items-center gap-2'>
              <svg className='w-5 h-5 text-[var(--accent)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              Get in Touch
            </h3>
            <div className='space-y-4 text-sm'>
              <div className='flex items-center gap-3'>
                <svg className='w-5 h-5 text-[var(--ink-muted)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                <span className='text-[var(--ink-soft)]'>support@shoplex.com</span>
              </div>
              <div className='flex items-center gap-3'>
                <svg className='w-5 h-5 text-[var(--ink-muted)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
                <span className='text-[var(--ink-soft)]'>+1 (555) 123-4567</span>
              </div>
              <div className='flex items-center gap-3'>
                <svg className='w-5 h-5 text-[var(--ink-muted)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-[var(--ink-soft)]'>Mon-Fri: 9AM-6PM EST</span>
              </div>
            </div>
          </div>

          <div className='modern-card w-full'>
            <h3 className='font-bold text-lg text-[var(--ink)] mb-4'>Quick Support</h3>
            <Link to='/faq' className='btn-secondary text-sm py-3 flex items-center justify-center gap-2 w-full bg-white'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              View FAQs
            </Link>
          </div>

        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact