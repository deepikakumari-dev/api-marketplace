import React from 'react'

function page({params}: {
    params: {name: string}
}) {
  return (
    <div>{params.name} - coming soon... :)</div>
  )
}

export default page