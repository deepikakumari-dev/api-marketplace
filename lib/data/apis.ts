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