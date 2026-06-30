import React from 'react'
import Hero from '../components/Hero'
import CategoryCards from '../components/CategoryCards'
import LatestCollection from '../components/LatestCollection'
import SeasonalBanner from '../components/SeasonalBanner'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryCards />
      <LatestCollection/>
      <SeasonalBanner />
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
