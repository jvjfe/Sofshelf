export const MovementValidator = ({ productId, productPrice, quantity, action, isEmbalagem, companyId, userId }) => {

    if (productId === undefined || productPrice === undefined || quantity === undefined || action === undefined || isEmbalagem === undefined || companyId === undefined || userId === undefined) {
        throw new Error("Todos os campos são obrigatórios")
    }

    if (quantity <= 0) {
        throw new Error("A quantidade deve ser maior que zero")
    }

    if (!["entrada", "saida"].includes(action)) {
        throw new Error("A ação deve ser 'entrada' ou 'saida'")
    }
}