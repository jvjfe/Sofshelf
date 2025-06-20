import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./user.style";
import LoginOptions from "../../components/loginOptions/loginOptions";
import BtnIntro from "../../components/btnIntroduction/btn";
import icons from "../../constants/icons";
import SafeArea from "../../components/safeArea/safeArea";
import UserButtonBack from "../../components/userButtonBack/userButtonBack";
import { getUserData } from "../../services/storageService";
import ConfirmSenhaModal from "../../components/confirmSenhaModal/confirmSenhaModal";
import UserService from "../../services/servicesBackend/UserServices";

function User() {
  const [user, setUser] = useState({ name: "Usuário", role: "Sem função", id: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getUserData().then((userData) => {
      if (userData) setUser(userData);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("intro3");
    } catch (error) {
      // Só logue para debugging se realmente quiser, senão deixe sem nada
      // if (__DEV__) { console.error("❌ Erro ao deslogar:", error); }
    }
  };

  const handleFunction = (role) => {
    if (role === "emploee" || role === "employee") {
      return "FUNCIONÁRIO";
    } else if (role === "admin" || role === "adm") {
      return "ADMINISTRADOR";
    }
    return "DESCONHECIDO";
  };

  const handleOpenConfirm = () => {
    setShowConfirm(true);
    setConfirmError("");
  };

  const handleConfirmSenha = async (senhaDigitada) => {
    try {
      await UserService.verifyPassword({ senha: senhaDigitada, userId: user.id });
      setShowConfirm(false);
      setConfirmError("");
      navigation.navigate("informacaoDaConta");
    } catch (error) {
      // REMOVA O LOG! Só mensagem amigável:
      setConfirmError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
      <ScrollView>
        <View style={styles.container}>
          <UserButtonBack Page="Home" />

          <View style={styles.infoProfile}>
            <Image source={icons.userFoto} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.nameF}>{handleFunction(user.role)}</Text>
          </View>

          <View style={styles.boxInfo}>
            <LoginOptions
              text="INFORMAÇÕES DA CONTA/EMPRESA"
              icone="supervised-user-circle"
              onPress={handleOpenConfirm}
            />
            <LoginOptions
              text="CONFIGURAÇÕES"
              icone="settings"
              page="configuracao"
            />
            <LoginOptions
              text="FEEDBACK E SUGESTÕES"
              icone="feedback"
              page="feeedbackSugestao"
            />
            <LoginOptions
              text="POLÍTICA DE PRIVACIDADE E TERMOS"
              icone="assignment"
              page="termos"
            />
          </View>

          <View style={styles.boxInfo}>
            <Text style={styles.text}>VERSÃO DO APP</Text>
            <Text style={styles.textV}>SofShelf@1.0.0</Text>
          </View>

          <BtnIntro
            TextBtn="LOG OUT/ SAIR"
            TextColor="#fff"
            btnColor="#60492C"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>

      <ConfirmSenhaModal
        visible={showConfirm}
        onConfirm={handleConfirmSenha}
        onCancel={() => setShowConfirm(false)}
        error={confirmError}
      />
    </SafeArea>
  );
}

export default User;