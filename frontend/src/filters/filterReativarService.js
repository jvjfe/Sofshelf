import RackServices from "../services/servicesBackend/RackServices"
import ShelfServices from "../services/servicesBackend/ShelfServices"
import ProductServices from "../services/servicesBackend/ProductServices"
import EmbalagemServices from "../services/servicesBackend/EmbalagemServices"
import ColorServices from "../services/servicesBackend/ColorServices"
import BrandServices from "../services/servicesBackend/BrandServices"

export function filterReativarService(categoria) {
    const categorias = ["Rack", "Shelf", "Product", "ProductType", "Color", "Brand"]

    if (categorias.includes(categoria)) {
        switch (categoria) {
            case "Rack":
                return {
                    service: RackServices,
                    method: 'deleteRack',
                }
            case "Shelf":
                return {
                    service: ShelfServices,
                    method: 'deleteShelf',
                }
            case "Product":
                return {
                    service: ProductServices,
                    method: 'deleteProduct',
                }
            case "Embalagem":
                return {
                    service: EmbalagemServices,
                    method: 'deleteEmbalagem',
                }
            case "Color":
                return {
                    service: ColorServices,
                    method: 'deleteColor',
                }
            case "Brand":
                return {
                    service: BrandServices,
                    method: 'deleteBrand',
                }
            default:
                throw new Error("Categoria inválida ou não suportada.")

        }
    }

    throw new Error("Categoria inválida ou não suportada.")
}