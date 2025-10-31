'use client'
import { Input } from '@/components/ui/input'
import { Label } from 'flowbite-react'
import { Textarea } from '@/components/ui/textarea'
import React, { useRef, useState } from 'react'
import { EllipsisVertical, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'

function General({ api, categories }: {
    api: any,
    categories: any[]
}) {
    const [formData, setFormData] = useState(api)
    const [image, setImage] = useState(api.logo)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [changed, setChanged] = useState(false)

    const handleimageSelect = () => {
        (inputRef.current as any).click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setImage(url)
        setUploading(true)
        try {
            const base64 = await fileToBase64(file)

            const res = await fetch("/api/images/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64, name: file.name }),
            })


            const data = await res.json()

            setFormData(prev => ({
                ...prev,
                logo: data.data.url
            }))
        } catch (e: any) {
            console.error(e.message)
        } finally {
            setUploading(false)
        }
    }

    const fileToBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64 = (reader.result as string).split(",")[1]
                resolve(base64)
            }
            reader.onerror = (err) => reject(err)
        })


    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setChanged(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {

            setLoading(true)
            const res = await fetch('/api/api/edit', {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                return;
            }

            toast.success('API updated!!')
            setChanged(false)
        } catch (e: any) {
            console.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const discardChanges = () => {
        setFormData(JSON.parse(JSON.stringify(api)))  // deep copy so React re-renders
        setImage(api.logo)
        setChanged(false)
    }


    return (
        <div className='m-5'>
            <h1 className='font-bold text-2xl'>General</h1>
            <p className='text-sm opacity-70'>Updated your API's name, description, base URL, and visibility.</p>

            <form onSubmit={handleSubmit} className='mt-10'>
                <div className="space-y-2 flex flex-col mb-5">
                    <div className='flex gap-3'>

                        <div className="gap-2 flex flex-col relative">
                            {image && <span onClick={() => setImage('')} className="z-50 absolute top-0 rounded bg-white p-0.5 right-[-5px]"><X className="h-3" /></span>}
                            <div
                                onClick={handleimageSelect} className="h-20 w-20 rounded-full overflow-hidden border cursor-pointer relative ">
                                {uploading ? <Loader2 className={"flex items-center justify-center w-full h-full animate-spin"} size={14} /> : <img src={image || `https://whatsyour.info/api/v1/avatar/${api.name}`} className="h-full w-full object-contain" alt="post_image" />}
                            </div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                ref={inputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='flex-1'>
                            <div className="">
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </div>
                            <div>
                                <Select value={formData.categoryId} onValueChange={(value) => {
                                    setFormData((prev: any) => ({ ...prev, categoryId: value }))
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
                        </div>
                    </div>
                    <div className="grid flex-1 gap-2 w-full">
                        <Label htmlFor="shortDescription" className="">
                            Short description
                        </Label>
                        <Textarea
                            id="shortDescription"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={(e) => handleFieldChange(e)}
                            required
                        />
                    </div>
                    <div className="grid flex-1 gap-2 w-full">
                        <Label htmlFor="longDescription" className="">
                            Long description
                        </Label>
                        <Textarea
                            id="longDescription"
                            name="longDescription"
                            value={formData.longDescription}
                            onChange={(e) => handleFieldChange(e)}
                        />
                        <p className='text-xs opacity-70'>Markdown is acceptable.</p>
                    </div>

                    <div className='bg-gray-100 p-2 rounded'>
                        <h2 className='font-semibold text-lg '>Visibility</h2>
                        <p className='text-xs opacity-70'>Make your API public or private and change its base URL.</p>
                        <div className='flex items-center space-x-2 my-5'>
                            <Switch id="visibility" checked={formData.isPublic} onCheckedChange={(val) => {
                                setChanged(true)
                                setFormData(prev => ({ ...prev, isPublic: val }))
                            }} />
                            <Label htmlFor="visibility">Public</Label>
                        </div>
                    </div>

                </div>
                <Button variant={'outline'} type='button' onClick={discardChanges} className='mr-2'>Cancel</Button>
                <Button disabled={uploading || loading || !changed}>{loading ? <Loader2 className='animate-spin' /> : 'Save'}</Button>
                <p className='mt-2 text-red-500 text-xs'>{error}</p>
            </form>
        </div>
    )
}

export default General