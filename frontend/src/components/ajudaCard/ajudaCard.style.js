import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = {
  card: {
    width: 400,
    padding: 15,
    borderWidth: 2,
    borderColor: COLORS.marrom,
    borderRadius: 20,
    gap: 30,
  },
  logo: {
    width: 80,
    height: 80,
  },
  top: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: COLORS.marrom,
    borderRadius: 90,
    position: "absolute",
    bottom: 0,
  },
  topTitle: {
    fontWeight: 800,
    color: COLORS.azulEscuro,
    textAlign: "center",
  },
  boxItem: {
    borderTopWidth: 1,
    borderColor: COLORS.cinzaEscuro,
    borderRadius: 30,
    justifyContent: "left",
    paddingVertical: 20,
    gap: 10,
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 0,
    color: COLORS.azulEscuro,
    fontSize: FONT_SIZE.xlg,
  },
  item: {
    width: "85%",
    marginLeft: 40,
    marginBottom: 15,
  },
  titulo: {
    fontSize: FONT_SIZE.md,
    fontWeight: 800,
    color: COLORS.marrom,
    marginBottom: 5,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 400,
    color: COLORS.marrom,
  },
}

export default styles