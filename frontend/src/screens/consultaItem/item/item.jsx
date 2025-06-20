import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native"
import React, { useEffect, useState, useCallback } from "react"
import SafeArea from "../../../components/safeArea/safeArea"
import UserButtonBack from "../../../components/userButtonBack/userButtonBack"
import { COLORS } from "../../../constants/tema"
import { useRoute } from "@react-navigation/native"
import styles from "./item.style.js"
import icons from "../../../constants/icons.js"
import AntDesign from "@expo/vector-icons/AntDesign"
import ProductServices from "../../../services/servicesBackend/ProductServices.js"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import RodapeModal from "../../../components/produtoModal/produtoRodapeModal/ProdutoRodapeModal.jsx"
import PopupMenu from "../../../components/produtoPopUp/ProdutoPopUp.jsx"

export default function Item() {
  const [showBrands, setShowBrands] = useState(false)
  const [showColors, setShowColors] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [filteredProductPrice, setFilteredProductPrice] = useState(null)
  const [item, setItem] = useState({})

  const route = useRoute()
  const productId = route?.params?.productId
  const insets = useSafeAreaInsets()

  const fetchItem = useCallback(async () => {
    try {
      const response = await ProductServices.getProductById(productId)
      setItem(response)
    } catch (error) {
      console.error("Erro ao buscar produto:", error)
    }
  }, [productId])

  useEffect(() => {
    if (productId) fetchItem()
  }, [productId, fetchItem])

  const uniqueBrands = item?.productPrice
    ? [...new Map(item.productPrice.map((p) => [p.brand.name, p.brand])).values()]
    : []

  // Pega todas as cores válidas para a marca selecionada
  const filteredColors = item?.productPrice
    ? item.productPrice.filter((p) => p.brand.name === selectedBrand && p.color).map((p) => p.color)
    : []

  // Quando carregar item, seleciona a primeira marca
  useEffect(() => {
    if (item?.productPrice?.length > 0) {
      if (!selectedBrand) {
        const firstBrand = item.productPrice[0]?.brand.name
        setSelectedBrand(firstBrand)
      }
    }
  }, [item])

  // Quando muda marca, seleciona a primeira cor, se existir
  useEffect(() => {
    if (selectedBrand && item?.productPrice) {
      const colors = item.productPrice
        .filter((p) => p.brand.name === selectedBrand && p.color)
        .map((p) => p.color.name)
      const uniqueColors = [...new Set(colors)]
      if (uniqueColors.length > 0) {
        if (!selectedColor || !uniqueColors.includes(selectedColor)) {
          setSelectedColor(uniqueColors[0])
        }
      } else {
        setSelectedColor(null)
      }
    }
  }, [selectedBrand, item])

  // Sempre atualiza o preço filtrado:
  useEffect(() => {
    if (!selectedBrand || !item?.productPrice) {
      setFilteredProductPrice(null)
      return
    }
    let matched = null
    // Se tem cor selecionada e existem cores para a marca, filtra por cor
    if (selectedColor && filteredColors.length > 0) {
      matched = item.productPrice.find(
        (p) => p.brand.name === selectedBrand && p.color && p.color.name === selectedColor
      )
    }
    // Se não tem cor, pega a variação da marca sem cor
    if (!matched) {
      matched = item.productPrice.find(
        (p) => p.brand.name === selectedBrand && (!p.color || p.color === null)
      )
    }
    // Se ainda não achou, pega da marca (primeira variação da marca)
    if (!matched) {
      matched = item.productPrice.find(
        (p) => p.brand.name === selectedBrand
      )
    }
    setFilteredProductPrice(matched)
  }, [selectedBrand, selectedColor, item])

  function handleMovimentacaoRegistrada() {
    fetchItem()
  }

  const Selector = ({ title, data, renderItem, isOpen, toggleOpen }) => (
    <View style={styles.selectorContainer}>
      <TouchableOpacity onPress={toggleOpen} style={styles.selectorHeader}>
        <Text style={styles.selectorTitle}>{title}</Text>
        <AntDesign name={isOpen ? "up" : "down"} size={18} color={COLORS.preto} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.selectorDropdownAbsolute}>
          <ScrollView
            style={styles.selectorList}
            contentContainerStyle={{ paddingBottom: 4 }}
            nestedScrollEnabled
          >
            {data.map((item, index) => (
              <React.Fragment key={`${title}-${index}`}>{renderItem({ item })}</React.Fragment>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )

  const handleAtualizacaoProduto = () => {
    fetchItem()
  }

  return (
    <SafeArea barStyle="dark-content">
      <StatusBar backgroundColor={COLORS.marromEscuro} barStyle="dark-content" />
      <UserButtonBack text="Informações do Produto" style={true} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.back} />

          <View style={styles.boxImage}>
            <Image source={icons.img} style={styles.imagem} />
          </View>

          <View style={styles.boxNomePreco}>
            <Text style={styles.nameProduto}>{(item?.name || "").toUpperCase()}</Text>
            <Text style={styles.precoProduto}>
              R$ {filteredProductPrice?.price?.toFixed(2) || "0.00"}
            </Text>
          </View>

          <View style={styles.boxInfoAdicional}>
            <Selector
              title="Marcas"
              isOpen={showBrands}
              toggleOpen={() => setShowBrands(!showBrands)}
              data={uniqueBrands}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.selectorItem,
                    item.name === selectedBrand && { backgroundColor: COLORS.cinzaClaro }
                  ]}
                  onPress={() => {
                    setSelectedBrand(item.name)
                    setShowBrands(false)
                  }}
                >
                  <Text style={[
                    styles.selectorItemText,
                    item.name === selectedBrand && { fontWeight: "bold" }
                  ]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Só mostra o seletor de cor se houver pelo menos uma cor na marca */}
            {filteredColors.length > 0 && (
              <Selector
                title="Cores"
                isOpen={showColors}
                toggleOpen={() => setShowColors(!showColors)}
                data={filteredColors}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.selectorColorItem,
                      item.name === selectedColor && { backgroundColor: COLORS.cinzaClaro }
                    ]}
                    onPress={() => {
                      setSelectedColor(item.name)
                      setShowColors(false)
                    }}
                  >
                    <View
                      style={[
                        styles.selectorColorCircle,
                        { backgroundColor: item.hexCode || COLORS.cinza },
                      ]}
                    />
                    <Text style={[
                      styles.selectorItemText,
                      item.name === selectedColor && { fontWeight: "bold" }
                    ]}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <View style={styles.boxInfoAdicional}>
            <View style={styles.boxInfo}>
              <Text style={styles.boxInfoText}>Estoque</Text>
              <Text style={styles.boxInfoLabel}>{filteredProductPrice?.estoqueAtual ?? 0}</Text>
            </View>
            <View style={styles.boxInfo}>
              <Text style={styles.boxInfoText}>Unidade</Text>
              <Text style={styles.boxInfoLabel}>{item?.embalagemSigla}</Text>
            </View>
            <View style={styles.boxInfo}>
              <Text style={styles.boxInfoText}>Qtn Embalagem</Text>
              <Text style={styles.boxInfoLabel}>{item?.qtEmbalagem?.quantity}</Text>
            </View>
          </View>

          <View style={styles.boxDescricao}>
            <Text style={styles.boxDescricaoTitulo}>Sobre o Produto</Text>
            <Text style={styles.boxDescricaoLabel}>{item?.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", top: insets.top + 55, right: 15, zIndex: 99 }}>
        <PopupMenu productId={productId} onAtualizarProduto={handleAtualizacaoProduto} />
      </View>

      <RodapeModal
        item={item}
        insets={insets}
        filteredProductPrice={filteredProductPrice}
        movimentacaoRegistrada={handleMovimentacaoRegistrada}
        estoqueAtual={filteredProductPrice?.estoqueAtual}
      />
    </SafeArea>
  )
}