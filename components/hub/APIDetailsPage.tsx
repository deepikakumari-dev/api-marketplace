'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Loader2, SendHorizonal, ShieldCheck, Clock, Zap, Star } from 'lucide-react'

export default function APIDetailsPage({ api }: { api: any }) {
  const [activeEndpoint, setActiveEndpoint] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDemo = async (ep: any) => {
    setActiveEndpoint(ep)
    setLoading(true)
    try {
      const res = await fetch(ep.path, { method: ep.method })
      const json = await res.json().catch(() => ({}))
      toast.success('Demo executed successfully!')
      console.log(json)
    } catch {
      toast.error('Demo failed to run.')
    }
    setLoading(false)
  }

  return (
    <div className='p-6 space-y-8'>
      {/* --- HERO --- */}
      <div className='flex flex-col md:flex-row gap-6 items-center justify-between'>
        <div className='flex items-center gap-4'>
            <img
              src={api.logo || `https://whatsyour.info/api/v1/avatar/${api.name}`}
              alt={api.name}
              width={64}
              height={64}
              className='rounded-xl border'
            />
          <div>
            <h1 className='text-2xl font-semibold flex items-center gap-2'>
              {api.name}
              {api.verified && (
                <Badge variant='outline' className='flex items-center gap-1'>
                  <ShieldCheck size={14} /> Verified
                </Badge>
              )}
            </h1>
            <p className='text-muted-foreground text-sm max-w-md'>{api.shortDescription}</p>
          </div>
        </div>

        <div className='flex gap-4 items-center text-sm'>
          <div className='text-center'>
            <div className='text-lg font-bold flex items-center gap-1'>
              <Star size={16} className='text-yellow-500' /> {api.score || 0}
            </div>
            <p className='text-xs text-muted-foreground'>Score</p>
          </div>
          <div className='text-center'>
            <div className='text-lg font-bold flex items-center gap-1'>
              <Clock size={16} className='text-blue-500' /> {api.avgLatency || 0}ms
            </div>
            <p className='text-xs text-muted-foreground'>Avg Latency</p>
          </div>
          <div className='text-center'>
            <div className='text-lg font-bold flex items-center gap-1'>
              <Zap size={16} className='text-green-500' /> {api.testScore || 0}%
            </div>
            <p className='text-xs text-muted-foreground'>Uptime</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* --- TABS --- */}
      <Tabs defaultValue='overview'>
        <TabsList className='grid grid-cols-4 w-full sm:w-[420px]'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='endpoints'>Endpoints</TabsTrigger>
          <TabsTrigger value='pricing'>Pricing</TabsTrigger>
          <TabsTrigger value='playground'>Playground</TabsTrigger>
        </TabsList>

        {/* --- OVERVIEW TAB --- */}
        <TabsContent value='overview'>
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>{api.longDescription || 'No extended description available.'}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2 text-sm'>
              <p><b>Base URL:</b> {api.baseUrl || 'Not provided'}</p>
              <p><b>Visibility:</b> {api.isPublic ? 'Public' : 'Private'}</p>
              <p><b>Category:</b> {api.category?.name || '-'}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ENDPOINTS TAB --- */}
        <TabsContent value='endpoints'>
          <Card>
            <CardHeader>
              <CardTitle>Endpoints</CardTitle>
              <CardDescription>All available routes with request types and access details.</CardDescription>
            </CardHeader>
            <CardContent>
              {api.endpoints?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead>Path</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Auth</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {api.endpoints.map((ep: any) => (
                      <TableRow key={ep.id}>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className={`${
                              ep.method === 'GET'
                                ? 'border-green-600 text-green-600'
                                : ep.method === 'POST'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-yellow-600 text-yellow-600'
                            }`}
                          >
                            {ep.method}
                          </Badge>
                        </TableCell>
                        <TableCell className='font-mono'>{ep.path}</TableCell>
                        <TableCell>{ep.description || '-'}</TableCell>
                        <TableCell>{ep.authRequired ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{ep.version}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ep.deprecated
                                ? 'destructive'
                                : ep.status === 'active'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {ep.deprecated ? 'Deprecated' : ep.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size='sm'
                            variant='outline'
                            disabled={loading && activeEndpoint?.id === ep.id}
                            onClick={() => handleDemo(ep)}
                          >
                            {loading && activeEndpoint?.id === ep.id ? (
                              <Loader2 size={14} className='animate-spin' />
                            ) : (
                              <SendHorizonal size={14} />
                            )}
                            <span className='ml-2'>Try</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className='text-muted-foreground text-sm text-center py-8'>
                  No endpoints defined for this API.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- PRICING TAB --- */}
        <TabsContent value='pricing'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {api.pricingPlans?.length ? (
              api.pricingPlans.map((plan: any) => (
                <Card
                  key={plan.id}
                  className='border-primary/20 hover:shadow-lg transition rounded-2xl'
                >
                  <CardHeader className='text-center'>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.isFree ? (
                        'Free Plan'
                      ) : (
                        <>
                          ${plan.pricePerMonth}
                          <span className='text-xs text-muted-foreground'> / {plan.quotaDuration}</span>
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='text-center space-y-3'>
                    <p className='text-sm'>
                      {plan.requestLimit ? `${plan.requestLimit} requests` : 'Unlimited requests'}
                    </p>
                    <div className='flex flex-col gap-1 text-xs text-muted-foreground'>
                      {plan.features?.length
                        ? plan.features.map((f: string, i: number) => <div key={i}>• {f}</div>)
                        : 'No features listed'}
                    </div>
                    <Button size='sm' className='w-full'>
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className='col-span-full text-center text-muted-foreground py-8'>
                No pricing plans yet.
              </div>
            )}
          </div>
        </TabsContent>

        {/* --- PLAYGROUND TAB --- */}
        <TabsContent value='playground'>
          <Card>
            <CardHeader>
              <CardTitle>API Playground</CardTitle>
              <CardDescription>Run sample calls and view responses in real-time.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              {activeEndpoint ? (
                <>
                  <p className='text-muted-foreground'>
                    Selected: <code>{activeEndpoint.path}</code>
                  </p>
                  <Button onClick={() => handleDemo(activeEndpoint)} disabled={loading}>
                    {loading ? (
                      <Loader2 size={14} className='animate-spin' />
                    ) : (
                      <SendHorizonal size={14} />
                    )}
                    <span className='ml-2'>Run Again</span>
                  </Button>
                </>
              ) : (
                <p className='text-muted-foreground'>Select an endpoint to test it here.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
