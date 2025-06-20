import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";

import styles from "./ajuda.style";
import SafeArea from "../../../components/safeArea/safeArea";
import UserButtonBack from "../../../components/userButtonBack/userButtonBack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CarouselCard from "../../../components/ajudaCard/carouselCard/carouselCard";

function Ajuda() {
  const textCopy = ["(16) xxxx-xxxx", "softShelf@gmail.com"];

  const onClickCopy = (index) => {
    Clipboard.setString(textCopy[index]);
    Alert.alert(
      "Contato Copiado",
      "O texto foi copiado para a área de transferência."
    );
  };

  return (
    <SafeArea barStyle="dark-content" backgroundColor={"#FFFFFF"}>
      <ScrollView>
        <UserButtonBack Page="user" text="Ajuda" />
        <View style={styles.container}>
          <Text style={styles.title}>Perguntas Frequentes</Text>

          <CarouselCard />

          <View style={styles.contato}>
            <TouchableOpacity
              onPress={() => onClickCopy(0)} 
              style={{ flexDirection: "row" }}
            >
              <MaterialIcons name="phone" size={30} color="#0D2149" />
              <Text style={styles.text}>(xx)xxxx-xxxx</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClickCopy(1)} 
              style={{ flexDirection: "row" }}
            >
              <MaterialIcons name="email" size={30} color="#0D2149" />
              <Text style={styles.text}>softShelf@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}

export default Ajuda;
