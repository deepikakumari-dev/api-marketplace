'use client'
import { ChartArea, Globe, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function StudioSidebar({slug}:{
    slug: string
}) {
  const pathname = usePathname()
  const navs = [
    { name: 'Hub Listing', slug: '/apis/' + slug + '/studio/general', logo: <Globe size={20} /> },
    { name: 'Analytics', slug: '/apis/' + slug + '/studio/analytics', logo: <ChartArea size={20} /> },
    { name: 'Settings', slug: '/apis/' + slug + '/studio/settings', logo: <Settings size={20} /> },
  ]

  return (
    <div className='h-[90vh] w-80 relative'>
      <div className='border-r h-full w-64 fixed overflow-y-auto'>
        {navs.map((n, i) => {
          const isActive = pathname.endsWith(n.slug)
          return (
            <Link
              key={i}
              href={`${n.slug}`}
              className={`p-3 text-sm flex items-center space-x-2 transition-all duration-200  ${
                isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`opacity-70 ${isActive && 'opacity-100 text-gray-900'}`}>{n.logo}</span>
              <span>{n.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default StudioSidebar
