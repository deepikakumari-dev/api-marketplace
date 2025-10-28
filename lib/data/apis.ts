import { prisma } from "../prisma"

export const getOrganizationAPIs = async (orgId: string) => {
    try {
        const apis = await prisma.aPI.findMany({
            where: {
                orgId
            }
        })
    } catch (e: any) {
        return e.message
    }
}