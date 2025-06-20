import { COLORS, FONT_SIZE } from "../../constants/tema";
const styles = {
  infoProfile: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "start",
    paddingVertical: 15,
    gap: 10,
    borderTopWidth: 1,
    borderColor: COLORS.marrom,
    borderStyle: "solid",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 60,
    color: COLORS.azulEscuro,
  },
  box:{
    flexWrap: "wrap", 
  },
  title: {
    fontSize: FONT_SIZE.md,
    color: COLORS.marrom,
    fontWeight: "600",
  },
  subTitle: {
    maxWidth: "95%",
    fontSize: FONT_SIZE.sm,
    fontWeight: "400",
    color: COLORS.marrom,
  },
};

export default styles;