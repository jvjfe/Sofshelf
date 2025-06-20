import prisma from "../helpers/prisma"

prisma.$use(async (params, next) => {
    const result = await next(params)


    if (['History', 'Invite', 'ProductPrice'].includes(params.model)) {
        return result
    }

    const actions = ['create', 'update', 'delete']
    if (!actions.includes(params.action)) {
        return result
    }

    const table = params.model
    const action = params.action
    let itemId = null

    if (action === 'create') {
        itemId = result.id
    } else if (action === 'update' || action === 'delete') {
        itemId = params.args.where?.id || params.args.data?.id
    }

    if (!itemId) return result

    if (table === 'User' && action === 'create') {
        const historyData = {
            action,
            table,
            itemId,
            user: { connect: { id: result.id } }
        }

        await prisma.history.create({ data: historyData })
        return result
    }

    if (table === 'Company' && action === 'create') {
        const companyHistoryData = {
            action,
            table,
            itemId,
            company: { connect: { id: result.id } },
            user: { connect: { id: result.ownerId } }
        }

        await prisma.history.create({ data: companyHistoryData })

        const userHistory = await prisma.history.findFirst({
            where: {
                table: 'User',
                action: 'create',
                user: { id: result.ownerId },
            }
        })

        if (userHistory) {
            await prisma.history.update({
                where: { id: userHistory.id },
                data: {
                    company: { connect: { id: result.id } }
                }
            })
        }

        return result
    }

    if (table === 'Invite' && (action === 'create' || action === 'update')) {
        return result
    }

    const data = params.args?.data ?? {}

    const companyId = data.companyId || result.companyId || null
    const userId = data.userId || result.userId || null


    if (!companyId || !userId) {
        return result
    }

    const historyData = {
        action,
        table,
        itemId,
        company: { connect: { id: companyId } },
        user: { connect: { id: userId } }
    }

    await prisma.history.create({ data: historyData })
    return result
})