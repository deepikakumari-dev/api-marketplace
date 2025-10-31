'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Input } from './ui/input'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { Loader2 } from 'lucide-react'


function Header({ orgs }: {
  orgs: any[]
}) {
  const pathname = usePathname()
  const { data: session, status, update } = useSession()
  const navs = [
    {
      name: 'Marketplace',
      link: '/hub'
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

  const userProfile = <div className="w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center cursor-pointer">
    <img
      src={session?.user.image|| `https://whatsyour.info/api/v1/avatar/${session?.user.name}`}
      alt=""
      className="max-w-full max-h-full object-contain"
    />
  </div>

  async function changeOrg(orgId: string) {
    await update({
      user: { ...session?.user, activeOrgId: orgId }
    })
  }


  return (
    <div className='z-50 h-18 relative w-full '>
      <div className=' border-b flex items-center justify-between p-3 text-sm fixed w-full bg-white'>
        <Link href={'/'}>
          <h1 className='text-lg'>DK<span className='font-bold'>API</span></h1>
        </Link>
        <div className='w-full mx-10'>
          <Input placeholder='Search' />
        </div>
        <div className='flex gap-3 items-center'>
          <ul className='flex gap-3'>
            {navs.map((n, i) => (
              <Link href={n.link} key={i} className={`${pathname.split('/')[1] == (n.link.split('/')[1]) ? 'bg-gray-100' : ''}  px-2 py-1 rounded`}>{n.name}</Link>
            ))}
          </ul>
          <div className='flex items-center'>
            {status == "unauthenticated" ? <Link href={'/auth/signin'}>
              <Button>Signin</Button>
            </Link>
              : status == "authenticated" ? <div className='flex gap-3 items-center'>
                <Select defaultValue={session?.user.activeOrgId} onValueChange={(value) => {
                  changeOrg(value)
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a org" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup>
                      {orgs.map((org, i) => (<SelectItem key={i} value={org.organizationId}><div className="w-6 h-6 rounded-full border overflow-hidden flex items-center justify-center cursor-pointer">
                        <img
                          src={org.organization.image || `https://whatsyour.info/api/v1/avatar/${org.organization.name}`}
                          alt=""
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>{org.organization.name}</SelectItem>))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Dropdown label={userProfile} inline className='text-xs '>
                  <DropdownHeader>
                    <span className="block">{session.user.name}</span>
                    <span className="block truncate opacity-70">{session.user.email}</span>
                  </DropdownHeader>
                  <DropdownItem icon={HiViewGrid} href='/profile'>Profile</DropdownItem>
                  <DropdownItem icon={HiCog} href='/settings'>Settings</DropdownItem>
                  <DropdownItem icon={HiCurrencyDollar} href='/settings/payouts'>Payouts</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem icon={HiLogout} onClick={signOut}>Sign out</DropdownItem>
                </Dropdown>

              </div>
                : <Loader2 className='animate-spin' />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header