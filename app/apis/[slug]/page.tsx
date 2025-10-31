import APIDetailsPage from '@/components/hub/APIDetailsPage'
import { getFullAPIDetails } from '@/lib/data/apis'
import React from 'react'

async function page({ params }: {
  params: { slug: string }
}) {
  const { slug } = await params
  const api = await getFullAPIDetails(slug)
  return (
    <APIDetailsPage api={api} />
  )
}

export default page