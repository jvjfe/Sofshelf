import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = {
  input: {
    width: "100%",
    backgroundColor: COLORS.branco,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.verdeEscuro,
  },
  inputWithIcon: {
    paddingLeft: 35,
  },
  label: {
    marginLeft: 5,
    color: COLORS.marrom,
    fontSize: FONT_SIZE.md,
    marginBottom: 4,
  },
  icon: {
    alignItems: "center",
    position: "absolute",
    left: 10,
  },
}

export default styles