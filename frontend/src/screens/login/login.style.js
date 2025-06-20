import { COLORS, FONT_SIZE } from "../../constants/tema";

const styles = {
  scroll: {
    backgroundColor: COLORS.branco,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginBottom: 8,
  },
  formGroup: {
    width: "100%",
  },
  senha: {
    width: "100%",
    padding: 5,
  },
  senhaText: {
    textAlign: "center",
    fontSize: FONT_SIZE.md,
    color: COLORS.marrom,
    fontWeight: "bold",
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: COLORS.marrom,
    fontSize: FONT_SIZE.md,
    fontWeight: "800",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.marrom,
    paddingBottom: 5,
  },
  errorText: {
    color: COLORS.vermelho,
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
};

export default styles;
