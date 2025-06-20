import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/tema.js";
import { useNavigation } from "@react-navigation/native";

import ImgDots from "../../components/imgAndDots/imgDots.jsx";
import icons from "../../constants/icons.js";
import BtnIntro from "../../components/btnIntroduction/btn.jsx";
import TextWelcome from "../../components/textWelcome/textWelcome.jsx";
import SafeArea from "../../components/safeArea/safeArea.jsx";

function Welcome() {
  const navigation = useNavigation();

  const roles = [
    { label: "FUNCIONÁRIO", role: "employee", color: COLORS.azulEscuro, textColor: COLORS.branco },
    { label: "ADMINISTRADOR", role: "admin", color: COLORS.linho, textColor: COLORS.azulEscuro }
  ]

  return (
    <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
      <LinearGradient
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        colors={[COLORS.branco, COLORS.azulEscuro]}
      >
        <ImgDots Imagem={icons.intro3} DotIndex={2} />
        <TextWelcome
          Title="Escolha seu Perfil para Começar"
          SubTitle="Acesse para liberar as ferramentas certas para o seu trabalho"
        />

        {roles.map(({ label, role, color, textColor }) => (
          <BtnIntro
            key={role}
            TextBtn={label}
            TextColor={textColor}
            btnColor={color}
            onPress={() => navigation.navigate("login", { role })}
          />
        ))}
      </LinearGradient>
    </SafeArea>
  );
}
export default Welcome;
