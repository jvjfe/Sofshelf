import { View, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import AntDesign from "@expo/vector-icons/AntDesign"

import styles from "../../screens/user/feedbackSugestao/feedbackSugestao.style"

function Star() {
  const [estrelas, setEstrelas] = useState([])
  const stars = Array.from({ length: 5 }, (_, index) => index + 1)

  const onSelectStar = (starSelected) => {
    if (estrelas.includes(starSelected)) {
      setEstrelas(estrelas.filter((star) => star < starSelected))
    } else {
      setEstrelas([...Array(starSelected).keys()].map((i) => i + 1))
    }
  }

  return (
    <View style={styles.estrelas}>
      {stars.map((star) => (
        <TouchableOpacity key={star} onPress={() => onSelectStar(star)}>
          <AntDesign
            name={estrelas.includes(star) ? "star" : "staro"}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Star