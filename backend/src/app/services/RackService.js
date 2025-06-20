import prisma from "../helpers/prisma";
import RackValidator from "../validators/RackValidator";

class RackService {
    // Criar Estante
    async createRack(data) {
        await RackValidator.validateCreate(data);

        const { name, location, description, companyId, userId } = data;

        return await prisma.rack.create({
            data: { name, location, description, companyId, userId }
        });
    }

    // Atualizar Estante
    async updateRack(id, data) {
        await RackValidator.validateUpdate(id, data);

        return await prisma.rack.update({
            where: { id },
            data
        });
    }

    // Desativar Estante
    async deleteRack(id, status) {
        await RackValidator.validateDelete(id);

        return await prisma.rack.update({
            where: { id },
            data: { status }
        })
    }

    //  Pegar dos Estantes da Empresa
    async getAllRacksByCompany(companyId, statusFilter ) {
        if (!companyId) {
            throw new Error("O ID da empresa (companyId) é obrigatório.");
        }

        return await prisma.rack.findMany({
            where: { companyId, status: statusFilter },
            select: {
                id: true,
                name: true,
                description: true,
                location: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                _count: { select: { shelves: true } },
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
                }
            }
        })
    }

    // Pegar Estante pelo ID
    async getRackById(id) {
        return await prisma.rack.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                location: true,
                _count: { select: { shelves: true } },
                createdAt: true,
                updatedAt: true
            }
        });
    }
}

export default new RackService();
