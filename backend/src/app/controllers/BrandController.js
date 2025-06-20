import BrandService from "../services/BrandService";

class BrandController {
    async create(req, res) {
        try {
            const brandData = req.body

            const brand = await BrandService.createBrand(brandData)

            return res.status(201).json(brand)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const brandData = req.body

            if (!brandData.name && !brandData.rackId) {
                return res.status(400).json({ message: "Nada para atualizar." })
            }

            const brand = await BrandService.updateBrand(id, brandData)
            return res.status(200).json(brand)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            await BrandService.deleteBrand(id, status)
            return res.status(200).json({ message: "Prateleira excluida com sucesso" })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async index(req, res) {
        try {
            const { companyId } = req.params
            const { status } = req.query;

            const statusFilter = status === "true"
            
            const brands = await BrandService.getAllBrandsByCompanyId(companyId, statusFilter)
            return res.status(200).json(brands)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params

            const brand = await BrandService.getBrandById(id)
            return res.status(200).json(brand)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new BrandController()