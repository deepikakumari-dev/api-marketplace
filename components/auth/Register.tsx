'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from 'flowbite-react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const {data: session, status} = useSession()

    if (status == "loading") {
        return (
            <div className='w-full h-[90vh] flex justify-center items-center'>
                <Loader className='animate-spin' />
            </div>
        )
    } else if (status == 'authenticated') {
        router.push('/dashboard')
        return;
    }

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        if (formData.password !== formData.confirmPassword) {
            setError("Password didn't match, sorry :(")
            setLoading(false)
            return;
        }
        try {
            const res = await fetch('/api/auth/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            console.log(data)
            if (data.success) {
                await signIn('credentials', {
                    redirect: false,
                    email: formData.email,
                    password: formData.password
                })
                router.push('/dashboard')
            } else {
                setError(data.error)
            }
        } catch (e: any) {
            setError(e.message || "Failed to register you :(")
        } finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex justify-center min-h-[90vh] items-center'>
            <Card className='rounded shadow-none w-md h-fit'>
                <CardHeader>
                    <CardTitle>
                        <h1>Register</h1>
                    </CardTitle>
                    <CardDescription>
                        Register to create and subscribe APIs.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <div className=''>
                                <Label>First Name</Label>
                                <Input value={formData.firstName} name='firstName' onChange={handleFormDataChange} required type='text' placeholder='Deepika' />
                            </div>
                            <div className=''>
                                <Label>Last Name</Label>
                                <Input value={formData.lastName} name='lastName' onChange={handleFormDataChange} required type='text' placeholder='Kumari' />
                            </div>
                        </div>
                        <div className=''>
                            <Label>Email</Label>
                            <Input value={formData.email} required name='email' onChange={handleFormDataChange} type='email' placeholder='d.k@dkapi.com' />
                        </div>
                        <div className=''>
                            <Label>Password</Label>
                            <Input value={formData.password} required name='password' onChange={handleFormDataChange} type='password' placeholder='' />
                        </div>
                        <div className=''>
                            <Label>Confirm Password</Label>
                            <Input value={formData.confirmPassword} required name='confirmPassword' onChange={handleFormDataChange} type='password' placeholder='' />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className=''>
                        <Button type='submit' disabled={Object.values(formData).some(d => d == '')}>{loading ? <Loader className='animate-spin' /> : 'Register'}</Button>
                        <p className='text-xs text-red-500 mt-2 truncate max-w-sm'>{error}</p>
                        <div className='text-sm flex gap-1 '>
                            <p>Already have an account - </p>
                            <Link href={'/auth/signin'} className='font-bold hover:underline '>Signin</Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}

export default RegisterPage