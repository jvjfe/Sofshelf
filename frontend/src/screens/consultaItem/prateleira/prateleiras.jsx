import React, { useEffect, useState, useRef } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { EvilIcons } from "@expo/vector-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import SafeArea from "../../../components/safeArea/safeArea"
import { COLORS } from "../../../constants/tema"
import UserButtonBack from "../../../components/userButtonBack/userButtonBack"
import Header from "../../../components/header/header"
import API from "../../../services/apiAxios"
import InfoModal from "../../../components/infoModal/infoModal"
import FormModal from "../../../components/formModal/formModal"
import styles from "./prateleiras.styles"
import { useRoute, useNavigation } from "@react-navigation/native"
import { getToken } from "../../../services/storageService"
import ShelfServices from "../../../services/servicesBackend/ShelfServices"

function Prateleira() {
  const [prateleiras, setPrateleiras] = useState([])
  const [infos, setInfos] = useState(false)
  const [prateleira, setPrateleira] = useState(null)
  const [rackId, setRackId] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const clearSearchSignal = useRef(false);
  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    if (route.params?.rackId) {
      setRackId(route.params.rackId)
    }
  }, [route.params])

  const carregarPrateleiras = async () => {
    if (!rackId) return
    try {
      const data = await ShelfServices.getShelfByRackId(rackId, true)
      setPrateleiras(data)
      clearSearchSignal.current = true;
      setProdutosFiltrados([]);
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    carregarPrateleiras()
  }, [rackId])

  const seeInfos = async (id) => {
    try {
      setInfos(true)
      const token = await getToken()
      const { data } = await API.get(`/shelves/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPrateleira(data)
    } catch (error) {
      console.error("Erro ao mostrar prateleira:", error.response?.data || error.message)
    }
  }

  const handleEdit = (data) => {
    setInfos(false)
    setEditingData(data)
    setShowFormModal(true)
  }

  const handleDelete = async () => {
    await carregarPrateleiras()
  }

  const goProducts = (id) => {
    navigation.navigate("produtos", { shelfId: id })
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
      <UserButtonBack onPress={goBack} text="Consultar Prateleiras" />
      <View style={styles.container}>
        <Header onProductsChange={setProdutosFiltrados} clearSearchSignal={clearSearchSignal} />
        <View style={styles.line}>
          <Text style={styles.lineT}>Prateleiras</Text>
        </View>
        <FlatList
          data={prateleiras}
          renderItem={({ item }) => (
            <View style={styles.boxInfo}>
              <View>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnInfo}
                onPress={() => seeInfos(item.id)}
              >
                <MaterialIcons name="info" size={32} color={COLORS.marrom} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goProducts(item.id)}>
                <EvilIcons name="chevron-right" size={40} color={COLORS.marrom} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scroll}
          ListEmptyComponent={
            <Text style={styles.itemTitle}>Nenhuma prateleira disponível.</Text>
          }
        />

        <TouchableOpacity style={styles.popupButton} onPress={() => setShowFormModal(true)}>
          <FontAwesomeIcon icon={faPlus} size={32} color={COLORS.branco} />
        </TouchableOpacity>

        <InfoModal
          visible={infos}
          data={prateleira}
          onClose={() => setInfos(false)}
          itens="Product"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <FormModal
          visible={showFormModal}
          onClose={() => { setShowFormModal(false); setEditingData(null) }}
          initialData={editingData}
          onSave={carregarPrateleiras}
          type="shelf"
          rackId={rackId}
        />
      </View>
    </SafeArea>
  )
}

export default Prateleira