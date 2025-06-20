import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS } from "../../constants/tema.js"

import ImgDots from "../../components/imgAndDots/imgDots.jsx"
import icons from "../../constants/icons.js"
import BtnIntro from "../../components/btnIntroduction/btn.jsx"
import TextWelcome from "../../components/textWelcome/textWelcome.jsx"
import SafeArea from "../../components/safeArea/safeArea.jsx"

function Introduction() {
  return (
    <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
      <LinearGradient
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
        colors={[COLORS.branco, COLORS.azulEscuro]}
      >
        <ImgDots Imagem={icons.intro1} DotIndex={0} />
        <TextWelcome
          Title="Controle Total do Seu Estoque"
          SubTitle="Encontre rapidamente o que precisa e gerencie seus itens com precisão!"
        />
        <BtnIntro
          PageAdress={"intro2"}
          TextBtn="Next"
          btnColor={COLORS.azulEscuro}
          TextColor={COLORS.branco}
        />
      </LinearGradient>
    </SafeArea>
  )
}

export default Introduction