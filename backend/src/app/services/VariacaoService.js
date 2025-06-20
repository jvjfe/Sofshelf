import prisma from "../helpers/prisma";

class VariacaoService {
    async getVariacaoByProductId(productId) {
        try {
            const varicao = await prisma.productPrice.findMany({
                where: { productId },
                select: {
                    id: true,
                    price: true,
                    product: true,
                    brand: {
                        select: {
                            name: true
                        }
                    },
                    color: {
                        select: {
                            name: true,
                            hexCode: true
                        }
                    }
                }
            })
            return varicao
        } catch (error) {
            throw new Error(`Erro ao buscar variações: ${error.message}`);
        }
    }

    async getVariacaoById(id) {
        try {
            const variacao = await prisma.productPrice.findUnique({
                where: { id },
                select: {
                    id: true,
                    price: true,
                    product: true,
                    brand: {
                        select: {
                            name: true
                        }
                    },
                    color: {
                        select: {
                            name: true,
                            hexCode: true
                        }
                    }
                }
            })
            return variacao
        } catch (error) {
            throw new Error(`Erro ao buscar variação: ${error.message}`);
        }
    }


}

export default new VariacaoService()