import ManageTeam from '@/components/orgs/ManageTeam'
import { authOptions } from '@/lib/auth'
import { getOrganizationMembers } from '@/lib/data/org'
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
  const session = await getServerSession(authOptions)
  const members = await getOrganizationMembers(session?.user.activeOrgId)
  return (
    <ManageTeam members={members}/>
  )
}

export default page