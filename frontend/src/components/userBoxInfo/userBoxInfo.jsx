import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

import styles from "./userBoxInfo.style";
import ICONE from "@expo/vector-icons/MaterialIcons";

function UserBoxInfo(props) {
  return (
    <TouchableOpacity style={styles.infoProfile}>
      <ICONE name={props.icone} style={styles.icon} />
      <View style={styles.box}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subTitle}>{props.subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default UserBoxInfo;