import { COLORS, FONT_SIZE } from "../../constants/tema";

const styles = {
  btnBack: {
    position: "absolute",
    top: 10,
    left: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 999,
  },
  text: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "800",
    color: COLORS.marrom,
    textAlign: "center",
  },
  icon: {
    color: COLORS.marrom,
  },
  textLight: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "800",
    color: COLORS.branco,
    textAlign: "center",
  },
  iconLight: {
    color: COLORS.branco,
  },
};

export default styles;
