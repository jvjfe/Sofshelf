import EmbalagemService from "../services/EmbalagemService"
import ProductsService from "../services/ProductsService"

class ProductsController {

    async create(req, res) {
        const {
            name,
            description,
            embalagemSigla,
            embalagemName,
            qtEmbalagem,
            shelfId,
            companyId,
            userId,
            variations
        } = req.body

        try {
            const { embalagem, qtEmbalagem: qt } = await EmbalagemService.createEmbalagem({
                sigla: embalagemSigla,
                name: embalagemName,
                quantity: parseInt(qtEmbalagem),
                companyId,
                userId
            })

            const product = await ProductsService.createProduct({
                name,
                description,
                embalagemSigla: embalagem.sigla,
                qtEmbalagem: qt.id,
                shelfId,
                companyId,
                userId,
                variations
            })

            return res.status(201).json({
                product,
                embalagem,
                qtEmbalagem: qt
            })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async index(req, res) {
        try {
            const { shelfId } = req.params
            const { status } = req.query

            const statusFilter = status === "true"

            const products = await ProductsService.getAllProductsByShelf(
                shelfId,
                statusFilter
            )

            return res.status(200).json({ products })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async indexCompany(req, res) {
        try {
            const { companyId } = req.params
            const { status } = req.query

            const statusFilter = status === "true"
            const products = await ProductsService.getAllProductsByCompany(
                companyId,
                statusFilter
            )

            return res.status(200).json({ products })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const {
            name,
            description,
            embalagemSigla,
            embalagemName,
            qtEmbalagem,
            shelfId,
            companyId,
            userId,
            updatedVariations,
            newVariations,
            deletedVariationIds
        } = req.body

        try {
            if ((embalagemSigla && embalagemName) || qtEmbalagem) {
                const { embalagem, qtEmbalagem: qt } = await EmbalagemService.createEmbalagem({
                    sigla: embalagemSigla,
                    name: embalagemName,
                    quantity: qtEmbalagem ? parseInt(qtEmbalagem) : undefined,
                    companyId,
                    userId
                })

                req.body.embalagemSigla = embalagem.sigla
                req.body.qtEmbalagem = qt.id
            }

            const updatedProduct = await ProductsService.updateProduct(id, {
                name,
                description,
                embalagemSigla: req.body.embalagemSigla,
                qtEmbalagem: req.body.qtEmbalagem,
                shelfId,
                companyId,
                userId,
                updatedVariations,
                newVariations,
                deletedVariationIds
            })

            return res.status(200).json(updatedProduct)
        } catch (error) {
            console.error('Erro no controller update:', error)
            return res.status(400).json({ error: error.message })
        }
    }

    async destroy(req, res) {
        const { id } = req.params
        const status = req.body?.status ?? false
        console.log("id", id)
        console.log("status", status)

        try {
            const result = await ProductsService.deleteProduct(id, status)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params

            const product = await ProductsService.getProductById(id)

            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado" })
            }

            return res.status(200).json(product)

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    async search(req, res) {
        try {
            const { companyId } = req.params;
            const { search } = req.query;

            if (!search || !companyId) {
                return res.status(400).json({ error: "Parâmetros obrigatórios: search, companyId" });
            }

            const products = await ProductsService.searchProducts({
                companyId,
                searchText: search,
            });

            return res.status(200).json({ products });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

export default new ProductsController()