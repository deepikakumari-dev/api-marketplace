import FeaturedAPIs from '@/components/home/FeaturedAPIs'
import Hero from '@/components/home/Hero'
import TopAPIs from '@/components/hub/TopAPIs';
import React from 'react'

function APIHub() {

  const categories = [
    'Email', 'Tool', 'Image', 'Video', 'Media',
    'Finance', 'Crypto', 'Social', 'Gaming', 'Music',
    'Weather', 'Maps', 'News', 'Sports', 'Health'
  ];

  return (
    <div>
      <Hero />
      <div className='p-3 mt-4'>
        <h1 className='font-semibold text-2xl'>API Hub</h1>
        <p className='text-sm opacity-70'>All the API in DKAPI is available on this hub.</p>
        <div>
          <FeaturedAPIs />
          <TopAPIs />
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