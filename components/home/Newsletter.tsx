import { Button, Label, TextInput } from 'flowbite-react'
import { Mail } from 'lucide-react'
import React from 'react'

function Newsletter() {
  return (
    <div className='bg-gray-100 flex flex-col items-center w-full py-10 my-5'>
      <div className="w-md ">
        <div className="mb-2 block text-center">
          <Label htmlFor="email4" className='text-xl font-bold'>Newsletter</Label>
          <p className='text-xs opacity-80'>Join our weekly newsletter.</p>
        </div>
        <div className='flex gap-3 w-full'>
          <TextInput className='w-full' id="email4" type="email" placeholder="name@dkapi.com" required />
          <Button color={'alternative'}>Join</Button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter