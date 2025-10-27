'use client'
import { Mail, Plus, Settings, ShoppingBag, User, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function OrgSidebar() {
    const pathname = usePathname()
    const navs = [
        {
            name: 'Create Organization',
            slug: '/orgs/create',
            logo: <Plus size={20} />
        },
        {
            name: 'Join Organization',
            slug: '/orgs/join',
            logo: <Users size={20} />
        },
        {
            name: 'Manage Team',
            slug: '/orgs/team',
            logo: <User size={20} />
        },
        {
            name: 'Transactions',
            slug: '/orgs/transactions',
            logo: <ShoppingBag size={20} />
        },
        {
            name: 'Inbox',
            slug: '/orgs/inbox',
            logo: <Mail size={20} />
        },
        {
            name: 'Organization Settings',
            slug: '/orgs/settings',
            logo: <Settings size={20} />
        }
    ]
    return (
        <div className='border-r h-[90vh] w-xs'>
            <div className=''>

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

export default OrgSidebar