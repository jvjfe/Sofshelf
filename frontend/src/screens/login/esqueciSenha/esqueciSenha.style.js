import { COLORS, FONT_SIZE } from "../../../constants/tema";

export const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: COLORS.branco,
    },
    formGroup: {
        width: "100%",
        marginTop: 15,
        marginBottom: 40
    },
    title: {
        textAlign: 'center',
        fontSize: FONT_SIZE.lg,
        fontWeight: 800,
        marginBottom: 3,
        color: COLORS.marrom
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
        color: COLORS.cinzaEscuro
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.verdeEscuro,
        borderRadius: 6,
        marginBottom: 20,
    },
};