import prisma from "../helpers/prisma"
import ShelfValidator from "../validators/ShelfValidator"

class ShelfService {
    async createShelf(data) {
        try {
            await ShelfValidator.validateCreate(data)

            const { name, rackId, userId, companyId } = data

            const shelf = await prisma.shelf.create({
                data: { name, rackId, userId, companyId }
            })

            return shelf
        } catch (error) {
            throw new Error(`Falha ao criar a prateleira: ${error.message}`)
        }
    }

    async updateShelf(id, data) {
        try {
            await ShelfValidator.validateUpdate(id, data)

            const shelf = await prisma.shelf.update({
                where: { id },
                data
            })

            return shelf
        } catch (error) {
            throw new Error(`Falha ao atualizar a prateleira: ${error.message}`)
        }
    }

    async deleteShelf(id, status) {
        try {
            await ShelfValidator.validateDelete(id)

            const shelf = await prisma.shelf.update({
                where: { id },
                data: { status }
            })

            return shelf
        } catch (error) {
            throw new Error(`Falha ao excluir a prateleira: ${error.message}`)
        }
    }

    async getAllShelvesByRack(rackId) {
        try {
            if (!rackId) {
                throw new Error("É necessário fornecer um ID de estante (rackId).")
            }

            const shelves = await prisma.shelf.findMany({
                where: { rackId },
                select: {
                    id: true,
                    name: true,
                    rackId: true,
                    _count: { select: { product: true } }
                }
            })

            return shelves
        } catch (error) {
            throw new Error(`Falha ao listar as estantes: ${error.message}`)
        }
    }

    async getAllShelvesByCompany(companyId, statusFilter) {
        try {
            if (!companyId) {
                throw new Error("O ID da empresa (companyId) é obrigatório.")
            }

            const shelves = await prisma.shelf.findMany({
                where: { companyId, status: statusFilter },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: { select: { product: true } },
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
                    rack: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            location: true,
                        }
                    }
                }
            })

            return shelves
        } catch (error) {
            throw new Error(`Falha ao listar as prateleiras da empresa: ${error.message}`)
        }
    }

    async getShelfById(id) {
        try {
            const shelf = await prisma.shelf.findUnique({
                where: { id },
                include: {
                    _count: { select: { product: true } }
                }
            })

            if (!shelf) {
                throw new Error(`Prateleira com id ${id} não encontrada.`)
            }

            return shelf
        } catch (error) {
            throw new Error(`Falha ao buscar a prateleira: ${error.message}`)
        }
    }
}

export default new ShelfService()
