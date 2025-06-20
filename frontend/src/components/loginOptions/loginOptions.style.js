import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = {
  boxItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "start",
    paddingVertical: 15,
    gap: 10,
  },
  icon: {
    fontSize: FONT_SIZE.lg2,
    color: COLORS.azulEscuro,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.marrom, 
    fontWeight: "600",
  },
}

export default styles
