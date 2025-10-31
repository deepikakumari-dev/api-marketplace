import React from 'react'

async function page({ params }: {
  params: { slug: string }
}) {
  const { slug } = await params
  return (
    <div>{slug}</div>
  )
}

export default page