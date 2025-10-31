import PricingPage from '@/components/studio/PricingPage';
import React from 'react'

async function page({ params }: {
    params: { slug: string }
}) {
    const { slug } = await params;
    return (
        <PricingPage slug={slug} />
    )
}

export default page