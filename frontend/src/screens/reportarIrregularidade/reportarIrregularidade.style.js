import { COLORS, FONT_SIZE } from "../../constants/tema";

const style = {
  scroll: {
    backgroundColor: COLORS.branco,
  },
  container: {
    width: "100%",
    flex: 1,
    padding: 10,
    paddingTop: 70,
    gap: 35,
    alignItems: "center",
  },
  top: {
    width: "110%",
    alignItems: "center",
    gap: 3,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.marrom,
    fontWeight: 600,
  },
  subTitle: {
    color: COLORS.marrom,
    width: "80%",
    textAlign: "center",
  },
  menssage: {
    width: "90%",
    backgroundColor: COLORS.linho,
    padding: 10,
    paddingBottom: 5,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    fontSize: FONT_SIZE.md,
    color: COLORS.marrom,
  },
  calendario: {
    borderRadius: 10,
  },
  btnCalender: {
    borderWidth: 3,
    borderRadius: 12,
    borderColor: COLORS.marrom,
    height: 50,
    paddingLeft: 8,
    fontSize: FONT_SIZE.lg,
    backgroundColor: COLORS.linho,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  buttonCam: {
    width: 65,
    height: 65,
    borderRadius: 15,
    backgroundColor: COLORS.marrom,
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.branco,
  },
  camGa: {
    fontSize: 40,
    color: COLORS.branco,
  },
};

export default style;
