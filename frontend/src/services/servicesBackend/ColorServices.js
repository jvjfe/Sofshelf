import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class ColorServices {
    static async createColor(data) {
        try {
            const token = await getToken()
            const response = await API.post("/colors", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao criar Cor", error)
            throw error
        }
    }

    static async updateColor(id, data) {
        try {
            const token = await getToken()
            const response = await API.put(`/colors/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar Cor", error)
            throw error
        }
    }

    static async deleteColor(id) {
        try {
            const token = await getToken()
            const response = await API.delete(`/colors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao deletar Cor", error)
            throw error
        }
    }

    static async getColorById(id) {
        try {
            const token = await getToken()
            const response = await API.get(`/colors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar cor por ID", error)
            throw error
        }
    }

    static async getAllColorsByCompanyId(status) {
        try {
            const token = await getToken()
            const user = await getUserData()
            const idCompany = user.companyId 

            const response = await API.get(`/colors/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar todas as cores por ID da empresa", error)
            throw error
        }
    }

    static async getHistory(status) {
        try {
            const user = await getUserData()
            const idCompany = user.companyId
            const token = await getToken()

            const response = await API.get(`/colors/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar cores por empresa", error)
            throw error
        }
    }
}

export default ColorServices