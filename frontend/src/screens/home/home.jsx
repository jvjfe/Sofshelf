import React, { useState, useEffect, useRef } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../../constants/tema"
import styles from "./home.style"
import icons from "../../constants/icons"
import Header from "../../components/header/header.jsx"
import SafeArea from "../../components/safeArea/safeArea.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import InfoModal from "../../components/infoModal/infoModal.jsx"
import FormModal from "../../components/formModal/formModal.jsx"
import RackServices from "../../services/servicesBackend/RackServices.js"

function Home() {
  const [showFormModal, setShowFormModal] = useState(false)
  const [estantes, setEstantes] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const [infos, setInfos] = useState(false)
  const [estante, setEstante] = useState(null)
  const [editingData, setEditingData] = useState(null)
  const [produtosFiltrados, setProdutosFiltrados] = useState([])
  const clearSearchSignal = useRef(false);

  const carregarEstantes = async () => {
    setRefreshing(true)
    try {
      const data = await RackServices.getRacksByCompanyId(true)
      setEstantes(data)
      clearSearchSignal.current = true;
      setProdutosFiltrados([])
    } catch (error) {
      console.error("Erro na requisição:", error.response?.data || error.message)
    } finally {
      setRefreshing(false)
    }
  }

  const seeInfos = async (id) => {
    try {
      setInfos(true)
      const data = await RackServices.getRackById(id)
      setEstante(data)
    } catch (error) {
      console.error("Erro ao mostrar estante:", error.response?.data || error.message)
    }
  }

  const handleEdit = (data) => {
    setInfos(false)
    setEditingData(data)
    setShowFormModal(true)
  }

  const handleDelete = async () => {
    carregarEstantes()
  }

  const goShelves = (id) => {
    navigation.navigate("prateleiras", { rackId: id })
  }

  useEffect(() => {
    carregarEstantes()
  }, [])

  return (
    <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
      <ScrollView
        style={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={carregarEstantes} />}
      >
        <View style={{ flex: 1, backgroundColor: COLORS.branco }}>

          <Header onProductsChange={setProdutosFiltrados} clearSearchSignal={clearSearchSignal} />

          <View style={styles.grafico}>
            <Text style={styles.graficoText}>Atualização de vendas</Text>
            <View style={styles.touchable}>
              <Image style={styles.graficoImg} source={icons.img} />
            </View>
          </View>

          <View style={styles.containerPrat}>
            <Text style={styles.pratHeader}>Estantes</Text>
            <View style={styles.pratileiras}>
              {estantes.length > 0 ? (
                estantes.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => goShelves(item.id)}>
                    <TouchableOpacity style={styles.btnInfo} onPress={() => seeInfos(item.id)}>
                      <MaterialIcons name="info" size={35} color={COLORS.marrom} />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                      <Text style={styles.itemTitle}>{item.name}</Text>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.itemTitle}>Nenhuma estante disponível.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

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
    </SafeArea>
  )
}

export default Home