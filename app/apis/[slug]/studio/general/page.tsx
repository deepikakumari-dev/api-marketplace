import General from '@/components/studio/General'
import { getAPIDetails } from '@/lib/data/apis'
import { getAllCategories } from '@/lib/data/category'
import React from 'react'

async function page({ params }: {
    params: { slug: string }
}) {
    const { slug } = await params
    const api = await getAPIDetails(slug)
    const categories = await getAllCategories()
    return (
        <General api={api} categories={categories} />
    )
}

export default page