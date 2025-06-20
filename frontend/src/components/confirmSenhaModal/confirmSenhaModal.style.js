import { StyleSheet } from "react-native"
import { COLORS } from "../../constants/tema"

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0008",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: COLORS.branco,
        padding: 24,
        borderRadius: 10,
        width: 320,
        elevation: 4
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center"
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.cinzaClaro,
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fff"
    },
    eyeButton: {
        marginLeft: -36,
        padding: 10,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 6
    },
    btn: {
        backgroundColor: COLORS.marromEscuro,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        minWidth: 110,
        alignItems: "center"
    },
    btnCancel: {
        backgroundColor: COLORS.cinza
    },
    btnText: {
        color: COLORS.branco,
        fontWeight: "bold"
    },
    error: {
        color: COLORS.vermelho,
        marginBottom: 8
    }
})

export default styles