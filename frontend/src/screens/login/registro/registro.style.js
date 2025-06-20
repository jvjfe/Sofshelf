import { COLORS, FONT_SIZE } from "../../../constants/tema"

export const styles = {
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    paddingLeft: 40,
    paddingRight: 40,
  },
  form: {
    width: "100%",
    marginBottom: 17,
  },
  formGroup: {
    width: "100%",
    marginTop: 27,
    marginBottom: 40,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    marginBottom: 25,
  },
  footerText: {
    textAlign: "center",
    color: COLORS.marrom,
    fontSize: FONT_SIZE.md,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    backgroundColor: COLORS.salMarinho,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: COLORS.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.marrom,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    width: '100%',
    fontSize: FONT_SIZE.md,
    color: COLORS.amarelo,
    backgroundColor: COLORS.branco,
  }
};
