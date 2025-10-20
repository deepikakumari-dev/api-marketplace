import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Input } from './ui/input'

function Header() {
  const navs = [
    {
      name: 'Marketplace',
      link: '/'
    },
    {
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      name: 'Orgs',
      link: '/orgs'
    },
  ]

  return (
    <div className='border-b flex items-center justify-between p-3 h-18 text-sm'>
      <div>
        <h1 className='text-lg'>DK<span className='font-bold'>API</span></h1>
      </div>
      <div className='w-full mx-10'>
          <Input placeholder='Search' />
      </div>
      <div className='flex gap-3 items-center'>
        <ul className='flex gap-3'>
          {navs.map((n, i) => (
            <Link href={n.link} key={i}>{n.name}</Link>
          ))}
        </ul>
        <div>
          <Link href={'/auth/signin'}>
            <Button className=''>Signin</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header