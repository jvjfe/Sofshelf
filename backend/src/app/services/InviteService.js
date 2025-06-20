import prisma from "../helpers/prisma"
import InviteValidator from "../validators/inviteValidator"

class InviteService {
    // Criar convite/solicitação
    static async createInvite(data) {
        await InviteValidator.validateCreate(data)

        const { companyId, email, name, userId } = data

        return await prisma.invite.create({
            data: {
                companyId,
                name,
                userEmail: email,
                status: "PENDING",
                userId,
            },
        })
    }

    // Pegar solicitações pelo ID do user
    static async getUserInvites(userId) {
        return await prisma.invite.findMany({
            where: { userId },
            include: { company: true },
            orderBy: { createdAt: "desc" },
        })
    }

    // Pegar solicitações pelo ID da empresa
    static async getCompanyInvites(companyId) {

        return await prisma.invite.findMany({
            where: { companyId },
            orderBy: { createdAt: "desc" },
            include: { user: true, company: true },
        })
    }

    // Função para caso a solicitações for aceita
    static async acceptInvite(inviteId) {

        const invite = await InviteValidator.validateAccept(inviteId)

        const updatedUser = await prisma.user.update({
            where: { id: invite.userId },
            data: { companyId: invite.companyId },
        })

        const updatedInvite = await prisma.invite.update({
            where: { id: inviteId },
            data: {
                status: "ACCEPTED",
                acceptedAt: new Date(),
            },
        })

        return {
            message: "Convite aceito com sucesso!",
            user: updatedUser,
            invite: updatedInvite
        }
    }

    // Função caso solicitação for recusada
    static async declineInvite(inviteId) {
        await InviteValidator.validateDecline(inviteId)

        const updatedInvite = await prisma.invite.update({
            where: { id: inviteId },
            data: { status: "DECLINED" },
        })

        await prisma.user.update({
            where: { id: updatedInvite.userId },
            data: { companyId: null }
        })

        return updatedInvite
    }

    // Reenviar solicitação
    static async reapplyInvite(data) {
        const { email } = data
        const invite = await InviteValidator.validateReapply(email)

        await prisma.invite.update({
            where: { id: invite.id },
            data: { status: "PENDING" },
        })

        return { message: "Convite reenviado com sucesso!" }
    }
}
export default InviteService