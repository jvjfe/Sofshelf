import React, { useState } from "react"
import { TouchableOpacity, Text, View } from "react-native"

import styles from "./../../../screens/user/feedbackSugestao/feedbackSugestao.style"
import { COLORS } from "../../../constants/tema"

function Topic() {
  const [tema, setTema] = useState([])
  const topic = [
    "Experiência",
    "Interface(UI)",
    "Desempenho",
    "Funcionalidades",
    "Erros e Problemas",
  ]

  const onClickTopic = (selectedTopic) => {
    setTema((prev) =>
      prev.includes(selectedTopic)
        ? prev.filter((item) => item !== selectedTopic)
        : [...prev, selectedTopic]
    )
  }

  return (
    <View style={styles.boxTema}>
      {topic.map((topico, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onClickTopic(topico)}
          style={[
            styles.topico,
            {
              backgroundColor: tema.includes(topico)
                ? COLORS.marrom
                : COLORS.linho,
            },
          ]}
        >
          <Text
            style={{
              color: tema.includes(topico) ? COLORS.linho : COLORS.marrom,
            }}
          >
            {topico}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Topic
