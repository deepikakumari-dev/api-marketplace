'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Loader2, Plus, Pencil, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function PricingPage({ slug }: { slug: string }) {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<any>({})
  const [editId, setEditId] = useState<string | null>(null)
  const [reqLoading, setReqLoading] = useState(false)

  useEffect(() => {
    fetch('/api/api/pricing')
      .then(res => res.json())
      .then(data => {
        setPlans(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setReqLoading(true)
    const method = editId ? 'PUT' : 'POST'
    const res = await fetch('/api/api/pricing', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug, id: editId }),
    })
    const data = await res.json()
    setReqLoading(false)
    if (res.ok) {
      if (editId) setPlans(p => p.map(pl => (pl.id === editId ? data : pl)))
      else setPlans(p => [...p, data])
      toast.success(editId ? 'Plan updated successfully!' : 'New plan created!')
      setForm({})
      setOpen(false)
      setEditId(null)

      return
    }
    toast.error(data.error || 'Something went wrong.')
  }

  const resetForm = () => {
    setForm({})
    setEditId(null)
    setOpen(false)
  }

  const featureString = (features?: string[]) =>
    features?.length ? features.join(', ') : '—'

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Pricing Plans</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus size={16} className='mr-2' /> Add Plan
        </Button>
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-10'>
          <Loader2 className='animate-spin text-muted-foreground' size={28} />
        </div>
      ) : plans.length === 0 ? (
        <p className='text-muted-foreground text-center py-10'>No pricing plans found yet.</p>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                'border rounded p-5 flex flex-col justify-between shadow-sm transition hover:shadow-md relative',
                p.isFree ? 'border-green-400/40' : 'border-border'
              )}
            >
              <div>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='text-lg font-medium flex items-center gap-2'>
                    {p.name}
                    {p.isFree && (
                      <span className='text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>
                        Free
                      </span>
                    )}
                  </h3>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setForm(p)
                      setEditId(p.id)
                      setOpen(true)
                    }}
                  >
                    <Pencil size={14} />
                  </Button>
                </div>

                <p className='text-sm text-muted-foreground mb-4'>{p.description || 'No description'}</p>

                <div className='text-3xl font-semibold mb-1'>
                  {p.isFree ? 'Free' : `$${p.pricePerMonth}`}
                  {!p.isFree && <span className='text-sm text-muted-foreground'>/mo</span>}
                </div>
                <p className='text-sm text-muted-foreground mb-4'>
                  {p.requestLimit ? `${p.requestLimit.toLocaleString()} requests / ${p.quotaDuration || 'month'}` : 'Unlimited requests'}
                </p>

                <div className='space-y-2'>
                  {(p.features || []).map((f: string, i: number) => (
                    <div key={i} className='flex items-center text-sm text-muted-foreground'>
                      <CheckCircle2 size={14} className='text-green-500 mr-2' /> {f}
                    </div>
                  ))}
                  {!p.features?.length && (
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <XCircle size={14} className='text-red-400 mr-2' /> No custom features
                    </div>
                  )}
                </div>
              </div>

              <div className='mt-6'>
                <span
                  className={cn(
                    'text-xs uppercase font-medium tracking-wide px-2 py-1 rounded-md',
                    p.visibility === 'public'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-200 text-gray-700'
                  )}
                >
                  {p.visibility}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Plan' : 'Add Plan'}</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <Label>Name</Label>
              <Input
                placeholder='Pro, Basic, Enterprise...'
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Description</Label>
              <Input
                placeholder='Describe what this plan offers'
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Price / Month</Label>
              <Input
                type='number'
                placeholder='e.g. 29'
                disabled={form.isFree}
                value={form.pricePerMonth || ''}
                onChange={(e) => setForm({ ...form, pricePerMonth: +e.target.value })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Request Limit</Label>
              <Input
                type='number'
                placeholder='e.g. 10000'
                value={form.requestLimit || ''}
                onChange={(e) => setForm({ ...form, requestLimit: +e.target.value })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Quota Duration</Label>
              <Select
                value={form.quotaDuration || 'month'}
                onValueChange={(val) => setForm({ ...form, quotaDuration: val })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value='day'>Per Day</SelectItem>
                  <SelectItem value='week'>Per Week</SelectItem>
                  <SelectItem value='month'>Per Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='flex items-center gap-2'>
              <Switch
                checked={form.isFree}
                onCheckedChange={(val) => setForm({ ...form, isFree: val })}
              />
              <Label>Free Plan</Label>
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Visibility</Label>
              <Select
                value={form.visibility || 'public'}
                onValueChange={(val) => setForm({ ...form, visibility: val })}
              >
                <SelectTrigger><SelectValue placeholder='Select visibility' /></SelectTrigger>
                <SelectContent>
                  <SelectItem value='public'>Public</SelectItem>
                  <SelectItem value='private'>Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Features (comma-separated)</Label>
              <Input
                placeholder='e.g. Analytics access, Custom endpoints'
                value={form.features?.join(', ') || ''}
                onChange={(e) => setForm({ ...form, features: e.target.value.split(',').map(f => f.trim()) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSave}>{reqLoading ? <Loader2 className='animate-spin' /> : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
