import APIs from '@/components/dashboard/APIs'
import { authOptions } from '@/lib/auth'
import { getOrganizationAPIs } from '@/lib/data/apis'
import { getAllCategories } from '@/lib/data/category'
import { getUserOrganizations } from '@/lib/data/org'
import { getServerSession } from 'next-auth'
import React from 'react'

async function page() {
  const session = await getServerSession(authOptions)
  const apis = await getOrganizationAPIs(session?.user.activeOrgId)
  const orgs = await getUserOrganizations(session?.user.id)
  const categories = await getAllCategories()
  return (
    <APIs apis={apis} orgs={orgs} categories={categories} />
  )
}

export default page