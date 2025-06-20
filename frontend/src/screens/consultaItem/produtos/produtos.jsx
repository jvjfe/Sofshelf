import React, { useEffect, useState, useCallback, useRef } from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import SafeArea from "../../../components/safeArea/safeArea"
import UserButtonBack from "../../../components/userButtonBack/userButtonBack"
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native"
import { COLORS } from "../../../constants/tema"
import styles from "./produtos.styles"
import Header from "../../../components/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ProdutoModal from "../../../components/produtoModal/ProdutoModal"
import ProductsServices from "../../../services/servicesBackend/ProductServices"

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [ordem, setOrdem] = useState("asc")
  const [carregando, setCarregando] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [produtosFiltrados, setProdutosFiltrados] = useState([])
  const clearSearchSignal = useRef(false)
  const route = useRoute()
  const navigation = useNavigation()
  let { shelfId } = route.params || {}

  const carregarProdutos = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setCarregando(true)
      setRefreshing(isRefreshing)
      const response = await ProductsServices.getProductsByShelfId(shelfId)
      const produtosArray = Array.isArray(response)
        ? response
        : Array.isArray(response.products)
          ? response.products
          : []
      const produtosOrdenados = [...produtosArray].sort((a, b) => {
        if (!a.name || !b.name) return 0
        return ordem === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      })
      setProdutos(produtosOrdenados)
      clearSearchSignal.current = true
      setProdutosFiltrados([])
    } catch (error) {
    } finally {
      setCarregando(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (shelfId) {
      carregarProdutos()
    }
  }, [shelfId, ordem])

  useFocusEffect(
    useCallback(() => {
      carregarProdutos()
    }, [])
  )

  const alternarOrdem = () => {
    setOrdem((prevOrdem) => (prevOrdem === "asc" ? "desc" : "asc"))
  }

  const onRefresh = useCallback(() => {
    carregarProdutos(true)
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const navegarParaItem = (productId) => {
    navigation.navigate("item", { productId })
  }

  const onSave = async () => {
    setShowFormModal(false)
    await carregarProdutos()
    setEditingData(null)
  }

  return (
    <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
      <UserButtonBack onPress={goBack} text="Consultar Estoque" />
      <View style={styles.container}>
        <Header onProductsChange={setProdutosFiltrados} clearSearchSignal={clearSearchSignal} />

        <TouchableOpacity onPress={alternarOrdem} style={styles.botaoOrdenar}>
          <Text style={styles.textoBotao}>
            Ordenar: {ordem === "asc" ? "A-Z" : "Z-A"}
          </Text>
        </TouchableOpacity>

        {!carregando && produtos.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 32, color: COLORS.cinza }}>
            Nenhum produto encontrado.
          </Text>
        )}

        {carregando && !refreshing ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navegarParaItem(item.id)}
                style={styles.itemContainer}
              >
                <Text style={styles.itemTitulo}>{item.name}</Text>
                <Text style={styles.itemDescricao}>{item.description}</Text>

                {item.ProductPrice?.map((variacao, index) => (
                  <View key={index} style={styles.variacaoCard}>
                    <Text style={styles.variacaoTexto}>
                      Marca: {variacao.brand?.name}
                    </Text>
                    {variacao.color && (
                      <>
                        <View
                          style={[
                            styles.colorPreview,
                            { backgroundColor: variacao.color?.hexCode },
                          ]}
                        />
                        <Text style={styles.variacaoTexto}>
                          Cor: {variacao.color?.name}
                        </Text>
                      </>
                    )}
                    <Text style={styles.variacaoPreco}>
                      R$ {variacao.price?.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.marromClaro]}
                progressBackgroundColor="#fff"
              />
            }
            contentContainerStyle={{ paddingBottom: 90 }}
          />
        )}
        <TouchableOpacity
          style={styles.popupButton}
          onPress={() => setShowFormModal(true)}
          activeOpacity={0.85}
        >
          <FontAwesomeIcon icon={faPlus} size={32} color={COLORS.branco} />
        </TouchableOpacity>
      </View>

      <ProdutoModal
        visible={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setEditingData(null)
        }}
        initialData={editingData}
        onSave={onSave}
      />
    </SafeArea>
  )
}

export default Produtos