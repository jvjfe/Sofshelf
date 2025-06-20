import InviteService from "../services/InviteService"

class InviteController {
    async create(req, res) {
        try {
            const { companyId, email, name, userId } = req.body
            const invite = await InviteService.createInvite({ companyId, email, name, userId })
            return res.status(201).json(invite)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async indexEmployee(req, res) {
        try {
            const { userId } = req.params
            const invites = await InviteService.getUserInvites(userId)
            return res.status(200).json(invites)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async index(req, res) {
        try {
            const { companyId } = req.params

            const invites = await InviteService.getCompanyInvites(companyId)
            return res.status(200).json(invites)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async accept(req, res) {
        try {
            const { inviteId } = req.params
            const response = await InviteService.acceptInvite(inviteId)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async decline(req, res) {
        try {
            const { inviteId } = req.params
            const invite = await InviteService.declineInvite(inviteId)
            return res.status(200).json(invite)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async reapply(req, res) {
        try {
            const { email } = req.body
            const response = await InviteService.reapplyInvite(email)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default new InviteController()
