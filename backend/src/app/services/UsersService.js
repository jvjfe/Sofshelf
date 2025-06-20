import jwt from "jsonwebtoken"
import prisma from "../helpers/prisma"
import { passwordHash, passwordCompare } from "../helpers/bcrypt"
import SeedDataService from "../config/SeedDataService"
import InviteService from "./InviteService"
import UsersValidator from "../validators/UsersValidator"

class UsersService {
    // Criar usuário como ADMIN
    async createAdminUser({ name, email, password, role, company }) {
        UsersValidator.validateCreateAdminUser({ role, email })

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            throw new Error("Este email já está cadastrado")
        }

        const passHash = await passwordHash(password)

        const newUser = await prisma.user.create({
            data: { name, email, password: passHash, role }
        })

        const newCompany = await prisma.company.create({
            data: { name: company, ownerId: newUser.id, companyEmail: newUser.email }
        })

        await prisma.user.update({
            where: { id: newUser.id },
            data: { companyId: newCompany.id }
        })

        await SeedDataService.createDefaultItems(newCompany.id, newUser.id)

        const userWithCompany = await prisma.user.findUnique({ where: { id: newUser.id }, include: { company: true } })
        return userWithCompany
    }

    // Criar usuário como Funcionário
    async createEmployeeUser({ name, email, password, companyEmail, role = "employee" }) {
        UsersValidator.validateCreateEmployeeUser({ name, email, password, companyEmail })

        const passHash = await passwordHash(password)

        const company = await prisma.company.findFirst({ where: { companyEmail } })
        if (!company) {
            throw new Error("Empresa não encontrada")
        }

        const user = await prisma.user.create({
            data: { name, email, password: passHash, role, companyId: company.id }
        })

        await InviteService.createInvite({
            companyId: company.id,
            email: user.email,
            userId: user.id
        })

        return user
    }

    async updateUser(id, data) {
        try {
            const {
                name,
                email,
                novaSenha,
                senhaAtual
            } = data

            const user = await prisma.user.findUnique({ where: { id } })
            if (!user) {
                throw new Error("Usuário não encontrado")
            }

            const passwordValid = await passwordCompare(senhaAtual, user.password)
            if (!passwordValid) throw new Error("Senha atual incorreta")

            const updateData = {}

            if (name) updateData.name = name
            if (email) updateData.email = email

            if (novaSenha) updateData.password = await passwordHash(novaSenha)

            const updateUser = await prisma.user.update({
                where: { id },
                data: updateData
            })
            return updateUser
        } catch (error) {
            console.error('Erro no UserService.updateUser:', error)
            throw new Error(`Falha ao atualizar o usuário: ${error.message}`)
        }
    }

    // Altentitacar e fazer login do usuário
    async authenticateUser(email, password) {
        UsersValidator.validateAuthenticateUser({ email, password })

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const passwordValid = await passwordCompare(password, user.password)
        if (!passwordValid) {
            throw new Error("Senha incorreta")
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, companyId: user.companyId },
            process.env.JWT_SECRET,
            { expiresIn: "4d" }
        )
        return { user, token }
    }

    // Deletar usuário
    async deleteUser(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { company: true }
        })

        if (!user) throw new Error("Usuário não encontrado")

        if (user.company && user.company.ownerId === id) {
            await prisma.invite.deleteMany({ where: { companyId: user.company.id } })
            await prisma.product.deleteMany({ where: { companyId: user.company.id } })
            await prisma.productType.deleteMany({ where: { companyId: user.company.id } })
            await prisma.brand.deleteMany({ where: { companyId: user.company.id } })
            await prisma.color.deleteMany({ where: { companyId: user.company.id } })
            await prisma.shelf.deleteMany({
                where: {
                    Rack: { companyId: user.company.id }
                }
            })
            await prisma.rack.deleteMany({ where: { companyId: user.company.id } })
            await prisma.company.delete({ where: { id: user.company.id } })
        }

        await prisma.user.delete({ where: { id } })

        return { message: "Conta excluída com sucesso" }
    }

    // Pegar os usuários da company pela role 
    async getUsersByCompany(companyId, role) {
        UsersValidator.validateGetUsersByCompany(companyId)

        const users = await prisma.user.findMany({
            where: { companyId, role },
            select: { id: true, name: true, email: true, createdAt: true }
        })

        return users
    }

    async verifyPassword(id, senha) {

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const passwordValid = await passwordCompare(senha, user.password);
        return passwordValid;
    }
}

export default new UsersService()