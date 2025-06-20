import { View, Text, UIManager, LayoutAnimation, Platform } from "react-native"
import React, { useState } from "react"

import styles from "./ajudaCard.style.js"
import icons from "../../constants/icons"
import { Image } from "react-native"
import Questions from "./questions/questions"

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

function AjudaCard({
  title,
  question1,
  question2,
  question3,
  description1,
  description2,
  description3,
}) {
  const [openindex, setOpenIndex] = useState(null)

  const deslizar = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpenIndex(openindex === index ? null : index)
  }

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Image source={icons.Faqs} style={styles.logo} />
        <Text style={styles.topTitle}>{title}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.box}>
        <Questions
          question={question1}
          answer={description1}
          isOpen={openindex === 0}
          onPress={() => deslizar(0)}
        />
        <Questions
          question={question2}
          answer={description2}
          isOpen={openindex === 1}
          onPress={() => deslizar(1)}
        />
        <Questions
          question={question3}
          answer={description3}
          isOpen={openindex === 2}
          onPress={() => deslizar(2)}
        />
      </View>
    </View>
  )
}

export default AjudaCard