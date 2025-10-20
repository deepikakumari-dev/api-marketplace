'use client'
import React from 'react'
import { Carousel } from 'flowbite-react'

function Hero() {
  return (
    <div className="h-[30vh] w-full block">
      <Carousel
      >
        <img
          src="/home/banner/main.webp"
          alt="beach vibes"
          className="w-full h-full object-cover"
        />
      </Carousel>
    </div>
  )
}

export default Hero