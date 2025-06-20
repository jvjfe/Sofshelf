import EmbalagemService from "../services/EmbalagemService"

class EmbalagemController {
    // Criação de um tipo
    async create(req, res) {
        const { sigla, name, quantity, companyId, userId } = req.body

        try {
            const result = await EmbalagemService.createEmbalagem({
                sigla,
                name,
                quantity,
                companyId,
                userId
            })

            return res.status(201).json({
                success: true,
                embalagem: result.embalagem,
                qtEmbalagem: result.qtEmbalagem
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    async index(req, res) {
        const { companyId } = req.params
        const { status } = req.query;

        const statusFilter = status === "true"
        try {
            const embalagens = await EmbalagemService.getEmbalagemByCompanyId(
                companyId,
                statusFilter
            )
            return res.status(200).json(embalagens)
        } catch (error) {
            console.error("Erro ao buscar embalagens", error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    // Atualização de um tipo  
    async update(req, res) {
        const { sigla } = req.params
        const { name } = req.body

        try {
            const updated = await EmbalagemService.updateEmbalagem(sigla, { name })
            return res.status(200).json({
                success: true,
                data: updated,
                message: "Embalagem atualizada com sucesso"
            })
        } catch (error) {
            console.error("Erro ao atualizar embalagem", error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    // Desativar um tipo
    async destroy(req, res) {
        const { sigla } = req.params
        const { status } = req.body

        try {
            const result = await EmbalagemService.desativarEmbalagem(sigla, status)

            return res.status(200).json({
                success: true,
                data: result,
                message: `Embalagem ${status ? "ativada" : "desativada"} com sucesso`
            })
        } catch (error) {
            console.error("Erro ao desativar embalagem", error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    // Pegar um tipo pelo ID
    async show(req, res) {
        const { sigla } = req.params

        try {
            const embalagem = await EmbalagemService.getEmbalagemBySigla(sigla)

            if (!embalagem) {
                return res.status(404).json({
                    success: false,
                    message: "Embalagem não encontrada"
                })
            }

            return res.status(200).json(embalagem)
        } catch (error) {
            console.error("Erro ao buscar embalagem", error)
            return res.status(400).json({
                success: false,
                error: error.message,
            })
        }
    }


}

export default new EmbalagemController()