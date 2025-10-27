import { prisma } from "../prisma"

export const getUserOrganizations = async (userId: string) => {
    try {
        const orgs = await prisma.userOrganization.findMany({
            where: {
                userId
            },
            include: {
                organization: true
            }
        })

        return orgs
    } catch (e: any) {
        return e.message
    }
}


export const getOrganizationMembers = async (orgId: string) => {
    try {
        const members = await prisma.userOrganization.findMany({
            where: {
                organizationId: orgId
            },
            include: {
                user: true
            }
        })
        return members
    } catch(e: any) {
        return e.message
    }
}