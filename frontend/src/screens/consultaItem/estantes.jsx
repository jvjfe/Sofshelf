import React, { useEffect, useState, useRef } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import SafeArea from "../../components/safeArea/safeArea.jsx"
import { COLORS } from "../../constants/tema.js"
import UserButtonBack from "../../components/userButtonBack/userButtonBack.jsx"
import styles from "./estantes.style.js"
import Header from "../../components/header/header.jsx"
import InfoModal from "../../components/infoModal/infoModal.jsx"
import FormModal from "../../components/formModal/formModal.jsx"
import { useNavigation } from "@react-navigation/native"
import { EvilIcons } from "@expo/vector-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import RackServices from "../../services/servicesBackend/RackServices.js"

function Estantes() {
  const [estantes, setEstantes] = useState([])
  const [infos, setInfos] = useState(false)
  const [estante, setEstante] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const clearSearchSignal = useRef(false);
  const navigation = useNavigation()

  const carregarEstantes = async () => {
    try {
      const data = await RackServices.getRacksByCompanyId(true)
      setEstantes(data)
      clearSearchSignal.current = true;
      setProdutosFiltrados([]);
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    carregarEstantes()
  }, [])

  const seeInfos = async (id) => {
    try {
      setInfos(true)
      const data = await RackServices.getRackById(id)
      setEstante(data)
    } catch (error) {
      console.error("Erro ao mostrar estante pressionada:", error.response?.data || error.message)
    }
  }

  const handleEdit = (data) => {
    setInfos(false)
    setEditingData(data)
    setShowFormModal(true)
  }

  const handleDelete = async () => {
    await carregarEstantes()
  }

  const goShelves = (id) => {
    navigation.navigate("prateleiras", { rackId: id })
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
      <View style={styles.container}>
        <UserButtonBack onPress={goBack} text="Consultar Estoque" />
        <Header onProductsChange={setProdutosFiltrados} clearSearchSignal={clearSearchSignal} />
        <View style={styles.line}>
          <Text style={styles.lineT}>Estantes</Text>
        </View>
        <FlatList
          data={estantes}
          renderItem={({ item }) => (
            <View style={styles.boxInfo}>
              <TouchableOpacity onPress={() => seeInfos(item.id)} style={styles.iconLeft}>
                <MaterialIcons name="info" size={32} color={COLORS.branco} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => goShelves(item.id)} style={styles.iconRight}>
                <EvilIcons name="chevron-right" size={40} color={COLORS.branco} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.scroll}
          ListEmptyComponent={
            <Text style={styles.itemTitle}>Nenhuma estante disponível.</Text>
          }
        />

        <TouchableOpacity style={styles.popupButton} onPress={() => setShowFormModal(true)}>
          <FontAwesomeIcon icon={faPlus} size={32} color={COLORS.branco} />
        </TouchableOpacity>

        <InfoModal
          visible={infos}
          data={estante}
          onClose={() => setInfos(false)}
          itens="shelves"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <FormModal
          visible={showFormModal}
          onClose={() => { setShowFormModal(false); setEditingData(null) }}
          initialData={editingData}
          onSave={carregarEstantes}
          type="rack"
        />
      </View>
    </SafeArea>
  )
}

export default Estantes