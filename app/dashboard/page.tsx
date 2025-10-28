import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
  const session = await getServerSession(authOptions)
  if (session?.user.id) {
    redirect('/dashboard/apis')
  }
  return (
    <div>
        <h1 className='font-bold text-2xl'>Dashboard</h1>
    </div>
  )
}

export default page