import { StyleSheet } from "react-native"
import { COLORS } from "../../constants/tema"

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: COLORS.linho,
    borderLeftColor:COLORS.marrom,
    width: "90%",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.marromEscuro,
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    color: COLORS.marrom,
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.branco,
    color: COLORS.preto,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  pickerContainer: {
    backgroundColor: COLORS.branco,
    borderRadius: 8,
    marginBottom: 4,
  },
  picker: {
    color: COLORS.preto,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: COLORS.vermelhoClaro,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: COLORS.verdeClaro,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.branco,
    fontWeight: "bold",
  },
  saveText: {
    color: COLORS.branco,
    fontWeight: "bold",
  },
  errorText: {
    color: COLORS.vermelho,
    fontSize: 12,
    marginTop: 4,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: COLORS.vermelho,
  },
})
