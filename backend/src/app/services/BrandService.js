import prisma from "../helpers/prisma"
import BrandValidator from "../validators/BrandValidator"

class BrandService {
    async createBrand(data) {
        try {
            await BrandValidator.create(data)

            const brand = await prisma.brand.create({
                data
            })

            return brand
        } catch (error) {
            throw new Error(`Erro ao criar marca: ${error.message}`)
        }
    }

    async updateBrand(id, data) {
        try {
            await BrandValidator.update(id, data)

            const brand = await prisma.brand.update({
                where: { id },
                data
            })

            return brand
        } catch (error) {
            throw new Error(`Erro ao atualizar marca: ${error.message}`)
        }
    }

    async deleteBrand(id) {
        try {
            await BrandValidator.delete(id)

            const brand = await prisma.brand.update({
                where: { id },
                data: { status: false }
            })

            return brand
        } catch (error) {
            throw new Error(`Erro ao excluir marca: ${error.message}`)
        }
    }

    async getAllBrandsByCompanyId(companyId, statusFilter) {
        try {
            await BrandValidator.getAllByCompanyId(companyId)

            const brands = await prisma.brand.findMany({
                where: { companyId, status: statusFilter },
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    company: {
                        select: {
                            id: true,
                            name: true,
                            ownerId: true,
                            companyEmail: true
                        }
                    },
                }
            })

            return brands
        } catch (error) {
            throw new Error(`Erro ao buscar marcas: ${error.message}`)
        }
    }

    async getBrandById(id) {
        try {
            await BrandValidator.getById(id)

            const brand = await prisma.brand.findUnique({
                where: { id }
            })

            if (!brand) {
                throw new Error("Marca não encontrada.")
            }

            return brand
        } catch (error) {
            throw new Error(`Erro ao buscar marca: ${error.message}`)
        }
    }
}

export default new BrandService()
