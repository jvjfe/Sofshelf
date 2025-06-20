import { COLORS, FONT_SIZE } from "../../constants/tema";

const styles = {
  header: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },
  logo: {
    width: 210,
    height: 110,
    resizeMode: "cover",
    tintColor: COLORS.cinzaEscuro,
    marginBottom: 10,
  },
  titulo: {
    color: COLORS.marrom,
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitulo: {
    color: COLORS.marrom,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
  },
};

export default styles;