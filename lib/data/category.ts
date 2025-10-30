import { prisma } from "../prisma"

export const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany({

        })
        return categories
    } catch (e: any) {
        return e.message
    }
}