import React from 'react'

const CozyFeatures = () => {
  const features = [
    {
      icon: <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>,
      title: "Premium Quality",
      description: "Every item is tested for maximum comfort and durability"
    },
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' /></svg>,
      title: "Great Value",
      description: "Premium quality at competitive prices"
    },
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' /></svg>,
      title: "Comfort First",
      description: "Feel at home wherever you go with our collection"
    },
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' /></svg>,
      title: "Sustainable Design",
      description: "Eco-friendly materials and ethical production"
    }
  ]

  return (
    <div className='py-16 px-4'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-amber-800 mb-4'>
          Why Choose Shoplex?
        </h2>
        <p className='text-amber-700 max-w-2xl mx-auto'>
          We're not just a store, we're a modern platform that believes in quality, convenience, and exceptional shopping experiences.
        </p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
        {features.map((feature, index) => (
          <div key={index} className='modern-card text-center group p-6 h-full'>
            <div className='w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto text-orange-600 group-hover:scale-110 transition-transform duration-300'>
              {feature.icon}
            </div>
            <h3 className='text-xl font-bold text-amber-800 mb-4'>
              {feature.title}
            </h3>
            <p className='text-amber-700 leading-relaxed text-sm'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CozyFeatures