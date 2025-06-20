import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZE } from "../../../constants/tema"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "stretch",
    backgroundColor: COLORS.salMarinho,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.marrom,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.cinza,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: COLORS.cinzaEscuro,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.branco,
  },
  line: {
    width: "100%",
    borderColor: COLORS.marrom,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  lineT: {
    fontSize: FONT_SIZE.md2,
    color: COLORS.marromEscuro,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: COLORS.branco,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.cinza,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.marrom,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemText: {
    fontSize: FONT_SIZE.md2,
    fontWeight: "bold",
    color: COLORS.marrom,
    flex: 1,
  },
  itemDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.cinza,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
    color: COLORS.cinzaEscuro,
  },
  value: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.cinza,
    flex: 1,
  },
  expandButton: {
    paddingHorizontal: 10,
  },
  expandButtonText: {
    fontSize: 20,
    color: COLORS.cinzaEscuro,
  },
  scroll: {
    paddingVertical: 15,
    alignItems: "stretch",
    justifyContent: "center",
    gap: 15,
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
  itemLoading: {
    fontSize: FONT_SIZE.md2,
    fontWeight: "bold",
    color: COLORS.vermelhoClaro,
    textAlign: "center",
  },
  reactivateButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: COLORS.caramelo,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.verdeClaro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  reactivateButtonText: {
    color: COLORS.branco,
    fontWeight: "bold",
    fontSize: FONT_SIZE.md,
    letterSpacing: 0.5,
  },
  statusAtivo: {
    color: COLORS.verdeClaro,
    fontWeight: 'bold'
  },
  statusDesativado: {
    color: COLORS.vermelho,
    fontWeight: 'bold'
  },
  successMessageBox: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  successMessageText: {
    color: COLORS.verdeClaro,
    fontWeight: "bold",
    fontSize: FONT_SIZE.md,
  },
})

export default styles