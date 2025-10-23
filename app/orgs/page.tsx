
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {

  redirect('/orgs/create')
}

export default page