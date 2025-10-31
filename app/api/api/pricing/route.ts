import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { slug, id, ...body } = await req.json()

  try {
    const api = await prisma.aPI.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!api) {
      return NextResponse.json({ error: 'API not found' }, { status: 404 })
    }

    const plan = await prisma.aPIPricing.create({
      data: {
        ...body,
        api: { connect: { id: api.id } }
      }
    })

    return NextResponse.json(plan)
  } catch (e) {
    console.error('Create Plan Error:', e)
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const {id, apiId, slug, ...body} = await req.json()

    const plan = await prisma.aPIPricing.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(plan)
  } catch (e) {
    console.error('Update Plan Error:', e)
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const plans = await prisma.aPIPricing.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(plans)
  } catch (e) {
    console.error('Fetch Plans Error:', e)
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 })
  }
}
