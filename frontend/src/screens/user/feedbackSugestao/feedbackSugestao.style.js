import { COLORS, FONT_SIZE } from "../../../constants/tema";

const styles = {
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 30,
    alignItems: "center",
  },
  top: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: "cover",
    marginTop: 20,
  },
  topText: {
    color: COLORS.marrom,
    fontSize: FONT_SIZE.lg2,
    fontWeight: 900,
    textAlign: "center",
  },
  boxLine: {
    width: "100%",
    alignItems: "center",
  },
  textLine: {
    color: COLORS.marrom,
    fontSize: FONT_SIZE.sm,
    fontWeight: 600,
  },
  line: {
    width: "55%",
    paddingTop: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.marrom,
  },
  menssage: {
    width: "90%",
    backgroundColor: COLORS.linho,
    padding: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    fontSize: FONT_SIZE.md,
    color: COLORS.marrom,
  },
  estrelas: {
    flexDirection: "row",
    gap: 5,
  },
  star: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.marrom,
    padding: 5,
  },
  boxTema: {
    gap: 5,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  topico: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: COLORS.linho,
    alignItems: "center",
  },
  topicText: {
    textAlign: "center",
    fontSize: FONT_SIZE.sm,
  },
};

export default styles;
