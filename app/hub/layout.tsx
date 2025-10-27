import HubSidebar from '@/components/hub/Sidebar'
import React from 'react'

function layout({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex'>
        <HubSidebar  />
        <div className='container mx-auto'>
            {children}
        </div>
    </div>
  )
}

export default layout