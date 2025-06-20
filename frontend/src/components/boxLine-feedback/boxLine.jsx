import { View, Text } from "react-native"

import styles from "../../screens/user/feedbackSugestao/feedbackSugestao.style"

function BoxLine(props) {
  return (
    <View style={styles.boxLine}>
      <Text style={styles.textLine}>{props.text}</Text>
      <View style={styles.line} />
    </View>
  )
}

export default BoxLine