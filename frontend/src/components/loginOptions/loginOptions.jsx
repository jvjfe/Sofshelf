import { Text, TouchableOpacity } from "react-native"
import ICONE from "@expo/vector-icons/MaterialIcons"
import styles from "./loginOptions.style"
import { useNavigation } from "@react-navigation/native"

function LoginOptions(props) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.boxItem}
      onPress={
        props.onPress
          ? props.onPress                
          : () => navigation.navigate(props.page) 
      }
    >
      <ICONE name={props.icone} style={styles.icon} />
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default LoginOptions