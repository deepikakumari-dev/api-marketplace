'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Clock, ShieldCheck, TrendingUp } from 'lucide-react'
import { Badge } from 'flowbite-react'

function FeaturedAPIs({ apis }: {
  apis: any[]
}) {
  return (
    <div className='mt-5'>
      <h1 className='text-xl font-semibold mb-4'>Featured APIs</h1>
      <div className='flex text-sm flex-wrap gap-3'>
        {!apis || (apis && apis.length === 0) && (
          <p className='opacity-70 text-sm text-center'>No featured APIs found.</p>
        )}
        {(apis || []).map((a, i) => <Link href={'/apis/' + a.id}>
          <Card key={i} className='shadow-none rounded gap-2 py-2 max-w-md'>
            <CardHeader className='px-0'>
              <div className='px-2 w-fit'>
                <Badge color='gray'>{a.category.name}</Badge>
              </div>
              <div className='px-6 w-full text-left'>
                <div className="w-10 h-10 rounded-full border overflow-hidden inline-block align-middle bg-muted">
                  <img
                    src={a.image || `https://whatsyour.info/api/v1/avatar/${a.name}`}
                    alt={a.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className='inline-block align-middle pl-2 w-[calc(100%-3rem)]'>
                  <CardTitle>{a.name}</CardTitle>
                  <CardDescription className='text-[10px]'>
                    By{" "}
                    <Link
                      href={`/org/${a.orgId}`}
                      className='hover:underline transition duration-300'
                    >
                      {a.organization.name}
                    </Link>
                  </CardDescription>
                </div>
              </div>


            </CardHeader>
            <CardContent>
              <div className='truncate'>
                {a.shortDescription}
              </div>
            </CardContent>
            <CardFooter className='opacity-80'>
              <div className='flex gap-3 w-full'>
                <div className='rounded border px-1 text-[11px] flex items-center gap-1'>
                  <Clock size={11} className='' />
                  <span>{a.avgLatency || 0}ms</span>
                </div>
                <div className='rounded border px-1 text-[11px] flex items-center gap-1'>
                  <TrendingUp size={11} className='' />
                  <span>{a.score || 0}</span>
                </div>
                <div className='rounded border px-1 text-[11px] flex items-center gap-1'>
                  <ShieldCheck size={11} className='' />
                  <span>{a.testScore || 0}%</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>)}
      </div>
    </div>
  )
}

export default FeaturedAPIs