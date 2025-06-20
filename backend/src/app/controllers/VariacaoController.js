import VariacaoService from "../services/VariacaoService";

class VariacaoController {
    async index(req, res) {
        const { productId } = req.params
        try {
            const variacoes = await VariacaoService.getVariacaoByProductId(productId)
            return res.status(200).json(variacoes)
        } catch (error) {
            console.error("Erro ao buscar variações", error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    async show(req, res) {
        const { id } = req.params

        try {
            const variacao = await VariacaoService.getVariacaoById(id)

            if (!variacao) {
                return res.status(404).json({
                    success: false,
                    message: "Variação não encontrada"
                })
            }

            return res.status(200).json(variacao)
        } catch (error) {
            console.error("Erro ao buscar variação", error)
            return res.status(400).json({
                success: false,
                error: error.message,
            })
        }
    }
}

export default new VariacaoController()