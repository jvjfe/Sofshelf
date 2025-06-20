import React, { useState, useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, Animated, Easing, Modal, FlatList, Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../constants/tema"
import styles from "./ProdutoPopUp.style"
import VariacaoServices from "../../services/servicesBackend/VariacaoServices"
import VariacaoModal from "../variacaoModal/variacaoModal"
import ProductServices from "../../services/servicesBackend/ProductServices"
import { getUserData } from "../../services/storageService"
import ConfirmModal from "../confirmModal/confirmModal"
import ProdutoModal from './../produtoModal/ProdutoModal'
import { useNavigation } from "@react-navigation/native"

export default function PopupMenu({ productId, onAtualizarProduto }) {
  const [menuVisible, setMenuVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [variacoesModalVisible, setVariacoesModalVisible] = useState(false)
  const [variacaoModalVisible, setVariacaoModalVisible] = useState(false)
  const [actionType, setActionType] = useState(null)
  const [actionTarget, setActionTarget] = useState(null)
  const [selectedVariacao, setSelectedVariacao] = useState(null)
  const [variacoes, setVariacoes] = useState([])
  const [loadingVariacoes, setLoadingVariacoes] = useState(false)
  const [variacaoModalMode, setVariacaoModalMode] = useState("create")
  const [initialVariacaoData, setInitialVariacaoData] = useState(null)
  const [produtoAtual, setProdutoAtual] = useState(null)
  const [usuarioAtual, setUsuarioAtual] = useState(null)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [produtoModalVisible, setProdutoModalVisible] = useState(false)
  const [variacaoError, setVariacaoError] = useState("")
  const [confirmType, setConfirmType] = useState(null)
  const scaleAnim = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const navigation = useNavigation()

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(rotateAnim, { toValue: 0, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start(() => setMenuVisible(false))
  }

  const openMenu = () => {
    setMenuVisible(true)
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(rotateAnim, { toValue: 1, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start()
  }

  const toggleMenu = () => {
    if (menuVisible) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserData()
      setUsuarioAtual(user)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    async function fetchProduto() {
      const prod = await ProductServices.getProductById(productId)
      setProdutoAtual(prod)
    }
    fetchProduto()
  }, [productId])

  const loadVariacoes = async () => {
    setLoadingVariacoes(true)
    try {
      const data = await VariacaoServices.getVariacaoByProductId(productId)
      setVariacoes(Array.isArray(data) ? data : [])
    } catch {
      setVariacoes([])
    } finally {
      setLoadingVariacoes(false)
    }
  }

  const openVariacoesModal = async () => {
    setSelectedVariacao(null)
    setVariacaoError("")
    await loadVariacoes()
    setVariacoesModalVisible(true)
  }

  const handleAction = (type) => {
    setActionType(type)
    if (type === "adicionar") {
      setActionTarget("variacao")
      setInitialVariacaoData(null)
      setVariacaoModalMode("create")
      setVariacaoModalVisible(true)
      closeMenu()
    } else {
      setActionTarget(null)
      setModalVisible(true)
      closeMenu()
    }
  }

  const handleTargetSelection = (target) => {
    setActionTarget(target)
    setModalVisible(false)
    if (target === "produto") {
      if (actionType === "excluir") {
        setConfirmType("produto")
        setConfirmModalVisible(true)
      } else {
        setProdutoModalVisible(true)
      }
    } else if (target === "variacao") {
      openVariacoesModal()
    }
  }

  const handleConfirmVariacao = async () => {
    if (!selectedVariacao) {
      setVariacaoError("Selecione uma variação")
      return
    }
    setVariacaoError("")
    if (actionType === "editar") {
      setInitialVariacaoData(selectedVariacao)
      setVariacaoModalMode("edit")
      setVariacoesModalVisible(false)
      setVariacaoModalVisible(true)
    }
    if (actionType === "excluir") {
      setConfirmType("variacao")
      setConfirmModalVisible(true)
    }
  }

  const excluirVariacao = async () => {
    try {
      const produtoAtualizado = await ProductServices.getProductById(productId)
      const payload = {
        name: produtoAtualizado.name,
        description: produtoAtualizado.description,
        embalagemSigla: produtoAtualizado.embalagemSigla,
        qtEmbalagem: produtoAtualizado.qtEmbalagem.quantity,
        shelfId: produtoAtualizado.shelf.id,
        companyId: produtoAtualizado.company.id,
        userId: usuarioAtual.id,
        deletedVariationIds: [selectedVariacao.id]
      }
      await ProductServices.updateProduct(productId, payload)
      setVariacoes((prev) => prev.filter(v => v.id !== selectedVariacao.id))
      setSelectedVariacao(null)
      setVariacoesModalVisible(false)
      setConfirmModalVisible(false)
      if (onAtualizarProduto) onAtualizarProduto()
    } catch (error) {
      setConfirmModalVisible(false)
    }
  }

  const excluirProduto = async () => {
    try {
      await ProductServices.deleteProduct(productId)
      setConfirmModalVisible(false)
      if (onAtualizarProduto) onAtualizarProduto()
      navigation.goBack()
    } catch (error) {
      setConfirmModalVisible(false)
    }
  }

  const handleSaveVariacao = async (data) => {
    try {
      const produtoAtualizado = await ProductServices.getProductById(productId)
      if (variacaoModalMode === "create") {
        const payload = {
          name: produtoAtualizado.name,
          description: produtoAtualizado.description,
          embalagemSigla: produtoAtualizado.embalagemSigla,
          qtEmbalagem: produtoAtualizado.qtEmbalagem.quantity,
          shelfId: produtoAtualizado.shelf.id,
          companyId: produtoAtualizado.company.id,
          userId: usuarioAtual.id,
          newVariations: [data]
        }
        await ProductServices.updateProduct(productId, payload)
      } else if (variacaoModalMode === "edit" && data.id) {
        const payload = {
          name: produtoAtualizado.name,
          description: produtoAtualizado.description,
          embalagemSigla: produtoAtualizado.embalagemSigla,
          qtEmbalagem: produtoAtualizado.qtEmbalagem.quantity,
          shelfId: produtoAtualizado.shelf.id,
          companyId: produtoAtualizado.company.id,
          userId: usuarioAtual.id,
          updatedVariations: [data]
        }
        await ProductServices.updateProduct(productId, payload)
      }
      await loadVariacoes()
      if (onAtualizarProduto) onAtualizarProduto()
      setVariacaoModalVisible(false)
      setInitialVariacaoData(null)
      setVariacaoModalMode("create")
      setSelectedVariacao(null)
    } catch {}
  }

  const actions = [
    { icon: "plus", label: "Adicionar", onPress: () => handleAction("adicionar") },
    { icon: "pencil", label: "Editar", onPress: () => handleAction("editar") },
    { icon: "delete", label: "Excluir", onPress: () => handleAction("excluir") },
  ]

  const handleCloseVariacaoModal = () => {
    if (actionType === "adicionar") {
      setVariacaoModalVisible(false)
      openMenu()
      setInitialVariacaoData(null)
      setVariacaoModalMode("create")
      setSelectedVariacao(null)
    } else {
      setVariacaoModalVisible(false)
      setVariacoesModalVisible(true)
      setInitialVariacaoData(null)
      setVariacaoModalMode("create")
      setSelectedVariacao(null)
    }
  }

  const handleCloseVariacoesModal = () => {
    setVariacoesModalVisible(false)
    setModalVisible(true)
    setSelectedVariacao(null)
    setVariacaoError("")
  }

  return (
    <View style={styles.container}>
      {menuVisible &&
        actions.map((action, index) => (
          <Animated.View
            key={index}
            style={[
              styles.menuItem,
              { transform: [{ scale: scaleAnim }], top: 72 + index * 58 },
            ]}
          >
            <TouchableOpacity style={styles.button} onPress={action.onPress}>
              <Text style={styles.label}>{action.label}</Text>
              <View style={styles.iconWrapper}>
                <Icon name={action.icon} size={22} color={COLORS.cinzaEscuro} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon name="plus" size={28} color={COLORS.marromEscuro} />
        </Animated.View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContentMenu}>
            <Text style={styles.modalTitle}>
              {actionType === "editar" ? "Editar" : "Excluir"} o quê?
            </Text>
            <TouchableOpacity
              onPress={() => handleTargetSelection("produto")}
              style={styles.menuProdutoBtn}
            >
              <Text style={styles.menuProdutoBtnText}>Produto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTargetSelection("variacao")}
              style={styles.menuVariacaoBtn}
            >
              <Text style={styles.menuVariacaoBtnText}>Variação</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                openMenu()
              }}
              style={styles.menuCancelarBtn}
            >
              <Text style={styles.menuCancelarBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={variacoesModalVisible} transparent animationType="slide" onRequestClose={handleCloseVariacoesModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContentVariacao}>
            <Text style={styles.modalTitle}>
              Escolha a variação para {actionType}
            </Text>
            <FlatList
              data={Array.isArray(variacoes) ? variacoes : []}
              keyExtractor={(item) => item.id?.toString()}
              style={styles.variacaoList}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.variacaoItem,
                    selectedVariacao?.id === item.id && styles.variacaoItemSelected
                  ]}
                  onPress={() => setSelectedVariacao(item)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.variacaoBrand}>
                      {item.brand?.name || "Marca desconhecida"}
                    </Text>
                    <View style={styles.variacaoColorRow}>
                      <View style={[
                        styles.variacaoColorDot,
                        { backgroundColor: item.color?.hexCode || "#ccc" }
                      ]} />
                      <Text>{item.color?.name || "Cor indefinida"}</Text>
                    </View>
                  </View>
                  <Text style={styles.variacaoPrice}>
                    R$ {Number(item.price).toFixed(2).replace(".", ",")}
                  </Text>
                </Pressable>
              )}
            />
            {variacaoError ? (
              <Text style={styles.variacaoError}>{variacaoError}</Text>
            ) : null}
            <TouchableOpacity
              onPress={handleConfirmVariacao}
              style={[
                styles.confirmarBtn,
                actionType === "excluir" && styles.excluirBtn
              ]}
            >
              <Text style={styles.confirmarBtnText}>
                {actionType === "excluir" ? "Excluir" : "Confirmar"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseVariacoesModal}
              style={styles.cancelarBtn}
            >
              <Text style={styles.cancelarBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ConfirmModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={() => {
          if (confirmType === "produto") {
            excluirProduto()
          } else if (confirmType === "variacao") {
            excluirVariacao()
          }
        }}
        title={confirmType === "produto" ? "Excluir Produto" : "Excluir Variação"}
        message={confirmType === "produto"
          ? "Tem certeza que deseja excluir o produto?"
          : "Tem certeza que deseja excluir a variação?"}
        confirmText="Excluir"
        cancelText="Cancelar"
        confirmButtonStyle={{ backgroundColor: COLORS.vermelho }}
      />

      <ProdutoModal
        visible={produtoModalVisible}
        onClose={() => setProdutoModalVisible(false)}
        mode="edit"
        initialData={produtoAtual}
        onSave={response => {
          setProdutoModalVisible(false)
          onAtualizarProduto && onAtualizarProduto()
        }}
      />

      <VariacaoModal
        visible={variacaoModalVisible}
        onClose={handleCloseVariacaoModal}
        mode={variacaoModalMode}
        initialData={initialVariacaoData}
        onSave={handleSaveVariacao}
      />
    </View>
  )
}