import { prisma } from "../prisma"

export const getOrganizationAPIs = async (orgId: string) => {
    try {
        const apis = await prisma.aPI.findMany({
            where: {
                orgId
            },
            include:{
                category: true,
                organization: true,
                
            }
        })
        return apis
    } catch (e: any) {
        return []
    }
}

export const getFeaturedAPIs = async () => {
    try {
        const featured = await prisma.aPI.findMany({
            where: {
                featured: true
            },
            include: {
                organization: true,
                category: true
            }
        })
        return featured
    } catch(e: any) {
        return []
    }
}

export const rankAPIs = async () => {
    try {
        const apis = await prisma.aPI.findMany({
            orderBy: [
                {score: 'desc'},
                {testScore: 'desc'}
            ],
            include: {
                category: true,
                organization: true
            }
        })
        return apis
    } catch (e: any) {
        return []
    }
}

export const getAPIDetails = async (slug: string) => {
    try {
        const api = await prisma.aPI.findUnique({
            where: {
                slug
            }
        })
        return api
    } catch (e: any) {
        return e.message
    }
}

export const getAPIEndpoints = async (slug: string) => {
try {
        const endpoints = await prisma.aPIEndpoint.findMany({
            where: {
                api: {
                    slug
                }
            }
        })
        return endpoints
    } catch (e: any) {
        return e.message
    }
}

export const getFullAPIDetails = async (slug: string) => {
    try {
        const api = await prisma.aPI.findUnique({
            where: {
                slug
            }, 
            include: {
                endpoints: true,
                pricingPlans: true,
                organization: true,
                category: true
            }
        })
        return api
    } catch (e: any) {
        return e.message
    }
}