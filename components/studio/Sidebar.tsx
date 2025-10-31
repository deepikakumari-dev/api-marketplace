'use client'
import { ChartArea, Globe, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function StudioSidebar() {
    const pathname = usePathname()
    const navs = [
        {
            name: 'Hub Listing',
            slug: 'studio/general',
            logo: <Globe size={20} />
        },
        {
            name: 'Analytics',
            slug: 'studio/analytics',
            logo: <ChartArea size={20} />
        },
        {
            name: 'Settings',
            slug: 'studio/settings',
            logo: <Settings size={20} />
        },
    ]
    return (
        <div className='h-[90vh] w-80 relative'>
            <div className='border-r h-full w-64 fixed overflow-y-auto'>
                {navs.map((n, i) => (
                    <Link key={i} href={n.slug == pathname ? '#' : n.slug} className={`p-3 text-sm flex space-x-2 items-center ${pathname == n.slug ? 'bg-gray-100' : ''}`}>
                        <span className='opacity-70'>{n.logo}</span>
                        <span>{n.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default StudioSidebar