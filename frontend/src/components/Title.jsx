import React from 'react'
import { StarBurst } from './Illustrations'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex flex-col items-center gap-1.5 mb-4'>
      <div className='flex items-center gap-2'>
        <StarBurst size={16} className="text-[var(--gold)] opacity-80" />
        <h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] uppercase font-heading'>
          {text1} <span className='font-editorial italic font-normal text-[var(--accent)] lowercase text-3xl sm:text-4xl'>{text2}</span>
        </h2>
        <StarBurst size={16} className="text-[var(--gold)] opacity-80" />
      </div>
      <div className='w-12 h-[2px] bg-[var(--accent)] rounded-full'></div>
    </div>
  )
}

export default Title
