import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Activity, Clock, ShieldCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from 'flowbite-react'

function APIsByCategory() {
    const categories = [
        'Email', 'Tool', 'Image', 'Video', 'Media',
        'Finance', 'Crypto', 'Social', 'Gaming', 'Music',
        'Weather', 'Maps', 'News', 'Sports', 'Health',
        'Education', 'Science', 'AI', 'Machine Learning', 'NLP',
        'Translation', 'E-commerce', 'Payments', 'Security', 'Authentication',
        'Analytics', 'Notifications', 'Messaging', 'Chat', 'IoT',
        'Blockchain', 'NFT', 'Data', 'Storage', 'Search',
        'Travel', 'Transport', 'Food', 'Recipes', 'Events',
        'Government', 'Environment', 'Lifestyle', 'Fitness', 'Productivity',
        'Photography', 'Design', 'Marketing', 'Advertising', 'Video Editing',
        'Streaming', 'Books', 'Podcasts', 'AR', 'VR',
        'Augmented Reality', 'Virtual Reality', 'Maps & Location', 'AI Image Generation',
        'AI Text Generation', 'AI Voice', 'Voice Recognition', 'Email Verification',
        'Domain', 'DNS', 'Server', 'Hosting', 'DevOps', 'CMS', 'Monitoring'
    ];

    return (
        <div className='mt-5 pt-5 border-t'>
            <h1 className='text-xl font-semibold'>Categories</h1>
            <div className='flex flex-wrap gap-3 my-3 text-[9px] justify-center'>
                {categories.map((c, i) => (
                    <Link href={''}>
                        <Badge key={i} className='opacity-80 text-[9px]' color='gray'  >
                            {c}
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default APIsByCategory