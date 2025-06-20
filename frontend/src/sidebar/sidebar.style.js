import { COLORS, FONT_SIZE } from "../constants/tema";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconHeader: {
    width: "80%",
    height: 100,
    tintColor: COLORS.marrom,
    marginTop: 30,
  },
  closeButton: {
    position: "absolute",
    right: -30,
    bottom: 40,
    padding: 10,
    borderRadius: 25,
  },
  menu: {
    flex: 0,
    paddingHorizontal: 5,
    marginTop: 50
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    gap: 5,
  },
  menuIcon: {
    alignItems: "center",
    width: 30,
    height: 30,
    marginLeft: 3,
    resizeMode: "contain",
  },
  menuText: {
    width: "90%",
    fontSize: FONT_SIZE.md,
    color: COLORS.marrom,
    fontWeight: "bold",
  },
  menuButton: {
    marginLeft: 20,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.cinzaEscuro,
    marginVertical: 8,
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: FONT_SIZE.md2,
    color: COLORS.marrom,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerIconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  headerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  logo: {
    width: "80%",
    height: 50,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  userIcon: {
    marginRight: 20,
  },
});