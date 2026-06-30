import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { MailCharacter } from './Illustrations'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { backendUrl } = useContext(ShopContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/newsletter/subscribe', { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail('');
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='py-16 px-6 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl my-12 relative overflow-hidden'>
      {/* Background radial glow */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--accent-soft)] rounded-full filter blur-[100px] opacity-40'></div>
      </div>

      <div className='relative z-10 max-w-4xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 items-center'>
        {/* Cartoon Character on Left */}
        <div className='hidden md:flex justify-center select-none'>
          <div className='bg-[var(--surface)] p-3 rounded-2xl border border-[var(--border-strong)] shadow-xs animate-float'>
            <MailCharacter size={120} />
          </div>
        </div>

        {/* Text and Form Content on Right */}
        <div className='text-left space-y-4'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight'>
            Subscribe & Get <span className='font-editorial italic font-normal text-[var(--accent)] lowercase text-3xl sm:text-4xl'>20% Off</span>
          </h2>
          <p className='text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed max-w-lg'>
            Join our newsletter and receive styling guides, new collection previews, and an instant 20% discount on your next order.
          </p>

          <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-stretch gap-3 pt-2 max-w-md'>
            <input
              className='input-field flex-1'
              type="email"
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button 
              type='submit' 
              disabled={loading}
              className='btn-primary font-bold text-sm uppercase px-6 py-3.5 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className='text-xs text-[var(--ink-muted)]'>
            Zero spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsletterBox
