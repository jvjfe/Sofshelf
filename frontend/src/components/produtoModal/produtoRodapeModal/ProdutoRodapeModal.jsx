import React, { useState } from "react"
import { View, Text, TouchableOpacity, Modal, TextInput, Switch, ActivityIndicator, Alert, Keyboard } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import styles from "./ProdutoRodapeModal.style"
import { COLORS } from "../../../constants/tema"
import MovementServices from "../../../services/servicesBackend/MovementServices"

export default function RodapeModal({ item, insets, filteredProductPrice, estoqueAtual, movimentacaoRegistrada }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalAcao, setModalAcao] = useState(null)
    const [modalQtd, setModalQtd] = useState("")
    const [isEmbalagem, setIsEmbalagem] = useState(false)
    const [loading, setLoading] = useState(false)

    const openModal = () => setModalVisible(true)

    const closeModal = () => {
        Keyboard.dismiss()
        setModalVisible(false)
        setModalQtd("")
        setModalAcao(null)
        setIsEmbalagem(false)
        setLoading(false)
    }

    const handleAcao = (acao) => setModalAcao(acao)

    const handleQtdChange = (qtd) => setModalQtd(qtd)

    const handleRegistrar = async () => {
        const productPriceId = filteredProductPrice?.id || item?.productPrice?.[0]?.id
        const companyId = item?.company?.id
        const userId = item?.user?.id

        if (!modalAcao || !modalQtd || Number(modalQtd) <= 0) {
            Alert.alert("Atenção", "Informe a ação e uma quantidade válida.")
            return
        }

        const movimento = {
            productId: item.id,
            productPrice: productPriceId,
            quantity: Number(modalQtd),
            action: modalAcao,
            isEmbalagem,
            companyId,
            userId,
        }

        setLoading(true)

        try {
            await MovementServices.createMovement(movimento)
            if (movimentacaoRegistrada) {
                movimentacaoRegistrada()
            }
            closeModal()
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <>
            <View style={[styles.rodapeModalWrap, { paddingBottom: insets?.bottom || 16 }]}>
                <View style={styles.estoqueAtualBox}>
                    <Text style={styles.estoqueAtualLabel}>Estoque Atual</Text>
                    <Text style={styles.estoqueAtualValor}>{estoqueAtual ?? 0}</Text>
                </View>
                <TouchableOpacity
                    style={styles.rodapeModalBtn}
                    onPress={openModal}
                >
                    <AntDesign name="pluscircleo" size={24} color={styles.rodapeModalBtnText.color} />
                    <Text style={styles.rodapeModalBtnText}>
                        Movimentar Estoque
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={closeModal}
                    activeOpacity={1}
                >
                    <View style={styles.modalSheet}>
                        <Text style={styles.modalTitle}>Movimentação de Estoque</Text>
                        <View style={styles.modalBtnRow}>
                            <TouchableOpacity
                                style={[
                                    styles.modalAcaoBtn,
                                    modalAcao === "entrada" && styles.modalAcaoBtnEntrada,
                                    modalAcao !== "entrada" && styles.modalAcaoBtnInactive,
                                ]}
                                onPress={() => handleAcao("entrada")}
                                disabled={loading}
                            >
                                <AntDesign
                                    name="arrowup"
                                    size={22}
                                    color={modalAcao === "entrada" ? COLORS.marromEscuro : COLORS.branco}
                                />
                                <Text
                                    style={[
                                        styles.modalAcaoText,
                                        modalAcao !== "entrada" && styles.modalAcaoTextInactive,
                                    ]}
                                >
                                    Entrada
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalAcaoBtn,
                                    modalAcao === "saida" && styles.modalAcaoBtnSaida,
                                    modalAcao !== "saida" && styles.modalAcaoBtnInactive,
                                ]}
                                onPress={() => handleAcao("saida")}
                                disabled={loading}
                            >
                                <AntDesign
                                    name="arrowdown"
                                    size={22}
                                    color={modalAcao === "saida" ? COLORS.marromEscuro : COLORS.branco}
                                />
                                <Text
                                    style={[
                                        styles.modalAcaoText,
                                        modalAcao !== "saida" && styles.modalAcaoTextInactive,
                                    ]}
                                >
                                    Saída
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {modalAcao && (
                            <>
                                <TextInput
                                    style={styles.modalInput}
                                    value={modalQtd}
                                    onChangeText={handleQtdChange}
                                    placeholder="Quantidade"
                                    keyboardType="numeric"
                                    editable={!loading}
                                />
                                <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 8
                                    }}
                                    onPress={() => setIsEmbalagem((prev) => !prev)}
                                    activeOpacity={0.7}
                                    disabled={loading}
                                >
                                    <Switch
                                        value={isEmbalagem}
                                        onValueChange={setIsEmbalagem}
                                        thumbColor={isEmbalagem ? COLORS.verdeClaro : COLORS.cinzaClaro}
                                        trackColor={{ false: COLORS.cinzaClaro, true: COLORS.verdeClaro }}
                                        disabled={loading}
                                        pointerEvents="none"
                                    />
                                    <Text style={{
                                        color: COLORS.marromEscuro,
                                        fontWeight: "bold"
                                    }}>
                                        Movimentar por embalagem
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.modalActionFooter}>
                                    <TouchableOpacity
                                        style={[styles.modalFooterBtn, styles.modalFooterBtnNeutral]}
                                        onPress={closeModal}
                                        disabled={loading}
                                    >
                                        <Text style={styles.modalFooterTextNeutral}>
                                            Cancelar
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalFooterBtn, styles.modalFooterBtnPrimary]}
                                        onPress={handleRegistrar}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color={COLORS.branco} />
                                        ) : (
                                            <Text style={styles.modalFooterText}>
                                                Registrar {modalAcao === "entrada" ? "Entrada" : "Saída"}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}