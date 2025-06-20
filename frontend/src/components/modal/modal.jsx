import { View, Text, TouchableOpacity, Modal as RNModal } from "react-native"
import { styles } from "./modal.style"

const Modal = ({ visible, onClose, message }) => {
  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  )
}

export default Modal
