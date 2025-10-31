import StudioSidebar from '@/components/studio/Sidebar'
import React from 'react'

async function layout({ children, params }: {
    children: React.ReactNode,
    params: { slug: string }
}) {
    const { slug } = await params
    return (
        <div className='flex'>
            <StudioSidebar slug={slug} />
            <div className='container mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default layout