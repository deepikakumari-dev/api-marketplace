'use client'
import { Activity, Boxes, Mail, Plus, Settings, ShoppingBag, User, Users, UserStar } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function DashboardSidebar() {
    const pathname = usePathname()
    const navs = [
        {
            name: 'APIs',
            slug: '/dashboard/apis',
            logo: <Boxes size={20} />
        },
        {
            name: 'Analytics',
            slug: '/dashboard/analytics',
            logo: <Activity size={20} />
        },
        {
            name: 'Revies',
            slug: '/dashboard/reviews',
            logo: <UserStar size={20} />
        },
        {
            name: 'Transactions',
            slug: '/dashboard/transactions',
            logo: <ShoppingBag size={20} />
        }
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

export default DashboardSidebar