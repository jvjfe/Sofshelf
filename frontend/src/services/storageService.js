import AsyncStorage from "@react-native-async-storage/async-storage"

export const setUserData = async (userData) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(userData))
  } catch (error) {
    console.error("Erro ao salvar os dados do usuário:", error)
  }
}

export const getUserData = async () => {
  try {
    const userString = await AsyncStorage.getItem("user")
    if (userString) {
      return JSON.parse(userString)
    }
    return null
  } catch (error) {
    console.error("Erro ao recuperar os dados:", error)
    return null
  }
}

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem("user")
  } catch (error) {
    console.error("Erro ao remover os dados do usuário:", error)
  }
}

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token)
  } catch (error) {
    console.error("Erro ao salvar o token:", error)
  }
}

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      return token
    }
    return null
  } catch (error) {
    console.error("Erro ao recuperar o token:", error)
    return null
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token")
  } catch (error) {
    console.error("Erro ao remover o token:", error)
  }
}
