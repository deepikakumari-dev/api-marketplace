import CreateOrgPage from '@/components/orgs/CreateOrgPage'
import { authOptions } from '@/lib/auth'
import { getUserOrganizations } from '@/lib/data/org'
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
  const session = await getServerSession(authOptions)
  const orgs = await getUserOrganizations(session?.user.id || '')
  return (
    <CreateOrgPage orgs={orgs} />
  )
}

export default page