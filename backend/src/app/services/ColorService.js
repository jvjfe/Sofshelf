import prisma from "../helpers/prisma";

class ColorService {
    async createColor(data) {
        try {
            const { name, hexCode, companyId, userId } = data;

            const color = await prisma.color.create({
                data: {
                    name,
                    hexCode,
                    companyId,
                    userId,
                },
            });

            return color;
        } catch (error) {
            throw new Error(`Erro ao criar cor: ${error.message}`);
        }
    }

    async updateColor(id, data) {
        try {
            const { name, hexCode } = data;

            const color = await prisma.color.update({
                where: { id },
                data: {
                    name,
                    hexCode,
                },
            });

            return color;
        } catch (error) {
            throw new Error(`Erro ao atualizar cor: ${error.message}`);
        }
    }

    async deleteColor(id) {
        try {
            const color = await prisma.color.update({
                where: { id },
                data: { status: false },
            });

            return color;
        } catch (error) {
            throw new Error(`Erro ao excluir cor: ${error.message}`);
        }
    }

    async getAllColorsByCompanyId(companyId, statusFilter) {
        try {
            const colors = await prisma.color.findMany({
                where: { companyId, status: statusFilter },
                select: {
                    id: true,
                    name: true,
                    hexCode: true,
                    createdAt: true,
                    updatedAt: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    company: {
                        select: {
                            id: true,
                            name: true,
                            ownerId: true,
                            companyEmail: true,
                        },
                    }
                },
            })

            return colors;
        } catch (error) {
            throw new Error(`Erro ao buscar cores: ${error.message}`);
        }
    }

    async getColorById(id) {
        try {
            const color = await prisma.color.findUnique({
                where: { id },
            });

            return color;
        } catch (error) {
            throw new Error(`Erro ao buscar cor: ${error.message}`);
        }
    }

}

export default new ColorService()