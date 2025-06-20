import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZE } from "../../constants/tema"

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: COLORS.branco,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: FONT_SIZE.md2,
    color: COLORS.marrom,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.marromClaro,
  },
})