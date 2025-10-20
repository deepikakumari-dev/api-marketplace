import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

function SignIn() {
  return (
    <div className='w-full flex justify-center min-h-[90vh] items-center'>
      <Card className='rounded shadow-none w-md h-fit'>
        <CardHeader>
          <CardTitle>
            <h1>Signin</h1>
          </CardTitle>
          <CardDescription>
            Signin to create and subscribe APIs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <div className=''>
              <Label>Email</Label>
              <Input type='email' placeholder='new@dkapi.com' />
            </div>
            <div className=''>
              <Label>Password</Label>
              <Input type='password' placeholder='' />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className=''>
            <Button>Signin</Button>
            <div className='text-sm flex gap-1 mt-2'>
              <p>Don't have an account - </p>
              <Link href={'/auth/register'} className='font-bold hover:underline '>Register</Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn