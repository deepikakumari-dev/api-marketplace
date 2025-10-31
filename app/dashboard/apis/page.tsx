import APIs from '@/components/dashboard/APIs'
import { authOptions } from '@/lib/auth'
import { getAllCategories } from '@/lib/data/category'
import { getUserOrganizations } from '@/lib/data/org'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Page() {
  const session = await getServerSession(authOptions)
  const orgs = await getUserOrganizations(session?.user.id)
  const categories = await getAllCategories()

  return (
    <APIs
      orgs={orgs}
      categories={categories}
    />
  )
}

export default Page