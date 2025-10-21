import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Activity, Clock, ShieldCheck } from 'lucide-react'

function FeaturedAPIs() {
  return (
    <div className='mt-5'>
      <h1 className='text-xl font-semibold mb-4'>Featured APIs</h1>
      <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-3 text-sm'>
        <Link href={''}>
          <Card className='shadow-none rounded gap-2'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <div className="w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center">
                  <img
                    src="https://flowbite-react.com/favicon.svg"
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className=''>

                  <CardTitle>Image Hosting API</CardTitle>
                  <CardDescription className='text-[10px]'>By <Link href={'/'} className='hover:underline transition duration-300 '>DeepikaK</Link></CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                Host your images with this API in seconds and get its URL easily.
              </div>
            </CardContent>
            <CardFooter className='opacity-80'>
              <div className='flex justify-between w-full'>
                <div className='rounded border px-1 text-[10px] flex items-center gap-1'>
                  <Clock size={10} className='' />
                  <span>2778ms</span>
                </div>
                <div className='rounded border px-1 text-[10px] flex items-center gap-1'>
                  <Activity size={10} className='' />
                  <span>9.8</span>
                </div>
                <div className='rounded border px-1 text-[10px] flex items-center gap-1'>
                  <ShieldCheck size={10} className='' />
                  <span>100%</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedAPIs