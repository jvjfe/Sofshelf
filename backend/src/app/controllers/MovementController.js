import MovementService from "../services/MovementService"

class MovementController {
    async create(req, res) {
        const { productId, productPrice, quantity, action, isEmbalagem, companyId, userId } = req.body

        try {
            const movement = await MovementService.createMovement({
                productId,
                productPrice,
                quantity,
                action,
                isEmbalagem,
                companyId,
                userId
            })

            return res.status(201).json({movement})
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Erro ao criar movimentação"
            })
        }
    }
}

export default new MovementController()