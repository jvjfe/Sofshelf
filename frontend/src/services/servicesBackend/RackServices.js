import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class RackServices {
    static async createRack(data) {
        try {
            const token = await getToken()
            const response = await API.post("/rack", data, {
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

    static async updateRack(id, data) {
        try {
            const token = await getToken()
            const response = await API.put(`/rack/${id}`, data, {
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

    static async deleteRack(id, status = true) {
        try {
            const token = await getToken()

            const response = await API.delete(`/rack/${id}`, {
                data: { status },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao reativar Estante", error)
            throw error
        }
    }

    static async getRackById(id) {
        try {
            const token = await getToken()

            const response = await API.get(`/rack/${id}`, {
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
    
    static async getRacksByCompanyId(status) {
        try {
            const token = await getToken()
            const user = await getUserData()
            const companyId = user.companyId

            const response = await API.get(`/rack/company/${companyId}?status=${status}`, {
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

    static async getHistory(status) {
        try {
            const user = await getUserData()
            const idCompany = user.companyId
            const token = await getToken()


            const { data } = await API.get(`/rack/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return data
        } catch (error) {
            console.error("Erro ao buscar estantes por empresa", error)
            throw error
        }
    }
}

export default RackServices