import { COLORS, FONT_SIZE } from "../../../constants/tema"

export const styles = {
    container: {
        padding: 20,
        backgroundColor: COLORS.salMarinho,
    },
    inviteCard: {
        marginBottom: 15,
        padding: 20,
        backgroundColor: COLORS.branco,
        borderRadius: 12,
        shadowColor: COLORS.cinza,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: COLORS.linho,
    },
    inviteHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: COLORS.linho,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    icon: {
        marginRight: 10,
        color: COLORS.marromEscuro
    },
    inviteTitle: {
        fontSize: FONT_SIZE.md2,
        color: COLORS.marromClaro,
        fontWeight: "bold",
    },
    inviteDetails: {
        marginBottom: 15,
    },
    inviteText: {
        fontSize: FONT_SIZE.md,
        color: "#333",
        marginBottom: 5,
    },
    label: {
        fontWeight: "bold",
        color: COLORS.preto,
    },
    inviteMessage: {
        fontSize: FONT_SIZE.medium,
        color: COLORS.cinzaEscuro,
        marginBottom: 10,
        fontStyle: "italic",
    },
    statusContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    statusText: {
        fontWeight: "bold",
        fontSize: FONT_SIZE.md,
    },
    pendingStatus: {
        color: "orange",
    },
    acceptedStatus: {
        color: "green",
    },
    recusedStatus: {
        color: "red",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        fontSize: FONT_SIZE.md,
    },
    noInvitesText: {
        textAlign: "center",
        fontSize: FONT_SIZE.md2,
        color: COLORS.cinzaEscuro,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
    },
    acceptButton: {
        backgroundColor: COLORS.verdeClaro,
    },
    declineButton: {
        backgroundColor: COLORS.vermelhoClaro,
    },
    buttonText: {
        color: COLORS.branco,
        fontWeight: "bold",
    },
    navBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: COLORS.branco,
        elevation: 5,
    },
    buttonNav: {
        marginRight: 10,
    },
    navText: {
        fontSize: FONT_SIZE.md2,
        fontWeight: "bold",
        color: COLORS.marrom,
        flex: 1,
        textAlign: "center",
    },
}
