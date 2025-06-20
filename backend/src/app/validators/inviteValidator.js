import prisma from "../helpers/prisma"

class InviteValidator {
    async validateCreate({ companyId, email }) {
        if (!companyId || !email) {
            throw new Error("companyId e email são obrigatórios.")
        }

        const existingInvite = await prisma.invite.findFirst({
            where: {
                companyId,
                userEmail: email,
                status: "PENDING",
            },
        })

        if (existingInvite) {
            throw new Error("Convite já enviado para este email.")
        }
    }

    async validateAccept(inviteId) {
        if (!inviteId) {
            throw new Error("inviteId é obrigatório.")
        }

        const invite = await prisma.invite.findUnique({
            where: { id: inviteId },
            include: {
                user: true,
                company: true
            }
        })

        if (!invite) {
            throw new Error("Convite não encontrado.")
        }

        if (invite.status === "ACCEPTED") {
            throw new Error("Convite já foi aceito.")
        }

        if (!invite.user) {
            throw new Error("Usuário não encontrado.")
        }

        return invite
    }

    async validateDecline(inviteId) {
        if (!inviteId) {
            throw new Error("inviteId é obrigatório.")
        }

        const invite = await prisma.invite.findUnique({
            where: { id: inviteId }
        })

        if (!invite) {
            throw new Error("Convite não encontrado.")
        }

        if (invite.status !== "PENDING") {
            throw new Error("Convite já foi respondido.")
        }
    }

    async validateReapply(email) {
        if (!email) {
            throw new Error("Email é obrigatório.")
        }

        const invite = await prisma.invite.findFirst({
            where: { userEmail: email }
        })

        if (!invite) {
            throw new Error("Convite não encontrado.")
        }

        return invite
    }
}

export default new InviteValidator()
