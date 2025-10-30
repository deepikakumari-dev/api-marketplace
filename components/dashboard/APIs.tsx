'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Clock, Loader2, Plus, ShieldCheck, TrendingUp } from 'lucide-react'
import { Badge } from 'flowbite-react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


function APIs({ apis, orgs, categories }: {
    apis: any[],
    orgs: any[],
    categories: any[]
}) {
    const {data: session} = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        categoryId: '',
        orgId: session?.user.activeOrgId || ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/api/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (!data.success || !res.ok){
                toast.error(data.error)
                return;
            }
            toast.success('API created successfully!!!')
            setIsOpen(false)
            router.push('/dashboard/apis/' + data.data.id)
        } catch(e: any) {
            toast.error('Error occurred :(', {description: e.message})
        } finally{
            setLoading(false)
        }
    }


    return (
        <div>
            <div className=''>
                <div className=' flex justify-between mr-3'>
                    <h1 className='font-semibold text-2xl'>APIs</h1>
                    <div>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <form>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Add API</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create API</DialogTitle>
                                        <DialogDescription>
                                            Create a new API to sell it on this platform.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Name</Label>
                                            <Input id="name-1" name="name" value={formData.name} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="slub-1">Slug</Label>
                                            <Input id="slug-1" name="slug" value={formData.slug} onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))}/>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="desc-1">Description</Label>
                                            <Textarea id="desc-1" name="desc" value={formData.description} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}/>
                                        </div>
                                        <div>
                                            <Label htmlFor="cat-1">Category</Label>
                                            <Select value={formData.categoryId} onValueChange={(value) => {
                                                setFormData(prev => ({...prev, categoryId: value}))
                                            }}>
                                                <SelectTrigger className="w-full mt-3" id='cat-1'>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {categories.map((c, i) => (
                                                            <SelectItem key={i} value={c.id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label id='org-1'>Organization</Label>
                                            <Select value={formData.orgId} onValueChange={(value) => {
                                                setFormData(prev => ({...prev, orgId: value}))
                                            }}>
                                                <SelectTrigger className="w-full mt-3" id='org-1'>
                                                    <SelectValue placeholder="Select a org" />
                                                </SelectTrigger>
                                                <SelectContent >
                                                    <SelectGroup>
                                                        {orgs.map((org, i) => (<SelectItem key={i} value={org.organizationId}><div className="w-6 h-6 rounded-full border overflow-hidden flex items-center justify-center cursor-pointer">
                                                            <img
                                                                src={org.organization.image || "https://flowbite-react.com/favicon.svg"}
                                                                alt=""
                                                                className="max-w-full max-h-full object-contain"
                                                            />
                                                        </div>{org.organization.name}</SelectItem>))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button disabled={Object.values(formData).some(d => d === '')} onClick={handleSubmit} type="submit">{loading ?<Loader2 className='animate-spin' /> : 'Create'}</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>

                    </div>
                </div>
                <div className='flex text-sm flex-wrap p-3'>
                    {apis.map((a, i) => <Link href={'/apis/' + a.id}>
                        <Card key={i} className='shadow-none rounded gap-2 py-2 max-w-md'>
                            <CardHeader className='px-0'>
                                <div className='px-2 w-fit'>
                                    <Badge color='gray'>{a.category.name}</Badge>
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

                                        <CardTitle>{a.name}</CardTitle>
                                        <CardDescription className='text-[10px]'>By <Link href={'/orgs/' + a.orgId} className='hover:underline transition duration-300 '>{a.organization.name}</Link></CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div>
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

        </div>
    )
}

export default APIs