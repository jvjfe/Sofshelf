import UserService from "../../../services/servicesBackend/UserServices";
import { setToken, setUserData } from "../../../services/storageService";

export const signUp = async (
    nome,
    email,
    senha1,
    senha2,
    role,
    empresaNome = null,
    empresaEmail = null,
    navigation,
    setIsLoading,
    setErrorMessage
) => {
    if (senha1 !== senha2) {
        setErrorMessage("As senhas não coincidem.");
        return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
        let userData = { name: nome, email, password: senha1, confirmPassword: senha2, role };

        if (role === "employee" && empresaEmail) {
            userData.companyEmail = empresaEmail;
        }
        if (role === "admin" && empresaNome) {
            userData.company = empresaNome;
        }

        await UserService.createUser(userData);

        if (role === "employee") {
            const { user, token } = await UserService.authenticateUser(email, senha1);
            await setToken(token);
            await setUserData(user);
            navigation.navigate("solicitation", { name: user.name });
        } else {
            navigation.navigate("login", { role, email: userData.email, senha: senha1 });
        }
    } catch (error) {
        const backendError = error?.response?.data?.error;
        setErrorMessage(backendError || "Erro ao registrar usuário.");
    } finally {
        setIsLoading(false);
    }
};