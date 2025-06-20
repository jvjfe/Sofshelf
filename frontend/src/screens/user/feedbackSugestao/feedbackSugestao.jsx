import { View, Image, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";

import styles from "./feedbackSugestao.style";
import SafeArea from "../../../components/safeArea/safeArea";
import UserButtonBack from "../../../components/userButtonBack/userButtonBack";
import Button from "../../../components/button/button";
import icons from "../../../constants/icons";
import BoxLine from "../../../components/boxLine-feedback/boxLine";
import Star from "../../../components/avaliar/star";
import Topic from "../../../components/avaliar/topicos/topic";

function FeedbackSugestao() {
  const [text, setText] = useState("");

  return (
    <SafeArea barStyle="dark-content" backgroundColor={"#FFFFFF"}>
      <ScrollView>
        <UserButtonBack text="FeedBack e Sugestões" Page="user" />
        <View style={styles.container}>
          <View style={styles.top}>
            <Image style={styles.logo} source={icons.feedback} />
            <Text style={styles.topText}>DEIXE SEU FEEDBACK</Text>
          </View>
          <BoxLine text="SELECIONE O TEMA DA SUA SEGUESTÃO" />
          <Topic />
          <BoxLine text="QUAL SUA SUGESTÃO PARA NÓS?" />
          <View style={styles.menssage}>
            <TextInput
              style={styles.input}
              placeholder="Descreva sua mensagem"
              value={text}
              onChangeText={setText}
              placeholderTextColor="#60492C"
              multiline={true}
            />
          </View>
          <BoxLine text="AVALIE SUA EXPERIÊNCIA" />
          <Star />
          <Button texto="ENVIAR" />
        </View>
      </ScrollView>
    </SafeArea>
  );
}

export default FeedbackSugestao;
