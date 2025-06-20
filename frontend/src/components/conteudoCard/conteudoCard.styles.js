import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = {
  conteudoCard: {
    width: 130,
    height: 120,
    backgroundColor: COLORS.marromClaro,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.cinzaEscuro,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  imageCard: {
    width: "100%",
    height: "83%",
    resizeMode: "cover",
    borderRadius: 5,
    borderColor: COLORS.cinzaEscuro,
    borderWidth: 1,
    backgroundColor: COLORS.linho,
  },
  textCard: {
    height: 20,
    fontSize: FONT_SIZE.sm,
    fontWeight: "bold",
    textAlign: "center",
  },
}

export default styles