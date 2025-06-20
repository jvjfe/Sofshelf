import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/tema";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.salMarinho,
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.marrom,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 15,
        shadowColor: COLORS.preto,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonText: {
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
        color: COLORS.branco,
        marginLeft: 8,
    },
    buttonFull: {
        width: "100%",
    },
    buttonHalf: {
        width: "48%",
    },
    line: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.marromEscuro,
        paddingBottom: 5,
        marginBottom: 10,
    },
    lineT: {
        fontSize: FONT_SIZE.md2,
        fontWeight: "bold",
        color: COLORS.marromEscuro,
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: COLORS.branco,
        elevation: 5,
    },
    buttonNav: {
        marginRight: 10,
    },
    navText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "bold",
        color: COLORS.marrom,
        textAlign: "center",
        flex: 1,
        marginLeft: 20,
    },
    admContainer: {
        backgroundColor: COLORS.linho,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 20,
    },
});

export default styles;
