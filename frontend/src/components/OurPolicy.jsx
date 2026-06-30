import React from 'react'

const OurPolicy = () => {
  const policies = [
    {
      icon: <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' /></svg>,
      title: "Hassle-Free Exchange",
      description: "Easy product exchanges within 30 days. Your absolute satisfaction is our priority.",
      highlight: "30 Days Return"
    },
    {
      icon: <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
      title: "Quality Guarantee",
      description: "Authentic partner brands with comprehensive warranty coverage and quality check.",
      highlight: "100% Authentic"
    },
    {
      icon: <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
      title: "Dedicated Support",
      description: "Round-the-clock professional support team ready to assist with any questions.",
      highlight: "Always Online"
    },
    {
      icon: <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' /></svg>,
      title: "Secured Delivery",
      description: "Fast express shipping with real-time tracking and premium transit protection.",
      highlight: "Express Shipping"
    }
  ];

  return (
    <div id="our-policy" className='py-16 sm:py-24 px-4 bg-[var(--surface-elevated)] border-t border-b border-[var(--border)] rounded-2xl my-12 animate-fade-in-up'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight mb-3'>
            Experience Shopping <span className='font-editorial italic font-normal text-[var(--accent)] lowercase text-4xl sm:text-5xl'>Redefined</span>
          </h2>
          <p className='text-sm sm:text-base text-[var(--ink-soft)] max-w-xl mx-auto'>
            Enjoy a seamless journey backed by our robust guarantees, secure checkout, and proactive customer care.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {policies.map((policy, index) => (
            <div key={index} className='bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 rounded-xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-[var(--border-strong)] group'>
              <div className='w-12 h-12 bg-[var(--accent-soft)] text-[var(--accent)] rounded-lg flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300'>
                {policy.icon}
              </div>
              <div className='mb-2'>
                <span className='inline-block px-2.5 py-0.5 bg-[var(--gold-soft)] text-[var(--gold)] text-[10px] font-bold uppercase tracking-wider rounded'>
                  {policy.highlight}
                </span>
              </div>
              <h3 className='font-bold text-lg text-[var(--ink)] mb-2'>{policy.title}</h3>
              <p className='text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed'>{policy.description}</p>
            </div>
          ))}
        </div>

        <div className='text-center mt-12 sm:mt-16'>
          <div className='inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--surface)] rounded-xl text-xs sm:text-sm font-bold tracking-wide shadow-xs uppercase'>
            🛡️ Verified Shopping Experience
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
