import { StyleSheet, Dimensions } from "react-native"
import { COLORS, FONT_SIZE } from "../../../constants/tema"

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  filtro: {
    alignItems: "center",
    borderColor: COLORS.marrom,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
  },
  filter: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
  },
  seta: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
  },
  pesquisa: {
    width: "100%",
    padding: 10,
    borderColor: COLORS.marrom,
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.branco,
  },
  input: {
    flex: 1,
    color: COLORS.marrom,
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    padding: 2,
  },
  lupa: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.marrom,
    marginLeft: 4,
  },
  boxFilter: {
    position: "absolute",
    top: 90,
    left: 10,
    width: 150,
    backgroundColor: COLORS.branco,
    borderColor: COLORS.marrom,
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
    gap: 5,
    zIndex: 999,
  },
  boxText: {
    color: COLORS.marrom,
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
  },
  btnCheck: { flexDirection: "row", gap: 5, padding: 5 },
})

export const pickerStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 9, 
  },
  dropdown: {
    position: "absolute",
    top: 42,
    left: 0,
    right: 0,
    backgroundColor: COLORS.branco,
    borderWidth: 2,
    borderColor: COLORS.marrom,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 10,
    maxHeight: 180,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: COLORS.cinzaClaro || "#ECECEC",
    borderBottomWidth: 1,
  },
  itemText: {
    fontWeight: "bold",
    color: COLORS.marrom,
    fontSize: 15
  },
  descText: {
    color: COLORS.cinzaEscuro || "#696969",
    fontSize: 13
  }
})

export default styles