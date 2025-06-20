import prisma from "../helpers/prisma";

class EmbalagemServices {
    async createEmbalagem({ sigla, name, quantity, companyId, userId }) {
        try {

            if (!prisma) {
                console.error("Prisma não está definido!");
                throw new Error("Erro interno: Prisma não inicializado.");
            }

            if (!prisma.embalagem) {
                console.error("Modelo embalagem não encontrado no Prisma!");
                throw new Error("Erro interno: Modelo embalagem não configurado.");
            }

            let embalagem = await prisma.embalagem.findUnique({
                where: { sigla }
            });


            if (!embalagem) {
                embalagem = await prisma.embalagem.create({
                    data: {
                        sigla,
                        name,
                        companyId,
                        userId,
                        status: true
                    }
                });

            }

            let qtEmbalagem = await prisma.qtEmbalagem.findUnique({
                where: {
                    quantity_companyId: {
                        quantity: parseInt(quantity),
                        companyId
                    }
                }
            });


            if (!qtEmbalagem) {
                qtEmbalagem = await prisma.qtEmbalagem.create({
                    data: {
                        quantity: parseInt(quantity),
                        companyId,
                        userId,
                        status: true,
                    }
                });

            }

            return { embalagem, qtEmbalagem };
        } catch (error) {
            console.error("Erro ao criar no createEmbalagem", error);
            throw new Error(error.message);
        }
    }

    async getEmbalagemByCompanyId(companyId, statusFilter) {
        try {

            return await prisma.embalagem.findMany({
                where: { companyId, status: statusFilter },
                include: {
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
            });
        } catch (error) {
            console.error("Erro em getEmbalagemByCompany", error);
            throw error;
        }
    }

    async updateEmbalagem(sigla, data) {
        try {

            return await prisma.embalagem.update({
                where: { sigla },
                data
            });
        } catch (error) {
            console.error("Erro em updateEmbalagem", error);
            throw new Error("Falha ao atualizar embalagem: " + error.message);
        }
    }

    async desativarEmbalagem(sigla, status) {
        try {

            return await prisma.embalagem.update({
                where: { sigla },
                data: { status }
            });
        } catch (error) {
            console.error("Erro em desativarEmbalagem", error);
            throw new Error("Erro ao alterar status da embalagem: " + error.message);
        }
    }

    async getEmbalagemBySigla(sigla) {
        try {

            return await prisma.embalagem.findUnique({
                where: { sigla },
                include: {
                    company: true,
                    user: true,
                    products: {
                        include: {
                            qtEmbalagem: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Erro em getEmbalagemBySigla", error);
            throw error;
        }
    }
}

export default new EmbalagemServices();