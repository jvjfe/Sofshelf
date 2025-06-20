import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./conteudoCard.styles"

function ConteudoCard({ texto, imagemCard, corFundo, navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate(navigation)}>
        <View style={[styles.conteudoCard, { backgroundColor: corFundo }]}>
          <Image style={styles.imageCard} source={imagemCard} />
          <Text style={styles.textCard}>{texto}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ConteudoCard