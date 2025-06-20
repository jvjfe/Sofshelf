import React, { useState, useEffect } from "react"
import { View, TextInput, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native"
import { getUserData } from "../../services/storageService"
import styles from "./formModal.style"
import RackServices from "../../services/servicesBackend/RackServices"
import ShelfServices from "../../services/servicesBackend/ShelfServices"

const FormModal = ({
  visible,
  onClose,
  initialData = null,
  onSave,
  type = "rack",
  rackId
}) => {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState(null)
  const [companyId, setCompanyId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserData()
      if (userData) {
        setUserId(userData.id)
        setCompanyId(userData.companyId)
      }
    }
    if (visible) {
      loadUserData()
      if (initialData) {
        setName(initialData.name || "")
        setLocation(initialData.location || "")
        setDescription(initialData.description || "")
      } else {
        setName("")
        setLocation("")
        setDescription("")
      }
    }
  }, [visible, initialData])

  const handleSubmit = async () => {
    if (!name) return

    setLoading(true)
    try {

      if (type === "rack") {
        const data = {
          name,
          location,
          description,
          userId,
          companyId
        }
        if (initialData) {
          await RackServices.updateRack(initialData.id, data)
        } else {
          await RackServices.createRack(data)
        }
      }

      else if (type === "shelf") {
        const data = {
          name,
          rackId,
          userId,
          companyId
        }
        if (initialData) {
          await ShelfServices.updateShelf(initialData.id, data)
        } else {
          await ShelfServices.createShelf(data)
        }
      }
      onSave()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const modalTitle = type === "rack"
    ? (initialData ? "Editar Estante" : "Adicionar Estante")
    : (initialData ? "Editar Prateleira" : "Adicionar Prateleira")

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(), onClose() }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.popup}>
              <Text style={styles.title}>{modalTitle}</Text>

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={type === "rack" ? "Nome da Estante*" : "Nome da Prateleira*"}
              />

              {type === "rack" && (
                <>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Localização"
                  />
                  <TextInput
                    style={styles.textarea}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descrição da Estante"
                    multiline={true}
                    numberOfLines={4}
                  />
                </>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.buttonText}>Salvar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonClose, loading && styles.buttonDisabled]}
                  onPress={onClose}
                  disabled={loading}
                >
                  <Text style={styles.buttonCloseText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default FormModal