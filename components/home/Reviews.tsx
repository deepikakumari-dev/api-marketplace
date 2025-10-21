import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Rating, RatingStar } from 'flowbite-react'

function Reviews() {
  return (
    <div className='flex flex-col items-center w-full py-10 my-5'>
      <h1 className='text-xl font-semibold mb-4'>Reviews</h1>
      <div>

      </div>
      <div className=' gap-3 text-sm'>
        <Card className='shadow-none rounded gap-2 bg-gray-100'>
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
                <CardTitle className=''>Rahul Kumar</CardTitle>
                <CardDescription className=''>
                  <Rating size=''>
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
                  </Rating>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              Great API Marketplace with cheap rates.
            </div>
          </CardContent>
          <CardFooter className='opacity-80'>
            <div className='flex justify-between w-full'>
              
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Reviews