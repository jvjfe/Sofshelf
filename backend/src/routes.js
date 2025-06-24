import { Router } from "express"

import users from "./app/controllers/UsersController"
import invite from "./app/controllers/InviteController"
import products from "./app/controllers/ProductsController"
import shelf from "./app/controllers/ShelfController"
import rack from "./app/controllers/RackController"
import history from "./app/controllers/HistoryController"
import embalagem from "./app/controllers/EmbalagemController"
import brand from "./app/controllers/BrandController"
import color from "./app/controllers/ColorController"
import movement from "./app/controllers/MovementController"
import variacao from "./app/controllers/VariacaoController"
import authenticateToken from "./app/middleware/tokenAuth"

const routes = new Router()

routes.post("/login", users.show)
routes.post("/register", users.create)

routes.use(authenticateToken)

routes.get("/users/company/:companyId", users.index)
routes.put("/users/:id", users.update)
routes.delete("/users/:id", users.destroy)
routes.post("/verify", users.password)

routes.post("/invite", invite.create)
routes.get("/invite/user/:userId", invite.indexEmployee)
routes.get("/invite/company/:companyId", invite.index)
routes.put("/invite/accept/:inviteId", invite.accept)
routes.put("/invite/decline/:inviteId", invite.decline)
routes.post("/invite/reapply", invite.reapply)

routes.get("/product/shelf/:shelfId", products.index)
routes.get("/product/company/:companyId", products.indexCompany)
routes.get("/product/:id", products.show)
routes.get("/search/:companyId", products.search)
routes.post("/product", products.create)
routes.put("/product/:id", products.update)
routes.delete("/product/:id", products.destroy)

routes.get("/shelves/rack/:rackId", shelf.index)
routes.get("/shelves/company/:companyId", shelf.indexCompany)
routes.get("/shelves/:id", shelf.show)
routes.post("/shelves", shelf.create)
routes.put("/shelves/:id", shelf.update)
routes.put("/shelves/:id/status", shelf.destroy)

routes.get("/rack/company/:companyId", rack.index)
routes.get("/rack/:id", rack.show)
routes.post("/rack", rack.create)
routes.put("/rack/:id", rack.update)
routes.put("/rack/:id/status", rack.destroy)

routes.get("/embalagem/company/:companyId", embalagem.index)
routes.get("/embalagem/:sigla", embalagem.show)
routes.post("/embalagem", embalagem.create)
routes.put("/embalagem/:id", embalagem.update)
routes.delete("/embalagem/:id", embalagem.destroy)

routes.get("/brands/company/:companyId", brand.index)
routes.get("/brands/:id", brand.show)
routes.post("/brands", brand.create)
routes.put("/brands/:id", brand.update)
routes.delete("/brands/:id", brand.destroy)

routes.get("/colors/company/:companyId", color.index)
routes.get("/colors/:id", color.show)
routes.post("/colors", color.create)
routes.put("/colors/:id", color.update)
routes.delete("/colors/:id", color.destroy)

routes.get("/variacao/product/:productId", variacao.index)
routes.get("/variacao/:id", variacao.show)

routes.post("/movement", movement.create)

routes.get("/history/company/:companyId", history.index)

export default routes
