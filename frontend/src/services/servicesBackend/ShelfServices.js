import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class ShelfServices {
    static async createShelf(data) {
        try {
            const token = await getToken()
            const response = await API.post("/shelves", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao criar Estante", error)
            throw error
        }
    }

    static async updateShelf(id, data) {
        try {
            const token = await getToken()
            const response = await API.put(`/shelves/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar Estante", error)
            throw error
        }
    }

    static async deleteShelf(id, status = false) {
        try {
            const token = await getToken()
            const response = await API.delete(`/shelves/${id}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao deletar Estante", error)
            throw error
        }
    }

    static async getShelfById(id) {
        try {
            const token = await getToken()
            const response = await API.get(`/shelves/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar estante por ID", error)
            throw error
        }
    }

    static async getShelfByRackId(rackId, status = true) {
        try {

            const token = await getToken()
            const response = await API.get(`/shelves/rack/${rackId}?status=${status}`, {

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar estantes por ID da estante", error)
            throw error
        }
    }

    static async getHistory(status) {
        try {
            const token = await getToken()
            const user = await getUserData()
            const idCompany = user.companyId


            const response = await API.get(`/shelves/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar estantes por empresa", error)
            throw error
        }
    }
}

export default ShelfServices