import { StyleSheet, Text, View } from "react-native"
import { COLORS, FONT_SIZE } from "../../constants/tema.js"

function TextWelcome({ Title, SubTitle }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{Title}</Text>
      <Text style={styles.subTitle}>{SubTitle}</Text>
    </View>
  );
}
export default TextWelcome;
const styles = StyleSheet.create({
  item: {
    width: "100%",
    marginVertical: 20,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    width: "80%",
    textAlign: "center",
    fontSize: FONT_SIZE.lg,
    color: COLORS.azulEscuro,
    fontWeight: "bold",
  },
  subTitle: {
    width: "73%",
    fontSize: FONT_SIZE.md,
    color: COLORS.branco,
    textAlign: "center",
  },
});