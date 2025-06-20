import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../../constants/tema";

const styles = StyleSheet.create({

  container: {
    backgroundColor: COLORS.salMarinho,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingBottom: 90,
  },

  back: {
    backgroundColor: COLORS.marromEscuro,
    height: "30%",
    width: "100%",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },

  imagem: {
    marginTop: 80,
    width: 300,
    height: 200,
    zIndex: 999,
  },

  boxImage: {
    borderBottomWidth: 1,
    borderColor: COLORS.cinzaClaro,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  boxNomePreco: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 6,
  },

  nameProduto: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.cinzaEscuro,
    fontWeight: "700",
  },

  precoProduto: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: COLORS.azulEscuro,
    fontSize: FONT_SIZE.md,
    color: COLORS.branco,
  },

  boxInfoAdicional: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  boxInfo: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 5,
  },

  boxInfoText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.marrom,
  },

  boxInfoLabel: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 13,
    backgroundColor: COLORS.marromClaro,
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
    color: COLORS.branco,
    textAlign: "center",
  },

  boxDescricao: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "left",
    textAlign: "left",
    padding: 15,
    backgroundColor: COLORS.azulEscuro,
    borderRadius: 20,
  },

  boxDescricaoTitulo: {
    color: COLORS.branco,
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    textAlign: "left",
  },

  boxDescricaoLabel: {
    color: COLORS.branco,
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
    textAlign: "left",
  },

  movimentacaoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
  },

  entrada: {
    backgroundColor: COLORS.verdeClaro,
  },

  saida: {
    backgroundColor: COLORS.vermelho,
  },

  movimentacaoText: {
    color: COLORS.branco,
    fontWeight: "bold",
    fontSize: 15,
  },

  estoqueBox: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },

  estoqueLabel: {
    color: COLORS.cinza,
    fontSize: 12,
    marginBottom: 2,
  },

  selectorContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.branco,
    borderRadius: 10,
    padding: 10,
    shadowColor: COLORS.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
    zIndex: 10,
  },

  selectorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomColor: COLORS.cinzaClaro,
  },

  selectorTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.marrom,
  },

  selectorDropdownAbsolute: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    minWidth: "100%",
    backgroundColor: COLORS.branco,
    borderRadius: 10,
    zIndex: 999,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.cinzaClaro,
    padding: 0,
    maxHeight: 220,
    overflow: "hidden",
  },

  selectorItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cinzaClaro,
  },

  selectorItemText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.cinzaEscuro,
  },

  selectorColorItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cinzaClaro,
  },

  selectorColorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cinza,
  },
});

export default styles;