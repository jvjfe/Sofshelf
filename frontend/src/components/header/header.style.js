import { StyleSheet } from "react-native"
import { COLORS } from "../../constants/tema"

const styles = StyleSheet.create({
  Header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.marrom,
    paddingHorizontal: 10,
  },
  icon: {
    paddingBottom: 10,
    fontSize: 40,
    color: COLORS.branco,
    resizeMode: "contain",
  },
  logo: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
})

export default styles