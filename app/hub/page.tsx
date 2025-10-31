import FeaturedAPIs from '@/components/home/FeaturedAPIs'
import Hero from '@/components/home/Hero'
import TopAPIs from '@/components/hub/TopAPIs';
import { getFeaturedAPIs, rankAPIs } from '@/lib/data/apis';
import React from 'react'

async function APIHub() {

  const categories = [
    'Email', 'Tool', 'Image', 'Video', 'Media',
    'Finance', 'Crypto', 'Social', 'Gaming', 'Music',
    'Weather', 'Maps', 'News', 'Sports', 'Health'
  ];

  const featuredAPIs = await getFeaturedAPIs()
  const topAPIs = await rankAPIs()


  return (
    <div>
      <Hero />
      <div className='p-3 mt-4'>
        <h1 className='font-semibold text-2xl'>API Hub</h1>
        <p className='text-sm opacity-70'>All the API in DKAPI is available on this hub.</p>
        <div>
          <FeaturedAPIs apis={featuredAPIs} />
          <TopAPIs topAPIs={topAPIs} />
        </div>
        <div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default APIHub 