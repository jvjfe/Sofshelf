import ColorService from "../services/ColorService"

class ColorController {
    async create(req, res) {
        try {
            const colorData = req.body

            const color = await ColorService.createColor(colorData)

            return res.status(201).json(color)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const colorData = req.body

            if (!Object.keys(colorData).length) {
                return res.status(400).json({ message: "Nenhum dado fornecido para atualização." })
            }

            const color = await ColorService.updateColor(id, colorData)
            return res.status(200).json(color)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params

            await ColorService.deleteColor(id)
            return res.status(200).json({ message: "Cor excluída com sucesso" })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async index(req, res) {
        try {
            const { companyId } = req.params
            const { status } = req.query;

            const statusFilter = status === "true"
            const colors = await ColorService.getAllColorsByCompanyId(companyId, statusFilter)
            return res.status(200).json(colors)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params

            const color = await ColorService.getColorById(id)
            return res.status(200).json(color)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new ColorController()