class UsersValidator {
    static validateCreateAdminUser({ role, email }) {
        if (role !== "admin") {
            throw new Error("Apenas ADMIN pode criar uma empresa")
        }

        if (!email) {
            throw new Error("Email é obrigatório")
        }
    }

    static validateCreateEmployeeUser({ name, email, password, companyEmail }) {
        if (!name || !email || !password || !companyEmail) {
            throw new Error("Todos os campos são obrigatórios")
        }
    }

    static validateAuthenticateUser({ email, password }) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios")
        }
    }

    static validateGetUsersByCompany(companyId) {
        if (!companyId) {
            throw new Error("Empresa não encontrada")
        }
    }
}

export default UsersValidator
