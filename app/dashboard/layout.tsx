import DashboardSidebar from '@/components/dashboard/Sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function layout({ children }: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  return (
    <div className='flex'>
      <DashboardSidebar />
      <div className='container mx-auto'>
        {children}
      </div>
    </div>
  )
}

export default layout