import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Clock, ShieldCheck, TrendingUp } from 'lucide-react'
import { Badge } from 'flowbite-react'

function TopAPIs() {
  return (
    <div className='mt-5'>
      <h1 className='text-xl font-semibold mb-4'>Top APIs</h1>
      <div className='flex text-sm flex-wrap'>
        <Link href={''}>
          <Card className='shadow-none rounded gap-2 py-2 max-w-md'>
            <CardHeader className='px-0'>
              <div className='px-2 w-fit'>
                <Badge color='gray'>Media</Badge>
              </div>
              <div className='flex items-center gap-2 px-6'>
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
              <div className='flex gap-3 w-full'>
                <div className='rounded border px-1 text-[11px] flex items-center gap-1'>
                  <Clock size={11} className='' />
                  <span>2778ms</span>
                </div>
                <div className='rounded border px-1 text-[11px] flex items-center gap-1'>
                  <TrendingUp size={11} className='' />
                  <span>9.8</span>
                </div>
                <div className='rounded border px-1 text-[11px] flex items-center gap-1'>
                  <ShieldCheck size={11} className='' />
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

export default TopAPIs