import { COLORS, FONT_SIZE } from "../../constants/tema"

const styles = {
  PerContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.marrom,
    zIndex: 999,
  },
  permissao: {
    zIndex: 999,
    width: 300,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.marrom,
  },
  textP: {
    width: "85%",
    color: COLORS.marrom,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
    fontWeight: 700,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.marrom,
    alignItems: "center",
    justifyContent: "center",
  },
  topControlsContainer: {
    height: 70,
    backgroundColor: COLORS.marrom,
    flexDirection: "row",
    gap: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.marrom,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: "row",
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: COLORS.marrom,
    flexDirection: "row",
    alignItems: "center",
    gap: "20%",
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: "#FFF",
    borderWidth: 2,
  },
}

export default styles
