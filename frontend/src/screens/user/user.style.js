import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = {
  container: {
    width: "100%",
    flex: 1,
    paddingVertical: 20,
    gap: 15,
  },
  image: {
    width: 120,
    height: 120,
  },
  infoProfile: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 3,
  },
  icon: {
    width: "80%",
    fontSize: 115,
    color: COLORS.azulEscuro,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "800",
    color: COLORS.azulEscuro,
  },
  nameF: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.marrom,
  },
  boxInfo: {
    alignItems: "center",
    width: "90%",
    margin: "auto",
    borderTopWidth: 3,
    borderColor: COLORS.marrom,
    borderStyle: "solid",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.azulEscuro,
  },
  textV: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
    color: COLORS.marrom,
  },
}

export default styles
