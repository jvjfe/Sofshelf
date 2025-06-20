import { View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import SafeArea from "../../../components/safeArea/safeArea";
import UserButtonBack from "../../../components/userButtonBack/userButtonBack";
import UserBoxInfo from "../../../components/userBoxInfo/userBoxInfo";
import styles from "./configuracao.style";

function Configuracao() {
  const navigation = useNavigation();
  return (
    <SafeArea barStyle="dark-content" backgroundColor={"#FFFFFF"}>
      <ScrollView>
        <UserButtonBack text="Configuração" Page="user" />
        <View style={styles.container}>
          <UserBoxInfo
            icone="notifications-on"
            title="NOTIFICAÇÃO"
            subTitle="Ajustes para habilitar ou desabilitar sons e vibrações para notificações"
          />
          <UserBoxInfo
            icone="language"
            title="IDIOMA E REGIÃO"
            subTitle="Ajuste do fuso horário ou idioma, caso o app seja usado em locais diferentes"
          />
          <UserBoxInfo
            icone="cached"
            title="LIMPAR CACHE"
            subTitle="Opção para limpar dados temporários do app"
          />
          <UserBoxInfo
            icone="security-update"
            title="VERIFICAR ATUALIZAÇÕES"
            subTitle="Verificar atualizações disponíveis do Aplicativo"
          />
          <UserBoxInfo
            icone="support-agent"
            title="SUPORTE E CONTATO"
            subTitle="Informações de contato para suporte técnico"
          />
          <UserBoxInfo
            icone="restore-from-trash"
            title="Apagar Conta"
            subTitle="Esta opção resulta na exclusão da sua conta, sem possibilidade de recuperação."
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
}

export default Configuracao;
