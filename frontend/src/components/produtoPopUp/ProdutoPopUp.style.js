import { StyleSheet } from "react-native"
import { COLORS } from "../../constants/tema"

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "flex-end",
    zIndex: 99,
  },
  fab: {
    backgroundColor: COLORS.branco,
    borderRadius: 50,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: COLORS.preto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  menuItem: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "transparent",
    minHeight: 48,
  },
  iconWrapper: {
    backgroundColor: COLORS.branco,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: COLORS.preto,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    color: COLORS.marromEscuro,
    backgroundColor: COLORS.linho,
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 88,
    height: 34,
    borderRadius: 8,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 4,
    marginRight: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.marrom
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContentMenu: {
    width: "85%",
    padding: 20,
    backgroundColor: COLORS.branco,
    borderRadius: 12,
    gap: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.marrom,
  },
  menuProdutoBtn: {
    padding: 10,
    backgroundColor: COLORS.marromEscuro,
    borderRadius: 6,
  },
  menuProdutoBtnText: {
    textAlign: "center",
    color: COLORS.branco,
  },
  menuVariacaoBtn: {
    padding: 10,
    backgroundColor: COLORS.cinzaClaro,
    borderRadius: 6,
  },
  menuVariacaoBtnText: {
    textAlign: "center",
    color: COLORS.marromEscuro,
  },
  menuCancelarBtn: {
    marginTop: 6,
  },
  menuCancelarBtnText: {
    textAlign: "center",
    color: COLORS.cinzaEscuro,
  },
  modalContentVariacao: {
    width: "85%",
    padding: 20,
    backgroundColor: COLORS.branco,
    borderRadius: 12,
  },
  variacaoList: {
    marginTop: 10,
    maxHeight: 300,
  },
  variacaoItem: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  variacaoItemSelected: {
    backgroundColor: COLORS.cinza,
  },
  variacaoBrand: {
    fontWeight: "bold",
    fontSize: 16,
  },
  variacaoColorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  variacaoColorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#999",
  },
  variacaoPrice: {
    fontWeight: "bold",
    fontSize: 14,
  },
  variacaoError: {
    color: COLORS.vermelho,
    textAlign: "center",
    marginTop: 8,
  },
  confirmarBtn: {
    backgroundColor: COLORS.marrom,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  confirmarBtnText: {
    color: COLORS.branco,
    fontWeight: "bold",
    textAlign: "center",
  },
  excluirBtn: {
    backgroundColor: COLORS.vermelho,
  },
  cancelarBtn: {
    marginTop: 8,
  },
  cancelarBtnText: {
    textAlign: "center",
    color: COLORS.cinzaEscuro,
  },
})