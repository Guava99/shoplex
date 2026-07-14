import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-[80vh] flex items-center justify-center page-transition'>
      <div className='text-center max-w-lg mx-auto px-6'>
        {/* Large 404 */}
        <div className='relative mb-8'>
          <h1 className='text-[140px] sm:text-[180px] font-extrabold text-[var(--border)] leading-none select-none'>
            404
          </h1>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-20 h-20 bg-[var(--accent-soft)] rounded-full flex items-center justify-center animate-float'>
              <svg className='w-10 h-10 text-[var(--accent)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <h2 className='text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-3'>
          Page Not Found
        </h2>
        <p className='text-[var(--ink-soft)] mb-8 leading-relaxed'>
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Link
            to='/'
            className='btn-primary py-3.5 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
            </svg>
            Go Home
          </Link>
          <Link
            to='/collection'
            className='btn-secondary py-3.5 px-8 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-white'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
