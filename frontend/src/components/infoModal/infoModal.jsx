import React, { useState } from "react"
import { View, Text, TouchableOpacity, Pressable } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { COLORS, FONT_SIZE } from "../../constants/tema"
import styles from "../../screens/consultaItem/estantes.style"
import ConfirmModal from "../confirmModal/confirmModal"
import RackServices from "../../services/servicesBackend/RackServices"

function InfoModal({ visible, data, onClose, itens, onEdit, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!visible || !data) return null

  const handleDelete = async (id) => {
    try {
      await RackServices.deleteRack(id, false)
      onDelete()
      onClose()
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const deleteTitle = itens === "shelves" ? "Confirmar Exclusão" : "Confirmar Exclusão"
  const deleteMessage =
    itens === "shelves"
      ? `Tem certeza que deseja excluir a estante ${data.name}?`
      : `Tem certeza que deseja excluir a prateleira ${data.name}?`
  const confirmText = "Confirmar"
  const cancelText = "Cancelar"

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.infoEstante}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>
            {itens === "shelves" ? "Informações da Estante" : "Informações da Prateleira"}
          </Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={32} color={COLORS.marromClaro} />
          </TouchableOpacity>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.labelText}>Nome: </Text>
          <Text style={styles.textM}>{data.name}</Text>
        </View>

        {data.description && (
          <View style={styles.textWrapper}>
            <Text style={styles.labelText}>Descrição: </Text>
            <Text style={styles.textM}>{data.description}</Text>
          </View>
        )}

        {data.location && (
          <View style={styles.textWrapper}>
            <Text style={styles.labelText}>Localização: </Text>
            <Text style={styles.textM}>{data.location}</Text>
          </View>
        )}

        {itens === "Product" ? (
          <View style={styles.textWrapper}>
            <Text style={styles.labelText}>Produtos: </Text>
            <Text style={styles.textM}>{data._count?.product || 0}</Text>
          </View>
        ) : (
          <View style={styles.textWrapper}>
            <Text style={styles.labelText}>Prateleiras: </Text>
            <Text style={styles.textM}>{data._count?.shelves || 0}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(data)}>
            <MaterialIcons name="edit" size={FONT_SIZE.lg} color={COLORS.branco} />
            <Text style={styles.buttonText}>Alterar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeleteModal(true)}
          >
            <MaterialIcons name="delete" size={FONT_SIZE.lg} color={COLORS.branco} />
            <Text style={styles.buttonText}>Desativar</Text>
          </TouchableOpacity>
        </View>

        <ConfirmModal
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          data={data}
          title={deleteTitle}
          message={deleteMessage}
          confirmText={confirmText}
          cancelText={cancelText}
          confirmButtonStyle={{ backgroundColor: COLORS.vermelho }}
        />
      </View>
    </Pressable>
  )
}

export default InfoModal