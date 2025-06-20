import { Text, TextInput } from "react-native"

import styles from "./inputBox.style"
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from "../../constants/tema"

function InputBox(props) {
  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        style={[styles.input, props.icon && styles.inputWithIcon]}
        placeholder={props.placeholder}
        secureTextEntry={props.isPassword}
        onChangeText={(texto) => props.onChangeText(texto)}
        value={props.value}
        autoCapitalize={props.autoCapitalize} 
        autoCorrect={props.autoCorrect}   
        keyboardType="default"
      />
      {props.icon && (
        <Icon
          name={props.icon}
          size={24}
          color={COLORS.marrom}
          style={styles.icon}
        />
      )}
    </>
  )
}

export default InputBox