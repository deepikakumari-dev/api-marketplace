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
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation'


function ManageTeam({ members }: {
    members: any[]
}) {
    const [localMembers, setLocalMembers] = useState(members)
    const [selectedOrg, setSelectedOrg] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    return (
        <div className='m-5'>
            <h1 className='font-bold text-2xl'>Manage Team</h1>
            <p className='text-sm opacity-70'>Easily manage team members for organizations.</p>

            <div className='mt-5'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((m, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    <div className="w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center">
                                        <img
                                            src={m.user.image || "https://flowbite-react.com/favicon.svg"}
                                            alt=""
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{m.user.name}</TableCell>
                                <TableCell className='truncate'>{m.user.email}</TableCell>
                                <TableCell >{m.role}</TableCell>
                                <TableCell >
                                    <Button variant={'ghost'}>
                                        <EllipsisVertical />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ManageTeam