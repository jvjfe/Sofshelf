import API from "../apiAxios"
import { getToken, setToken, setUserData } from "../storageService"

class UserService {

    static async getUsersByCompany(companyId, role) {
        try {
            const token = await getToken()
            const url = role
                ? `/users/company/${companyId}?role=${role}`
                : `/users/company/${companyId}`;
            const response = await API.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error("UserService.getUsersByCompany - error:", error)
            throw error
        }
    }

    static async createUser(data) {
        try {
            const response = await API.post("/register", data)
            if (response.data.token) await setToken(response.data.token)
            if (response.data) await setUserData(response.data)
            return response.data
        } catch (error) {
            console.error("UserService.createUser - error:", error)
            throw error
        }
    }

    static async authenticateUser(email, password) {
        try {
            const response = await API.post("/login", { email, password })
            const { token, user } = response.data
            if (token && user) {
                await setToken(token)
                await setUserData(user)
            }
            return response.data
        } catch (error) {
            console.error("UserService.authenticateUser - error:", error)
            throw error
        }
    }

    static async updateUser(id, { name, email, senhaAtual, novaSenha }) {
        try {
            const token = await getToken();
            const body = {};
            if (name) body.name = name;
            if (email) body.email = email;
            if (senhaAtual) body.senhaAtual = senhaAtual;
            if (novaSenha) body.novaSenha = novaSenha;
            const response = await API.put(`/users/${id}`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const token = await getToken()
            const response = await API.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("UserService.deleteUser - error:", error)
            throw error
        }
    }

    static async getHistory(companyId, role) {
        try {
            const token = await getToken()
            const response = await API.get(`/users/company/${companyId}?role=${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("UserService.getHistory - error:", error)
            throw error
        }
    }

    static async verifyPassword({ senha, userId }) {
        try {
            const token = await getToken()
            const response = await API.post("/verify", { senha, userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        } catch (error) {
            console.error("UserService.verifyPassword - error:", error)
            throw error
        }
    }

}

export default UserService