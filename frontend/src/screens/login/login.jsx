import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import styles from "./login.style"
import Button from "../../components/button/button"
import Title from "../../components/title/title"
import SafeArea from "../../components/safeArea/safeArea"
import InputBox from "../../components/inputBox/inputBox"
import { signIn } from "../../constants/login/constLogin"

function Login(props) {
  const navigation = useNavigation()
  const route = useRoute()
  const { role, email: navEmail = "", senha: navSenha = "" } = route.params || {}

  const [email, setEmail] = useState(navEmail)
  const [senha, setSenha] = useState(navSenha)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setEmail(navEmail)
    setSenha(navSenha)
  }, [navEmail, navSenha])

  const verifyRole = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador'
      case 'employee':
        return 'Funcionário'
      default:
        return 'Erro inesperado'
    }
  }

  const handleLogin = async () => {
    if (!email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.")
      return
    }

    await signIn(email, senha, navigation, setIsLoading, setErrorMessage)
  }

  return (
    <SafeArea barStyle="dark-content" backgroundColor={"#FFFFFF"}>
      <ScrollView contentContainerStyle={styles.scroll} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Title texto="Acesse sua conta" texto2={verifyRole(role)} />

          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

          <View style={styles.formGroup}>
            <View style={styles.form}>
              <InputBox
                label="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                placeholder="Seu email"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.form}>
              <InputBox
                label="Senha"
                isPassword={true}
                onChangeText={setSenha}
                value={senha}
                placeholder="Sua senha"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.form}>
              <Button
                texto={isLoading ? "Acessando conta..." : "Acessar"}
                onPress={handleLogin}
                disabled={isLoading}
              />
            </View>

            {/* <View style={styles.senha}>
              <TouchableOpacity onPress={() => navigation.navigate("esqueciSenha", { role })}>
                <Text style={styles.senhaText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View> */}

          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("registro", { role })}>
            <Text style={styles.footerText}>Registrar-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeArea>
  )
}

export default Login