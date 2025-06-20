import { View, Text } from "react-native"

import styles from "../ajudaCard.style.js"
import AntDesign from "@expo/vector-icons/AntDesign"
import { TouchableOpacity } from "react-native"

function Questions({ question, answer, isOpen, onPress }) {
  return (
    <View style={styles.boxItem}>
      <TouchableOpacity onPress={onPress}>
        <AntDesign
          name={isOpen ? "minuscircle" : "pluscircleo"}
          style={styles.icon}
        />
        <View style={styles.item}>
          <Text style={styles.titulo}>{question}</Text>
          {isOpen && <Text style={styles.text}>{answer}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default Questions