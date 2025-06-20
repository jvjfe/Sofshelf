import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class MovementServices {
    static async createMovement(data) {
        try {
            const token = await getToken()
            const response = await API.post("/movement", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao criar Movimentção", error)
            throw error
        }
    }
}

export default MovementServices