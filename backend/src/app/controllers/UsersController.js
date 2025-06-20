import UsersService from "../services/UsersService"

class UsersController {
    async index(req, res) {
        try {
            const { companyId } = req.user
            const { role } = req.query

            const users = await UsersService.getUsersByCompany(companyId, role)
            return res.json(users)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async show(req, res) {
        const { email, password } = req.body
        try {
            const { user, token } = await UsersService.authenticateUser(email, password)
            return res.status(200).json({ message: "Login bem-sucedido", user, token })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async create(req, res) {
        const { name, email, password, confirmPassword, role, company, companyEmail } = req.body

        try {
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "As senhas não coincidem" })
            }

            let user
            if (role === "admin") {
                user = await UsersService.createAdminUser({ name, email, password, role, company })
            } else if (role === "employee") {
                user = await UsersService.createEmployeeUser({ name, email, password, companyEmail })
            } else {
                return res.status(400).json({ error: "Role inválido" })
            }

            return res.status(201).json(user)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const id = req.params.id
        const { senhaAtual, ...campos } = req.body

        if (!senhaAtual) {
            return res.status(400).json({ error: "Senha atual obrigatória para atualizar os dados" })
        }

        try {
            const user = await UsersService.updateUser(id, { ...campos, senhaAtual })
            return res.status(200).json(user)
        } catch (error) {
            console.error('Erro no UsersController.update:', error)
            return res.status(500).json({ error: "Erro ao atualizar usuário" })
        }
    }

    async destroy(req, res) {
        const id = req.params.id
        if (!id) return res.status(400).json({ error: "ID inválido" })

        try {
            const result = await UsersService.deleteUser(id)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    async password(req, res) {
        try {
            const { senha, userId } = req.body

            if (!senha) return res.status(400).json({ error: "Senha obrigatória." })

            const valido = await UsersService.verifyPassword(userId, senha)
            if (!valido) return res.status(401).json({ error: "Senha incorreta." })

            return res.status(200).json({ message: "Senha válida" })
        } catch (error) {
            console.error("UsersController.password - error:", error)
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new UsersController()