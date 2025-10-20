import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='border-t text-xs p-2'>
      <div className='container mx-auto flex justify-between'>
        <p className='text-xs'>Developed by <span className='font-semibold'>DeepikaK</span> with cursed energy.</p>
        <div className='flex gap-2'>
          <Link href={''}>Terms of service</Link>
          <Link href={''}>Privacy policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer