'use client'
import React from 'react'
import { Carousel } from 'flowbite-react'

function Hero() {
  return (
    <div className="h-[30vh] w-full">
      <Carousel
        className=""
      >
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="beach vibes"
          className="w-full h-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
          alt="mountain dream"
          className="w-full h-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="forest trail"
          className="w-full h-full object-cover"
        />
      </Carousel>
    </div>
  )
}

export default Hero