import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

function ButtonCam({ icon, size, color, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={size ? size : 42} 
        color={color ? color : "#f1f1f1"}
      />
    </TouchableOpacity>
  )
}

export default ButtonCam

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
})