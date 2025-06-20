import API from "../apiAxios"
import { getToken } from "../storageService"

class InviteService {
    static async index(companyId) {
        try {
            const token = await getToken()

            const response = await API.get(`/invite/company/${companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            console.error("InviteService.index - error:", error)
            throw error
        }
    }

    static async indexEmployee(userId) {
        try {
            const token = await getToken()

            const response = await API.get(`/invite/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            return response.data
        } catch (error) {
            console.error("InviteService.indexEmployee - error:", error)
            throw error
        }
    }

    static async accept(inviteId) {
        try {
            const token = await getToken()

            const response = await API.put(`/invite/accept/${inviteId}`, {
                status: "ACCEPTED",
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data
        } catch (error) {
            console.error("InviteService.accept - error:", error)
            throw error
        }
    }

    static async decline(inviteId) {
        try {
            const token = await getToken()

            const response = await API.put(`/invite/decline/${inviteId}`, {
                status: "DECLINED",
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data
        } catch (error) {
            console.error("InviteService.decline - error:", error)
            throw error
        }
    }

    static async reapply({ email }) {
        try {
            const token = await getToken()

            const response = await API.post(`/invite/reapply`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            return response.data
        } catch (error) {
            console.error("InviteService.reapply - error:", error)
            throw error
        }
    }
}

export default InviteService