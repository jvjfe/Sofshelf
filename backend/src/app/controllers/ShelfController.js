import ShelfService from "../services/ShelfService"

class ShelfController {
    async create(req, res) {
        try {
            const shelf = await ShelfService.createShelf(req.body)
            return res.status(201).json(shelf)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const shelf = await ShelfService.updateShelf(id, req.body)
            return res.status(200).json(shelf)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body
            const shelf = await ShelfService.deleteShelf(id, status)

            return res.status(200).json({
                message: status
                    ? "Prateleira reativada com sucesso"
                    : "Prateleira desativada com sucesso",
                data: shelf
            });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async index(req, res) {
        try {
            const { rackId } = req.params
            const shelves = await ShelfService.getAllShelvesByRack(rackId)
            return res.status(200).json(shelves)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async indexCompany(req, res) {
        try {
            const { companyId } = req.params
            const { status } = req.query;

            const statusFilter = status === "true"

            const shelves = await ShelfService.getAllShelvesByCompany(companyId, statusFilter)
            return res.status(200).json(shelves)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params
            const shelf = await ShelfService.getShelfById(id)
            return res.status(200).json(shelf)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
}

export default new ShelfController()
