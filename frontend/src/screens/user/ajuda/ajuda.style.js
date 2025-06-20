import { COLORS, FONT_SIZE } from "../../../constants/tema";

const styles = {
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    paddingVertical: 100,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 800,
    color: COLORS.azulEscuro,
    textAlign: "left",
  },
  contato: {
    flexDirection: "row",
    width: "100%",
    gap: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.marrom,
    fontSize: FONT_SIZE.md,
    fontWeight: 700,
  },
};

export default styles;
