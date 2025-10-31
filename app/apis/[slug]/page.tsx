import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function page({ params }: {
  params: { slug: string }
}) {
  const { slug } = await params
  const session = await getServerSession(authOptions)
  if (session?.user.id){
    redirect('studio/general')
  }
  return (
    <div>{slug}</div>
  )
}

export default page