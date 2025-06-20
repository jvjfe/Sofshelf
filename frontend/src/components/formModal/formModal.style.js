import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: COLORS.branco,
    padding: 20,
    width: 350,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.marrom,
  },
  title: {
    fontSize: FONT_SIZE.md2,
    fontWeight: "bold",
    color: COLORS.marrom,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: COLORS.cinzaClaro,
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  textarea: {
    height: 80,
    borderColor: COLORS.cinzaClaro,
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.marrom,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  buttonText: {
    color: COLORS.branco,
    fontWeight: "bold",
    fontSize: FONT_SIZE.sm,
  },
  buttonClose: {
    backgroundColor: COLORS.cinzaClaro,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonCloseText: {
    color: COLORS.marrom,
    fontWeight: "bold",
    fontSize: FONT_SIZE.sm,
  },
  errorText: {
    color: COLORS.vermelho,
    marginBottom: 10,
  },
})

export default styles
