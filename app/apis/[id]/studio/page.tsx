import React from 'react'

async function page({params}: {
  params: {id: string}
}) {
    const apiID = (await params).id
  return (
    <div>{apiID}</div>
  )
}

export default page