import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class EmbalagemServices {
    static async createEmbalagem(data) {
        try {
            const token = await getToken()
            const response = await API.post("/embalagem", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao criar Tipo", error)
            throw error
        }
    }

    static async updateEmbalagem(id, data) {
        try {
            const token = await getToken()
            const response = await API.put(`/embalagem/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar Tipo", error)
            throw error
        }
    }

    static async deleteEmbalagem(id) {
        try {
            const token = await getToken()
            const response = await API.delete(`/embalagem/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao deletar Tipo", error)
            throw error
        }
    }

    static async getEmbalagemBySigla(sigla) {
        try {
            const token = await getToken()
            const response = await API.get(`/embalagem/${sigla}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar tipo por ID", error)
            throw error
        }
    }

    static async getAllEmbalagemByCompanyId(status) {
        try {
            const user = await getUserData()
            const token = await getToken()
            const idCompany = user.companyId

            const response = await API.get(`/embalagem/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar todos os tipos por companyId", error)
            throw error
        }
    }

    static async getHistory(status) {
        try {
            const user = await getUserData()
            const token = await getToken()
            const idCompany = user.companyId

            const response = await API.get(`/embalagem/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar todos os tipos por companyId", error)
            throw error
        }
    }
}

export default EmbalagemServices