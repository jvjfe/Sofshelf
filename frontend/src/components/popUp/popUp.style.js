import { COLORS, FONT_SIZE } from '../../constants/tema'

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupCard: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: COLORS.branco,
    borderWidth: 1,
    borderColor: COLORS.marrom,
    padding: 15,
    borderRadius: 10,
    width: 250,
    shadowColor: COLORS.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  },
  popupTitle: {
    fontSize: FONT_SIZE.md2,
    fontWeight: 'bold',
    color: COLORS.marrom,
    textAlign: 'center',
    marginBottom: 10
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.marrom,
    marginVertical: 10
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  optionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.marromEscuro,
    fontWeight: "bold",
    marginLeft: 10
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10
  },
  closeButtonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.marromClaro
  }
}

export default styles
