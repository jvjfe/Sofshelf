import RackService from "../services/RackService";

class RackController {
    async create(req, res) {
        try {
            const rackData = req.body;
            const rack = await RackService.createRack(rackData);
            return res.status(201).json(rack);
        } catch (error) {
            console.error("Erro ao criar estante:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const rackData = req.body;
            const rack = await RackService.updateRack(id, rackData);
            return res.status(200).json(rack);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updated = await RackService.deleteRack(id, status);

            return res.status(200).json({
                message: status
                    ? "Estante reativada com sucesso"
                    : "Estante desativada com sucesso",
                data: updated
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async index(req, res) {
        try {
            const { companyId } = req.params;
            const { status } = req.query;

            const statusFilter = status === "true"

            const racks = await RackService.getAllRacksByCompany(companyId, statusFilter)
            return res.status(200).json(racks)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const rack = await RackService.getRackById(id);
            if (!rack) {
                return res.status(404).json({ message: "Estante não encontrada." });
            }
            return res.status(200).json(rack);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new RackController();
