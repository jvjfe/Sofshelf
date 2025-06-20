import { StyleSheet } from "react-native"
import { COLORS } from "../../constants/tema"

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    backgroundColor: COLORS.branco,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 350
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.marrom
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.marrom
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cancelButton: {
    backgroundColor: COLORS.cinza,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: COLORS.vermelho,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: COLORS.branco,
    fontSize: 16,
    fontWeight: "bold"
  }
})

export default styles
