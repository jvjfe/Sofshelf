import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZE } from "../../../constants/tema"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.salMarinho, 
        padding: 10,
        paddingTop: 60,
        position: "relative"
    },
    botaoOrdenar: {
        padding: 12,
        backgroundColor: COLORS.marrom,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
        zIndex: 2,
    },
    textoBotao: {
        color: COLORS.branco,
        fontWeight: "bold",
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.marrom,
        backgroundColor: COLORS.linho,
        borderRadius: 5,
        marginBottom: 15,
        marginHorizontal: 15
    },
    itemTitulo: {
        fontSize: FONT_SIZE.md2,
        fontWeight: "bold",
    },
    itemDescricao: {
        color: COLORS.cinza,
    },
    itemDestaque: {
        fontWeight: "bold",
        marginTop: 5,
    },
    variacaoCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        marginTop: 6,
        backgroundColor: COLORS.salMarinho,
        borderRadius: 10
    },
    colorPreview: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.cinza
    },
    variacaoTexto: {
        marginRight: 10,
        fontSize: FONT_SIZE.sm,
        color: COLORS.cinzaEscuro
    },
    variacaoPreco: {
        marginLeft: "auto",
        fontWeight: "bold",
        fontSize: FONT_SIZE.sm,
        color: COLORS.preto
    },
    popupButton: {
        position: "absolute",
        bottom: 40,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.marrom,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 99,
    },
})

export default styles