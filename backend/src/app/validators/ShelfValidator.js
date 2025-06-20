import prisma from "../helpers/prisma"

class ShelfValidator {
    async validateCreate(data) {
        const { name, rackId } = data

        if (!name || name.trim() === "") {
            throw new Error("O nome é obrigatório.")
        }

        if (!rackId) {
            throw new Error("O ID da estante é obrigatório.")
        }

        const rackExists = await prisma.rack.findUnique({
            where: { id: rackId }
        })
        if (!rackExists) {
            throw new Error(`Estante não encontrada.`)
        }
    }

    async validateUpdate(id, data) {
        if (!id) throw new Error("ID da prateleira é obrigatório para atualização.")

        await this.validateCreate(data)

        const shelfExists = await prisma.shelf.findUnique({ where: { id } })
        if (!shelfExists) {
            throw new Error(`Prateleira não encontrada.`)
        }
    }

    async validateDelete(id) {
        if (!id) throw new Error("ID da prateleira é obrigatório.")

        const shelf = await prisma.shelf.findUnique({ where: { id } })
        if (!shelf) {
            throw new Error(`Prateleira não encontrada.`)
        }
    }
}

export default new ShelfValidator()
