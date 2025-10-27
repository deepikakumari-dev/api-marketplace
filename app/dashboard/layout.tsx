import DashboardSidebar from '@/components/dashboard/Sidebar'
import React from 'react'

function layout({children}: {
    children: React.ReactNode
}) {
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