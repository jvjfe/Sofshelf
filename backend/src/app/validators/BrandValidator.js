import prisma from "../helpers/prisma"

class BrandValidator {
    async create(data) {
        if (!data.name || data.name.trim() === "") {
            throw new Error("O nome da marca é obrigatório.")
        }
    }

    async update(id, data) {
        if (!id) {
            throw new Error("ID da marca é obrigatório.")
        }

        const brandExists = await prisma.brand.findUnique({ where: { id } })
        if (!brandExists) {
            throw new Error("Marca não encontrada.")
        }

        if (!data.name || data.name.trim() === "") {
            throw new Error("O nome é obrigatório para atualização.")
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error("ID da marca é obrigatório.")
        }

        const brandExists = await prisma.brand.findUnique({ where: { id } })
        if (!brandExists) {
            throw new Error("Marca não encontrada.")
        }
    }

    async getById(id) {
        if (!id) {
            throw new Error("ID da marca é obrigatório.")
        }
    }

    async getAllByCompanyId(companyId) {
        if (!companyId) {
            throw new Error("ID da empresa é obrigatório.")
        }

        const companyExists = await prisma.company.findUnique({ where: { id: companyId } })
        if (!companyExists) {
            throw new Error("Empresa não encontrada.")
        }
    }
}

export default new BrandValidator()