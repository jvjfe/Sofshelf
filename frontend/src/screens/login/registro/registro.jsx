import React, { useState } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform, Text, Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import SafeArea from "../../../components/safeArea/safeArea"
import Title from "../../../components/title/title"
import { styles } from "./registro.style"
import Button from "../../../components/button/button"
import { useNavigation, useRoute } from "@react-navigation/native"
import InputBox from '../../../components/inputBox/inputBox'
import { signUp } from "../../../constants/login/registro/constRegistro"
import UserButtonBack from './../../../components/userButtonBack/userButtonBack'

export default function Registro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha1, setSenha1] = useState("")
  const [senha2, setSenha2] = useState("")
  const [empresaNome, setEmpresaNome] = useState("")
  const [empresaEmail, setEmpresaEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const { role } = route.params

  const handleRegister = () => {
    if (!nome || !email || !senha1 || !senha2) {
      setErrorMessage("Por favor, preencha todos os campos.")
      return
    }

    if (senha1 !== senha2) {
      setErrorMessage("As senhas não coincidem.")
      return
    }

    if (role === "admin") {
      if (!empresaNome) {
        setErrorMessage("Por favor, insira o nome da empresa")
        return
      }
      signUp(nome, email, senha1, senha2, role, empresaNome, null, navigation, setIsLoading, setErrorMessage)
    } else if (role === "employee") {
      setModalVisible(true)
    }
  }

  const handleEmployeeRegister = () => {
    if (!empresaEmail) {
      Alert.alert("Erro", "Por favor, insira o e-mail da empresa")
      return
    }
    setModalVisible(false)
    signUp(nome, email, senha1, senha2, role, null, empresaEmail, navigation, setIsLoading, setErrorMessage)
  }

  return (
    <SafeArea barStyle="dark-content" backgroundColor="#FFF">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View style={styles.container}>
            <UserButtonBack Page="login" role={role}/>
            <Title texto="Crie sua conta" texto2="Seja Bem-Vindo!" />

            {errorMessage ? (
              <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text>
            ) : null}

            <View style={styles.formGroup}>
              <View style={styles.form}>
                <InputBox
                  label="Nome completo"
                  onChangeText={setNome}
                  value={nome}
                  placeholder="Seu nome completo"
                  autoCapitalize="none"  
                  autoCorrect={false}
                />
              </View>

              <View style={styles.form}>
                <InputBox
                  label="Email"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                  placeholder="Seu email"
                  autoCapitalize="none"  
                  autoCorrect={false} />
              </View>

              <View style={styles.form}>
                <InputBox
                  label="Escolha sua senha"
                  isPassword={true}
                  onChangeText={setSenha1}
                  value={senha1}
                  placeholder="Sua senha"
                  autoCapitalize="none"  
                  autoCorrect={false}
                />
              </View>

              <View style={styles.form}>
                <InputBox
                  label="Confirme sua senha"
                  isPassword={true}
                  onChangeText={setSenha2}
                  value={senha2}
                  placeholder="Repita sua senha"
                  autoCapitalize="none"  
                  autoCorrect={false}
                />
              </View>

              {role === "admin" && (
                <View style={styles.form}>
                  <InputBox
                    label="Nome da Empresa"
                    onChangeText={setEmpresaNome}
                    value={empresaNome}
                    placeholder="De um nome a sua empresa"
                    autoCapitalize="none"  
                    autoCorrect={false}
                  />
                </View>
              )}

              <Button
                texto={isLoading ? 'Carregando...' : 'Registrar'}
                disabled={isLoading}
                onPress={handleRegister}
                accessibilityLabel="Botão para registrar"
              />
            </View>
          </View>
        </ScrollView>

        {role === "employee" && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => { setModalVisible(false), Keyboard.dismiss() }}>
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Informe o e-mail da empresa à qual deseja se conectar:
                    </Text>
                    <InputBox
                      label="Email da empresa"
                      onChangeText={setEmpresaEmail}
                      value={empresaEmail}
                      placeholder="Email da empresa"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <Button
                      texto="Confirmar"
                      onPress={handleEmployeeRegister}
                      style={styles.button}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </SafeArea>
  )
}