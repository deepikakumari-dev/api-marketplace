'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from 'flowbite-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

function SignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })
            if (res?.ok) {
                router.push('/dashboard')
            } else {
                setError(`${res?.status} ${res?.error}` || 'Invalid credentials ig')
            }
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex justify-center min-h-[90vh] items-center'>
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
                            <Input required type='email' value={formData.email} onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            }} placeholder='new@dkapi.com' />
                        </div>
                        <div className=''>
                            <Label>Password</Label>
                            <Input required type='password' value={formData.password} onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))
                            }} placeholder='' />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className=''>
                        <Button disabled={formData.email == '' || formData.password == ''}>{loading ? <Loader className='animate-spin' /> : 'Signin'}</Button>
                        <p className='text-red-500 text-xs mt-2'>{error}</p>
                        <div className='text-sm flex gap-1 '>
                            <p>Don't have an account - </p>
                            <Link href={'/auth/register'} className='font-bold hover:underline '>Register</Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}

export default SignInPage