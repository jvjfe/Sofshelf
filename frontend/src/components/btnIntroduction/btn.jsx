import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

import { COLORS, FONT_SIZE } from "../../constants/tema.js"
import { useNavigation } from "@react-navigation/native"

function BtnIntro({ PageAdress, TextBtn, TextColor, btnColor, text, onPress }) {
  const navigation = useNavigation()

  const handlePress = async () => {
    if (onPress) {
      await onPress()
    } else {
      navigation.navigate(PageAdress, { text: text })
    }
  }

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: btnColor }]}
        onPress={handlePress}
      >
        <Text style={[styles.btnText, { color: TextColor }]}>{TextBtn}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BtnIntro

const styles = StyleSheet.create({
  item: {
    width: 400,
    marginVertical: 20,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btn: {
    width: "80%",
    padding: 8,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    textAlign: "center",
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
  },
})
