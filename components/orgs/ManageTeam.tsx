'use client'
import { Input } from '@/components/ui/input'
import { Label } from 'flowbite-react'
import { Textarea } from '@/components/ui/textarea'
import React, { useRef, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function ManageTeam({ orgs }: {
    orgs: any[]
}) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',

    })
    const [members, setMembers] = useState([])
    const [selectedOrg, setSelectedOrg] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)

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
            <h1 className='font-bold text-2xl'>Manage Team</h1>
            <p className='text-sm opacity-70'>Easily manage team members for organizations.</p>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orgs.map((org, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    <div className="w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center">
                                        <img
                                            src={org.organization.image || "https://flowbite-react.com/favicon.svg"}
                                            alt=""
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{org.organization.name}</TableCell>
                                <TableCell className='truncate'>{org.organization.description}</TableCell>
                                <TableCell >{org.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ManageTeam