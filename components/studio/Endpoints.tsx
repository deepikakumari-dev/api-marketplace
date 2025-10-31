'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Loader2, Plus, Trash2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import clsx from 'clsx'

const METHODS = ['GET','POST','PUT','DELETE','PATCH']
const TYPES = ['string','number','boolean','object','array']

export default function Endpoints({ endpoints, slug }: { endpoints: any[], slug: string }) {
  const [data, setData] = useState(endpoints)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)

  const resetForm = () => ({
    name: '', path: '', method: 'GET', description: '', authRequired: true,
    parameters: [], exampleRequest: {}, exampleResponse: {}
  })

  const [form, setForm] = useState<any>(resetForm())

  const handleAddParam = () => {
    setForm((f: any) => ({
      ...f,
      parameters: [...(f.parameters || []), { name: '', type: 'string', required: false, default: '', description: '' }]
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/api/endpoints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug, id: editing?.id })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      if (editing) {
        setData(prev => prev.map(p => (p.id === editing.id ? json.data : p)))
        toast.success('Endpoint updated')
      } else {
        setData(prev => [...prev, json.data])
        toast.success('Endpoint created')
      }
      setOpen(false)
      setEditing(null)
      setForm(resetForm())
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-xl">Endpoints</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setForm(resetForm()); setEditing(null) }}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Endpoint' : 'New Endpoint'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid gap-2">
                <Input placeholder="Endpoint name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <Input placeholder="/users/:id" value={form.path} onChange={e => setForm({ ...form, path: e.target.value })} required />

                <Select value={form.method} onValueChange={v => setForm({ ...form, method: v })}>
                  <SelectTrigger><SelectValue placeholder="HTTP Method" /></SelectTrigger>
                  <SelectContent>
                    {METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Parameters</h3>
                  <Button type='button' variant="outline" size="sm" onClick={handleAddParam}>+ Add param</Button>
                </div>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(form.parameters || []).map((p: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell><Input value={p.name} onChange={e => {
                          const updated = [...form.parameters]; updated[i].name = e.target.value; setForm({ ...form, parameters: updated })
                        }} /></TableCell>
                        <TableCell>
                          <Select value={p.type} onValueChange={v => {
                            const updated = [...form.parameters]; updated[i].type = v; setForm({ ...form, parameters: updated })
                          }}>
                            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                            <SelectContent>
                              {TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><Input value={p.default} onChange={e => {
                          const updated = [...form.parameters]; updated[i].default = e.target.value; setForm({ ...form, parameters: updated })
                        }} /></TableCell>
                        <TableCell>
                          <Switch checked={p.required} onCheckedChange={v => {
                            const updated = [...form.parameters]; updated[i].required = v; setForm({ ...form, parameters: updated })
                          }} />
                        </TableCell>
                        <TableCell><Input value={p.description} onChange={e => {
                          const updated = [...form.parameters]; updated[i].description = e.target.value; setForm({ ...form, parameters: updated })
                        }} /></TableCell>
                        <TableCell>
                          <Button type='button' variant="ghost" size="sm" onClick={() => {
                            const updated = form.parameters.filter((_: any, j: number) => j !== i)
                            setForm({ ...form, parameters: updated })
                          }}>
                            <Trash2 size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Auth Required</span>
                <Switch checked={form.authRequired} onCheckedChange={v => setForm({ ...form, authRequired: v })} />
              </div>

              <Button type="submit" className="w-full mt-2" disabled={saving}>
                {saving ? <Loader2 className="animate-spin" size={16} /> : 'Save Endpoint'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Path</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Auth</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ep, i) => (
            <TableRow key={i}>
              <TableCell>{ep.name}</TableCell>
              <TableCell className="font-mono text-xs">{ep.path}</TableCell>
              <TableCell>
                <span className={clsx("px-2 py-0.5 rounded text-white text-xs font-semibold", {
                  'bg-green-600': ep.method === 'GET',
                  'bg-blue-600': ep.method === 'POST',
                  'bg-yellow-600': ep.method === 'PUT',
                  'bg-red-600': ep.method === 'DELETE',
                  'bg-purple-600': ep.method === 'PATCH',
                })}>
                  {ep.method}
                </span>
              </TableCell>
              <TableCell>{ep.authRequired ? '✅' : '❌'}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => { setEditing(ep); setForm(ep); setOpen(true) }}>
                  <Pencil size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
