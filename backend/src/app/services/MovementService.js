import { MovementValidator } from '../validators/MovementValidator'
import prisma from './../helpers/prisma'

class MovementService {
    static async createMovement(data) {
        MovementValidator(data)

        const product = await prisma.product.findUnique({
            where: { id: data.productId },
            include: { qtEmbalagem: true }
        })

        if (!product) {
            throw new Error("Produto não encontrado.")
        }

        let calcularQuantidade = data.quantity
        if (data.isEmbalagem) {
            if (!product.qtEmbalagem || !product.qtEmbalagem.quantity) {
                throw new Error("Produto não possui quantidade por embalagem definida")
            }
            calcularQuantidade = data.quantity * product.qtEmbalagem.quantity
        }

        const movimentacao = await prisma.movement.create({
            data: {
                ...data,
                quantity: calcularQuantidade,
            }
        })

        return movimentacao
    }
}

export default MovementService