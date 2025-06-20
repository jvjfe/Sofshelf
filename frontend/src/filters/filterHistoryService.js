
import RackServices from './../services/servicesBackend/RackServices'
import ShelfServices from './../services/servicesBackend/ShelfServices'
import ProductServices from './../services/servicesBackend/ProductServices'
import EmbalagemServices from './../services/servicesBackend/EmbalagemServices';
import ColorServices from './../services/servicesBackend/ColorServices';
import BrandServices from './../services/servicesBackend/BrandServices';
import HistoryService from '../services/servicesBackend/HistoryService';

export function filterHistoryService(categoria, acao) {
    const categoriasNormais = ["Rack", "Shelf", "Product", "ProductType", "Color", "Brand"]
    const categoriasAdmin = ["User"]


    if (categoriasNormais.includes(categoria)) {
        if (acao === "create" || acao === "delete") {
            switch (categoria) {
                case "Rack":
                    return {
                        tipo: "normal",
                        service: RackServices,
                        status: acao === "create" ? true : false
                    }
                case "Shelf":
                    return {
                        tipo: "normal",
                        service: ShelfServices,
                        status: acao === "create" ? true : false
                    }
                case "Product":
                    return {
                        tipo: "normal",
                        service: ProductServices,
                        status: acao === "create" ? true : false
                    }
                case "Embalagem":
                    return {
                        tipo: "normal",
                        service: EmbalagemServices,
                        status: acao === "create" ? true : false
                    }
                case "Color":
                    return {
                        tipo: "normal",
                        service: ColorServices,
                        status: acao === "create" ? true : false
                    }
                case "Brand":
                    return {
                        tipo: "normal",
                        service: BrandServices,
                        status: acao === "create" ? true : false
                    }
                default:
                    throw new Error("Categoria inválida ou não suportada.")
            }
        }

        if (acao === "update") {
            return {
                tipo: "normal",
                service: HistoryService
            }
        }
    }

    if (categoriasAdmin.includes(categoria)) {
        return {
            tipo: "admin",
            service: HistoryService
        }
    }

    throw new Error("Categoria inválida ou não suportada.")
}