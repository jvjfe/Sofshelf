import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { styles } from "./esqueciSenha.style.js";
import Button from "../../../components/button/button.jsx";
import Title from "../../../components/title/title.jsx";
import SafeArea from "../../../components/safeArea/safeArea.jsx";
import { COLORS, FONT_SIZE } from "../../../constants/tema.js";
import UserButtonBack from './../../../components/userButtonBack/userButtonBack';
import { useRoute } from "@react-navigation/native";

function EsqueciSenha(props) {
  const [email, setEmail] = useState("");

  const route = useRoute()
  const { role } = route.params


  const recuperação = () => {
    Alert.alert(email);


  };

  return (
    <SafeArea barStyle="dark-content" backgroundColor={"#FFFFFF"}>
      <View style={styles.container}>
        <UserButtonBack Page="login" role={role} />
        <Title
          texto2="Recuperar Senha"
          texto="Informe seu email para receber as instruções de redefinição de senha."
          titleStyle={styles.title}
          textStyle={styles.text}
        />

        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Button texto="Enviar email" onPress={recuperação} />
        </View>
      </View>
    </SafeArea>
  );
}

export default EsqueciSenha;