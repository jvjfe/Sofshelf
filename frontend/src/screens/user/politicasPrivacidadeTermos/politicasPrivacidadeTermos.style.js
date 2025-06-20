import { COLORS, FONT_SIZE } from "../../../constants/tema";

const styles = {
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    backgroundColor: COLORS.linho,
    width: "97%",
    height: "85%",
    padding: 20,
    borderRadius: 20,
    borderWidth: 3, 
    borderColor: COLORS.marrom,
    marginTop: 40,
  },

  heading: {
    fontSize: FONT_SIZE.lg, 
    fontWeight: "bold",
    color: COLORS.preto,
    marginBottom: 16,
  },

  subheading: {
    fontSize: FONT_SIZE.sm, 
    fontWeight: 700,
    color: COLORS.preto,
    marginBottom: 16,
  },

  title: {
    fontSize: FONT_SIZE.md, 
    fontWeight: "bold",
    color: COLORS.preto,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.preto,
    marginBottom: 8,
  },

  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.cinzaEscuro,
    marginBottom: 8,
    lineHeight: 24,
  },

  boldText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.preto,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.marrom,
    marginVertical: 15,
  },

  sectionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.cinzaEscuro,
    marginVertical: 5,
  },

  contactText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.marrom,
  },

  highlightedText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.azulEscuro,
  },

  boldListItem: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.preto,
    marginLeft: 10,
  },

  listItem: {
    fontSize: FONT_SIZE.md,
    color: COLORS.cinzaEscuro,
    marginLeft: 20,
    marginBottom: 5,
  },

  smallText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.cinza,
    marginBottom: 8,
  },

  marginBottom: {
    marginBottom: 16,
  },

  section: {
    marginBottom: 24,
  },
};

export default styles;