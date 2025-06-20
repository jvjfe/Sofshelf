import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./title.style";
import icons from "../../constants/icons";

function Title({ texto, texto2, titleStyle, textStyle }) {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={icons.logo} />
      <Text style={[styles.titulo, titleStyle]}>{texto2}</Text>
      <Text style={[styles.subTitulo, textStyle]}>{texto}</Text>
    </View>
  );
}

export default Title;