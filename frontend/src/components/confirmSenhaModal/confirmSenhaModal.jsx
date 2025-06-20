import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native"
import Icon from "@expo/vector-icons/MaterialIcons"
import styles from "./confirmSenhaModal.style"

export default function ConfirmSenhaModal({ visible, onConfirm, onCancel, error }) {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (visible) {
            setPassword("")
            setShowPassword(false)
        }
    }, [visible])

    if (!visible) return null

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
            onCancel()
        }}>
            <View style={styles.overlay}>
                <Pressable
                    style={styles.container}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Text style={styles.title}>Confirme sua senha</Text>

                    <View style={{ marginBottom: 12 }}>
                        <View style={{ justifyContent: "center" }}>
                            <TextInput
                                style={[styles.input, { paddingRight: 40 }]}
                                placeholder="Digite sua senha"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    top: "50%",
                                    transform: [{ translateY: -12 }],
                                    height: 24,
                                    width: 24,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onPress={() => setShowPassword((v) => !v)}
                                accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <Icon
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={24}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <View style={[styles.buttonRow, { gap: 12, marginTop: 0 }]}>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => onConfirm(password)}
                        >
                            <Text style={styles.btnText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}