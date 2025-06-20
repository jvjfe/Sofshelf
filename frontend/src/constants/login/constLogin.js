import UserService from '../../services/servicesBackend/UserServices'
import InviteService from '../../services/servicesBackend/InviteServices'

export const signIn = async (email, senha, navigation, setIsLoading, setErrorMessage) => {
    setIsLoading(true)
    setErrorMessage("")

    try {
        const authData = await UserService.authenticateUser(email, senha)

        const { message, token: newToken, user } = authData

        if (!user || !newToken) {
            setErrorMessage(message || "Email ou senha inválidos.")
            return
        }

        const { id: userId, name, email: returnedEmail, role, companyId } = user

        if (!role) {
            setErrorMessage("Erro ao identificar o tipo de conta.")
            return
        }

        if (role === "admin") {
            navigation.navigate("home", { userId, name, email: returnedEmail, role, companyId })
            return
        }

        const inviteData = await InviteService.indexEmployee(userId)

        if (!Array.isArray(inviteData) || inviteData.length === 0) {
            setErrorMessage("Você não tem um convite pendente.")
            return
        }

        const currentInvite = inviteData.find(invite => invite.userEmail === returnedEmail)

        if (!currentInvite) {
            setErrorMessage("Você não tem um convite pendente.")
            return
        }

        const status = currentInvite.status

        switch (status) {
            case "PENDING":
            case "DECLINED":
                navigation.navigate("solicitation", { name })
                break
            case "ACCEPTED":
                navigation.navigate("home", { userId, name, email: returnedEmail, role, companyId })
                break
            default:
                setErrorMessage("Status do convite desconhecido.")
                break
        }
    } catch (error) {
        console.error("signIn - Erro na requisição:", error)
        setErrorMessage("Erro ao fazer login.")
    } finally {
        setIsLoading(false)
    }
}