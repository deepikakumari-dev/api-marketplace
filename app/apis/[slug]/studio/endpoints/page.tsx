import Endpoints from '@/components/studio/Endpoints'
import { getAPIEndpoints } from '@/lib/data/apis'
import React from 'react'

async function page({params}:{
    params: {slug: string}
}) {
    const {slug} = await params
    const endpoints = await getAPIEndpoints(slug)
  return (
    <Endpoints endpoints={endpoints} slug={slug}/>
  )
}

export default page