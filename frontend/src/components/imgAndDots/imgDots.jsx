import { View, StyleSheet, Image } from "react-native"
import { COLORS } from "../../constants/tema"

function ImgDots({ Imagem, DotIndex }) {
  return (
    <>
      <View style={styles.item}>
        <Image source={Imagem} style={styles.img} resizeMode="contain" />
      </View>

      <View style={styles.dotContainer}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: DotIndex === 0 ? COLORS.azulEscuro : COLORS.branco,
            },
          ]}
        ></View>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: DotIndex === 1 ? COLORS.azulEscuro : COLORS.branco,
            },
          ]}
        ></View>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: DotIndex === 2 ? COLORS.azulEscuro : COLORS.branco,
            },
          ]}
        ></View>
      </View>
    </>
  )
}

export default ImgDots

const styles = StyleSheet.create({
  item: {
    marginVertical: 20,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  img: { height: 360, width: 400, borderRadius: 20 },
  dotContainer: {
    width: "100%",
    height: 15,
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    padding: 8,
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
  },
})