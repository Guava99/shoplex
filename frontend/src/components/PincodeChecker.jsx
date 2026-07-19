import React, { useState } from 'react'
import { LucideMapPin, LucideTruck, LucideCheckCircle, LucideShieldCheck, LucideLoader2 } from 'lucide-react'

const PincodeChecker = () => {
  const [pincode, setPincode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = (e) => {
    e.preventDefault()
    if (!pincode || pincode.trim().length !== 6 || isNaN(pincode)) {
      setResult({ success: false, message: 'Please enter a valid 6-digit Pincode' })
      return
    }

    setLoading(true)
    setTimeout(() => {
      // Calculate realistic delivery date (3-5 days from today)
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() + 4)
      const formattedDate = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })

      setResult({
        success: true,
        deliveryDate: formattedDate,
        cod: true,
        express: true,
      })
      setLoading(false)
    }, 600)
  }

  return (
    <div className='border border-[var(--border)] bg-[var(--surface-elevated)] p-4 rounded-xl space-y-3.5'>
      <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ink)]'>
        <LucideMapPin size={16} className='text-[var(--accent)]' />
        <span>Check Delivery & Serviceability</span>
      </div>

      <form onSubmit={handleCheck} className='flex gap-2'>
        <input
          type='text'
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value)
            if (result) setResult(null)
          }}
          placeholder='Enter 6-digit Pincode'
          className='flex-1 px-3.5 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors'
        />
        <button
          type='submit'
          disabled={loading}
          className='btn-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center min-w-[80px]'
        >
          {loading ? <LucideLoader2 size={14} className='animate-spin' /> : 'Check'}
        </button>
      </form>

      {result && (
        <div className='pt-1 animate-fade-in text-xs space-y-2'>
          {result.success ? (
            <>
              <div className='flex items-center gap-2 text-[var(--success)] font-semibold'>
                <LucideTruck size={15} />
                <span>Get it by <strong className='text-[var(--ink)] font-bold'>{result.deliveryDate}</strong></span>
              </div>
              <div className='flex flex-wrap gap-x-4 gap-y-1.5 text-[var(--ink-soft)] font-medium pt-1 border-t border-[var(--border-strong)] text-[11px]'>
                <span className='flex items-center gap-1 text-[var(--success)]'>
                  <LucideCheckCircle size={13} /> Pay on Delivery Available
                </span>
                <span className='flex items-center gap-1 text-[var(--success)]'>
                  <LucideShieldCheck size={13} /> Free 30-Day Returns
                </span>
              </div>
            </>
          ) : (
            <p className='text-red-500 font-medium'>{result.message}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default PincodeChecker
