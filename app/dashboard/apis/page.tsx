import APIs from '@/components/dashboard/APIs'
import { authOptions } from '@/lib/auth'
import { getOrganizationAPIs } from '@/lib/data/apis'
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
    const session = await getServerSession(authOptions)
    const apis = await getOrganizationAPIs(session?.user.activeOrgId)
    return (
        <APIs apis={apis} />
    )
}

export default page