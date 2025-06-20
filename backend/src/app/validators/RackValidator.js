import prisma from "../helpers/prisma"

class RackValidator {
    async validateCreate(data) {
        const { name, companyId } = data

        if (!name || name.trim() === "") {
            throw new Error("O nome é obrigatório.")
        }

        if (!companyId) {
            throw new Error("A empresa é obrigatória.")
        }

        const companyExists = await prisma.company.findUnique({
            where: { id: companyId }
        })

        if (!companyExists) {
            throw new Error(`Empresa com ID ${companyId} não encontrada.`)
        }
    }

    async validateUpdate(id, data) {
        if (!id) {
            throw new Error("ID da estante é obrigatório para atualização.")
        }

        const rack = await prisma.rack.findUnique({
            where: { id }
        })

        if (!rack) {
            throw new Error(`Estante com ID ${id} não encontrada.`)
        }

        if (data.name !== undefined && data.name.trim() === "") {
            throw new Error("O nome não pode estar vazio.")
        }

        if (data.companyId) {
            const company = await prisma.company.findUnique({
                where: { id: data.companyId }
            })

            if (!company) {
                throw new Error(`Empresa com ID ${data.companyId} não encontrada.`)
            }
        }
    }

    async validateDelete(id) {
        if (!id) {
            throw new Error("ID da estante é obrigatório para exclusão.")
        }

        const rack = await prisma.rack.findUnique({
            where: { id }
        })

        if (!rack) {
            throw new Error(`Estante com ID ${id} não encontrada.`)
        }
    }
}

export default new RackValidator()
