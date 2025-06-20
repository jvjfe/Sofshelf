import API from "../../services/apiAxios"
import { getToken, getUserData } from "../storageService"

const HistoryService = {
    async getHistory(categoria, acao) {
        const user = await getUserData()
        const idCompany = user.companyId
        const token = await getToken()

        let url;

        if (acao === "update") {
            url = `/history/company/${idCompany}?table=${categoria}&action=${acao}`
        } else {
            throw new Error("Ação inválida ou não suportada.")
        }

        const { data } = await API.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return data
    },

    async getEmployees() {
        const user = await getUserData()
        const idCompany = user.companyId
        const token = await getToken()

        const { data } = await API.get(`/users/company/${idCompany}?role=employee`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return data
    },
}

export default HistoryService