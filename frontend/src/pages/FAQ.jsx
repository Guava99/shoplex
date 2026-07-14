import React, { useState } from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "We offer free standard shipping (5-7 business days) and express shipping (2-3 business days). Orders placed before 2 PM are processed the same day."
    },
    {
      question: "What is your return policy?",
      answer: "We offer 30-day returns on all items in original condition with tags attached. Return shipping is free for defective items."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently we ship within the US only, but we're working on international shipping options. Sign up for our newsletter to be notified when available."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. You can also check your order status by logging into your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and Cash on Delivery (COD) for eligible locations."
    },
    {
      question: "How do I know what size to order?",
      answer: "Each product page includes a detailed size chart. If you're between sizes, we recommend ordering the larger size for comfort."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled or modified within 1 hour of placement. After that, please contact our support team for assistance."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! Our support team is available Monday-Friday, 9AM-6PM EST via email at support@shoplex.com or phone at +1 (555) 123-4567."
    }
  ]

  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'FREQUENTLY'} text2={'ASKED QUESTIONS'} />
      </div>

      <div className='my-10 max-w-4xl mx-auto px-4'>
        <p className='text-center text-gray-600 mb-8'>
          Find answers to common questions about our products, shipping, and policies.
        </p>
        
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='modern-card'>
              <button
                className='w-full text-left flex justify-between items-center p-4'
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className='font-semibold text-amber-800 pr-4'>{faq.question}</h3>
                <svg 
                  className={`w-5 h-5 text-orange-600 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill='none' 
                  stroke='currentColor' 
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              {openIndex === index && (
                <div className='px-4 pb-4'>
                  <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='text-center mt-12 modern-card'>
          <h3 className='text-xl font-bold text-amber-800 mb-4'>Still have questions?</h3>
          <p className='text-gray-600 mb-6'>Can't find what you're looking for? Our support team is here to help!</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a href='mailto:support@shoplex.com' className='btn-primary'>
              Email Support
            </a>
            <a href='tel:+15551234567' className='btn-secondary'>
              Call Us
            </a>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default FAQ