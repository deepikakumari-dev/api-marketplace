'use client'
import { Input } from '@/components/ui/input'
import { Label } from 'flowbite-react'
import { Textarea } from '@/components/ui/textarea'
import React, { useRef, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

function page() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',

  })
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleimageSelect = () => {
    inputRef.current?.click()
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
      if (!res.ok) {
        setImage('')
        return;
      }

      const data = await res.json()

      setFormData(prev => ({
        ...prev,
        imageUrl: data.data.url
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
        // Remove the data:image/...;base64, prefix
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {

      setLoading(true)
      const res = await fetch('/api/org/create', {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return;
      }
    } catch (e: any) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='m-5'>
      <h1 className='font-bold text-2xl'>Create Organization</h1>
      <p className='text-sm opacity-70'>Create an organization to sell APIs with orgs name.</p>

      <form onSubmit={handleSubmit} className='mt-10'>
        <div className="space-y-2 flex flex-col mb-5">

          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="description" className="">
              Body
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
          <div className="flex-1 gap-2 flex flex-col relative">
            <Label htmlFor="image" className="">
              Org Logo
            </Label>
            {image && <span onClick={() => setImage('')} className="z-50 absolute top-0 rounded bg-white p-0.5 right-[-5px]"><X className="h-3" /></span>}
            <div
              onClick={handleimageSelect} className="h-20 w-20 rounded border cursor-pointer relative ">
              {uploading ? <Loader2 className={"flex items-center justify-center w-full h-full"} size={14} /> : <img src={image || 'https://flowbite-react.com/favicon.svg'} className="h-full w-full object-contain" alt="post_image" />}
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
        </div>
        <Button>{loading ? <Loader2 className='animate-spin' /> : 'Create'}</Button>
        <p>{error}</p>
      </form>
    </div>
  )
}

export default page