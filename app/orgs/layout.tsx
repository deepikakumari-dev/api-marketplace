import OrgSidebar from '@/components/orgs/Sidebar'
import React from 'react'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function layout({ children }: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        redirect('/auth/signin')
    }
    return (
        <div className='flex'>
            <OrgSidebar />
            <div className='container mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default layout