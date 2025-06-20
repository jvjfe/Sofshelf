import React from "react"
import { View, Text, TouchableOpacity, Modal } from "react-native"
import styles from "./confirmModal.style.js"

const ConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  title = "Confirmar Exclusão",
  message = "Tem certeza que deseja executar esta ação?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonStyle = {},
  cancelButtonStyle = {},
}) => {
  if (!visible) return null

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.cancelButton, cancelButtonStyle]} onPress={onClose}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteButton, confirmButtonStyle]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmModal