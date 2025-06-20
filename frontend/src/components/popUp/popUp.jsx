import React from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { COLORS } from '../../constants/tema'
import styles from './popUp.style'

const Popup = ({ visible, onClose, options, title }) => {
  if (!visible) return null

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popupCard}>
          {title && <Text style={styles.popupTitle}>{title}</Text>}
          <View style={styles.divider} />

          {Array.isArray(options) && options.length > 0 ? (
            options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                style={styles.optionButton}
              >
                <FontAwesomeIcon icon={option.icon} size={20} color={COLORS.marrom} />
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noOptionsText}>Nenhuma opção disponível</Text>
          )}

          <View style={styles.divider} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Popup
