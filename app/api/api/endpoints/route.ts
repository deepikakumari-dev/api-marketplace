import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, slug, ...data } = body

    let endpoint


    const api = await prisma.aPI.findUnique({
        where: {
            slug
        }
    })

    let endpointData = {...data, apiId: api?.id}
    if (id) {
      endpoint = await prisma.aPIEndpoint.update({
        where: { id },
        data: endpointData
      })
    } else {
      endpoint = await prisma.aPIEndpoint.create({
        data: endpointData
      })
    }

    return NextResponse.json({ success: true, data: endpoint })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
