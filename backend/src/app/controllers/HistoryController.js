import historyService from "../services/HistoryService"  

class HistoryController {
    async index(req, res) {
        const { companyId } = req.params
        const { action, table, page = 1, limit = 10 } = req.query  

        try {
            const history = await historyService.getAllHistoryByCompanyId(
                companyId, 
                table, 
                action, 
                parseInt(page),  
                parseInt(limit)   
            )
            
            res.json({
                data: history,
                nextPage: history.length === parseInt(limit) ? parseInt(page) + 1 : null  
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new HistoryController()
