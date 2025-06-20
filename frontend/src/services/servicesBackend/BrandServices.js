import API from "../apiAxios"
import { getToken, getUserData } from "../storageService"

class BrandServices {
    static async createBrand(data) {
        try {
            const token = await getToken()
            const response = await API.post("/brands", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao criar Marca", error)
            throw error
        }
    }

    static async updateBrand(id, data) {
        try {
            const token = await getToken()
            const response = await API.put(`/brands/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar Marca", error)
            throw error
        }
    }

    static async deleteBrand(id) {
        try {
            const token = await getToken()
            const response = await API.delete(`/brands/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao deletar Marca", error)
            throw error
        }
    }

    static async getBrandById(id) {
        try {
            const token = await getToken()
            const response = await API.get(`/brands/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar marca por ID", error)
            throw error
        }
    }

    static async getAllBrandsByCompanyId(status) {
        try {
            const token = await getToken()
            const user = await getUserData()
            const idCompany = user.companyId

            const response = await API.get(`/brands/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("Erro ao buscar todas as marcas por ID da empresa", error)
            throw error
        }
    }

    static async getHistory(status) {   
        try {
            const user = await getUserData()
            const idCompany = user.companyId
            const token = await getToken()


            const { data } = await API.get(`/brands/company/${idCompany}?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return data
        } catch (error) {
            console.error("Erro ao buscar histórico de marcas", error)
            throw error
        }
    }
}

export default BrandServices