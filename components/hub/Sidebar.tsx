'use client'
import { Cable, Mail, Plus, Settings, ShoppingBag, User, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function HubSidebar() {
  const pathname = usePathname()
  const navs = [
    {
      name: 'Hub',
      slug: '/hub',
      logo: <Cable size={20} />
    },
  ]

  const categories = [
    'Email', 'Tool', 'Image', 'Video', 'Media',
    'Finance', 'Crypto', 'Social', 'Gaming', 'Music',
    'Weather', 'Maps', 'News', 'Sports', 'Health'
  ];

  return (
    <div className='h-[90vh] w-80 relative'>
      <div className='border-r h-full w-64 fixed overflow-y-auto w-50'>

        {navs.map((n, i) => (
          <Link key={i} href={n.slug == pathname ? '#' : n.slug} className={`p-3 text-sm flex space-x-2 items-center ${pathname == n.slug ? 'bg-gray-100' : ''}`}>
            <span className='opacity-70'>{n.logo}</span>
            <span>{n.name}</span>
          </Link>
        ))}
        <div className='mt-3 p-3'>
          <h1 className='font-semibold'>Categories</h1>
          {categories.map((n, i) => (
            <Link key={i} href={'/category/' + n.toLowerCase()} className={`p-3 text-sm flex space-x-2 items-center`}>
              <span>{n}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HubSidebar