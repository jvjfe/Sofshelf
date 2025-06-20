import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZE } from "../../../constants/tema"

export default StyleSheet.create({
  rodapeModalWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingBottom: 18,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 1,
    backgroundColor: COLORS.marromEscuro
  },
  estoqueAtualBox: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 4,
  },
  estoqueAtualLabel: {
    color: COLORS.branco,
    fontSize: FONT_SIZE.md,
  },
  estoqueAtualValor: {
    color: COLORS.salMarinho,
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
  },
  rodapeModalBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.marromClaro,
    borderRadius: 22,
    paddingVertical: 13,
    paddingHorizontal: 30,
    marginTop: 6,
    gap: 8,
  },
  rodapeModalBtnText: {
    color: COLORS.branco,
    fontWeight: "bold",
    fontSize: 17,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(96,73,44,0.15)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: COLORS.linho,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.marrom,
    marginBottom: 14,
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
  },
  modalAcaoBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 22,
    marginHorizontal: 2,
    backgroundColor: COLORS.cinzaClaro,
  },
  modalAcaoBtnEntrada: {
    backgroundColor: COLORS.verdeClaro,
  },
  modalAcaoBtnSaida: {
    backgroundColor: COLORS.vermelhoClaro,
  },
  modalAcaoBtnInactive: {
    backgroundColor: COLORS.marrom,
  },
  modalAcaoText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    marginLeft: 7,
    color: COLORS.marromEscuro,
  },
  modalAcaoTextInactive: {
    color: COLORS.branco,
  },
  modalInput: {
    width: 120,
    height: 44,
    backgroundColor: COLORS.branco,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cinzaClaro,
    fontSize: 17,
    color: COLORS.marromEscuro,
    paddingLeft: 12
  },
  modalActionFooter: {
    flexDirection: "row",
    gap: 20,
    marginTop: 16,
  },
  modalFooterBtn: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 26,
    alignItems: "center",
  },
  modalFooterBtnPrimary: {
    backgroundColor: COLORS.verdeClaro,
  },
  modalFooterBtnDanger: {
    backgroundColor: COLORS.vermelhoClaro,
  },
  modalFooterBtnNeutral: {
    backgroundColor: COLORS.cinzaClaro,
  },
  modalFooterText: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.md,
    color: COLORS.branco,
  },
  modalFooterTextNeutral: {
    color: COLORS.marromEscuro,
    fontWeight: "bold",
    fontSize: FONT_SIZE.md,
  },
})