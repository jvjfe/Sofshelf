import prisma from "../helpers/prisma";

class HistoryService {
    async getAllHistoryByCompanyId(companyId, table, action, page = 1, limit = 10) {
        try {
            const filter = { companyId };

            if (table) {
                filter.table = table;
            }

            if (action) {
                filter.action = action;
            }

            const skip = (page - 1) * limit;

            // Busca o histórico
            const history = await prisma.history.findMany({
                where: filter,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                },
            });

            const historyWithItems = await Promise.all(
                history.map(async (entry) => {
                    let item = null;

                    if (entry.table === "Rack") {
                        item = await prisma.rack.findUnique({
                            where: { id: entry.itemId },
                            select: { name: true, description: true, location: true },
                        });
                    } else if (entry.table === "Product") {
                        item = await prisma.product.findUnique({
                            where: { id: entry.itemId },
                            select: { name: true, description: true },
                        });
                    } else if (entry.table === "Shelf") {
                        item = await prisma.shelf.findUnique({
                            where: { id: entry.itemId },
                            select: { name: true },
                        });
                    }

                    return { ...entry, item };
                })
            );

            return historyWithItems;
        } catch (error) {
            throw new Error(`Falha ao buscar históricos: ${error.message}`);
        }
    }
}

export default new HistoryService();