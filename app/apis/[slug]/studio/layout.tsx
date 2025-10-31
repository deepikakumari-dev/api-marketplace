import StudioSidebar from '@/components/studio/Sidebar'
import React from 'react'

function layout({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex'>
        <StudioSidebar />
        <div className='container mx-auto'>
            {children}
        </div>
    </div>
  )
}

export default layout