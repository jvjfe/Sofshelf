import RackService from "../services/RackService";
import ShelfService from "../services/ShelfService";
import BrandService from "../services/BrandService";
import ColorService from "../services/ColorService";
import EmbalagemService from "../services/EmbalagemService";
import ProductsService from "../services/ProductsService";

class SeedsDataServices {
    async createDefaultItems(companyId, userId) {
        try {
            const rackPintura = await RackService.createRack({
                name: 'Pintura',
                description: 'Aqui você encontra tudo relacionado a pintura',
                location: 'Corredor 1',
                companyId,
                userId
            });

            const rackEletronicos = await RackService.createRack({
                name: 'Eletrônicos',
                description: 'Aqui você encontra tudo relacionado a eletrônicos',
                location: 'Corredor 2',
                companyId,
                userId
            });

            const shelfTintas = await ShelfService.createShelf({
                name: 'Tintas',
                rackId: rackPintura.id,
                companyId,
                userId
            });

            const shelfRolos = await ShelfService.createShelf({
                name: 'Rolos',
                rackId: rackPintura.id,
                companyId,
                userId
            });

            const shelfCelulares = await ShelfService.createShelf({
                name: 'Celulares',
                rackId: rackEletronicos.id,
                companyId,
                userId
            });

            const shelfNotebooks = await ShelfService.createShelf({
                name: 'Notebooks',
                rackId: rackEletronicos.id,
                companyId,
                userId
            });

            const brandSuvinil = await BrandService.createBrand({
                name: "Suvinil",
                companyId,
                userId
            });

            const brandSamsung = await BrandService.createBrand({
                name: "Samsung",
                companyId,
                userId
            });

            const brandAcer = await BrandService.createBrand({
                name: "Acer",
                companyId,
                userId
            });

            const colorVermelho = await ColorService.createColor({
                name: "Vermelho",
                hexCode: "#FF0000",
                companyId,
                userId
            });

            const colorPreto = await ColorService.createColor({
                name: "Preto",
                hexCode: "#000000",
                companyId,
                userId
            });

            const embalagemCelular = await EmbalagemService.createEmbalagem({
                sigla: "CX",
                name: "Caixa",
                quantity: 1,
                companyId,
                userId
            });

            const embalagemNotebook = await EmbalagemService.createEmbalagem({
                sigla: "LT",
                name: "Lata",
                quantity: 1,
                companyId,
                userId
            });

            const productCelular = await ProductsService.createProduct({
                name: "S25",
                description: "Celular de última geração",
                embalagemSigla: embalagemCelular.embalagem.sigla,
                qtEmbalagem: embalagemCelular.qtEmbalagem.id,
                shelfId: shelfCelulares.id,
                companyId,
                userId,
                variations: [
                    {
                        brandId: brandSamsung.id,
                        price: 2500,
                        colorId: colorPreto.id
                    }
                ]
            });

            const productNotebook = await ProductsService.createProduct({
                name: "Acer Nitro 5",
                description: "Notebook de última geração",
                embalagemSigla: embalagemCelular.embalagem.sigla,
                qtEmbalagem: embalagemCelular.qtEmbalagem.id,
                shelfId: shelfNotebooks.id,
                companyId,
                userId,
                variations: [
                    {
                        brandId: brandAcer.id,
                        price: 4500,
                        colorId: colorPreto.id
                    }
                ]
            });

            return {
                racks: [rackPintura, rackEletronicos],
                shelves: [shelfTintas, shelfRolos, shelfCelulares, shelfNotebooks],
                brands: [brandSuvinil, brandSamsung, brandAcer],
                colors: [colorVermelho, colorPreto],
                embalagens: [embalagemCelular, embalagemNotebook],
                products: [productCelular, productNotebook]
            };
        } catch (error) {
            console.error("Erro ao criar seeds:", error.message);
            throw error;
        }
    }
}

export default new SeedsDataServices();