import { Alert } from "react-native"
import * as FileSystem from "expo-file-system"
import Button from "../button/button"

function DowloadPdf() {
  const pdfUrl =
    "https://www.dropbox.com/scl/fo/c3df44dge7xqwhqz5ag81/ABhGhaOPW0h6MP8Me6_e774?rlkey=kdt7eanwzwf5xeawx9radiwjt&st=4dr83ugv&dl=0"
  const nomeArq = "POLITICAS-DE-PRIVACIDADE-E-TERMOS.pdf"

  const baixarFile = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + nomeArq

      const fileExists = await FileSystem.getInfoAsync(fileUri)
      if (fileExists.exists) {
        Alert.alert("Erro", "Arquivo já existe no dispositivo.")
        return
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        pdfUrl,
        fileUri
      )

      const { uri } = await downloadResumable.downloadAsync()

      Alert.alert("Download Completo", `PDF salvo em: ${uri}`)
    } catch (error) {
      console.error(error)
      Alert.alert("Erro", "Falha ao baixar o arquivo.")
    }
  }

  return <Button texto="Baixar o PDF completo" onPress={baixarFile} />
}

export default DowloadPdf