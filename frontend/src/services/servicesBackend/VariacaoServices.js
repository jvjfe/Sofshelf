import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class VariacaoServices {
    static async getVariacaoById(id) {
        try {
            const token = await getToken()
            const response = await API.get(`/variacao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar variação por ID", error)
            throw error
        }
    }

    static async getVariacaoByProductId(productId) {
        try {
            const token = await getToken()
            const response = await API.get(`/variacao/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar todas as variações pelo ID do produto", error)
            throw error
        }
    }
}

export default VariacaoServices