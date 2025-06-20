import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS } from "../../constants/tema.js"

import ImgDots from "../../components/imgAndDots/imgDots.jsx"
import icons from "../../constants/icons.js"
import BtnIntro from "../../components/btnIntroduction/btn.jsx"
import TextWelcome from "../../components/textWelcome/textWelcome.jsx"
import SafeArea from "../../components/safeArea/safeArea.jsx"

function Information() {
  return (
    <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
      <LinearGradient
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        colors={[COLORS.branco, COLORS.azulEscuro]}
      >
        <ImgDots Imagem={icons.intro2} DotIndex={1} />
        <TextWelcome
          Title="Organização Simples e Eficiente"
          SubTitle="Navegue por estantes e categorias de forma intuitiva, com o controle que sua empresa precisa!"
        />
        <BtnIntro
          PageAdress="intro3"
          TextBtn="Next"
          btnColor={COLORS.azulEscuro}
          TextColor={COLORS.branco}
        />
      </LinearGradient>
    </SafeArea>
  )
}

export default Information