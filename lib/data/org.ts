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
