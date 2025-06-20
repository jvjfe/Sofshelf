import React, { useState, useEffect, useCallback } from "react"
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { getUserData } from "../../../services/storageService"
import { styles } from "./solicitation.style"
import SafeArea from "../../../components/safeArea/safeArea"
import InviteService from "../../../services/servicesBackend/InviteServices"

const SolicitationScreen = ({ route, navigation }) => {
    const { name } = route.params
    const [invites, setInvites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [userId, setUserId] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData()
            if (userData) {
                setUserId(userData.id)
            }
        }
        fetchUserData()
    }, [])

    const fetchInvites = useCallback(async () => {
        if (!userId) return

        setLoading(true)
        try {
            const data = await InviteService.indexEmployee(userId)
            setInvites(data)
            setError("")
        } catch (error) {
            console.error("Erro ao carregar convites:", error)
            setError("Erro ao carregar convites.")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [userId])

    useEffect(() => {
        fetchInvites()
    }, [fetchInvites])

    const onRefresh = () => {
        setRefreshing(true)
        fetchInvites()
    }

    const handleReapply = async (email) => {
        try {
            const data = await InviteService.reapply({ email })
            if (data?.message) {
                alert(data.message)
                fetchInvites()
            } else {
                alert(data?.error || "Erro ao reenviar solicitação.")
            }
        } catch (error) {
            console.error("Erro ao reenviar solicitação:", error)
            alert("Erro ao reenviar solicitação.")
        }
    }

    return (
        <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
            <View style={styles.navBar}>
                <Text style={styles.navText}>Solicitações</Text>
            </View>

            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : invites.length === 0 ? (
                    <Text style={styles.noInvitesText}>Não há convites pendentes.</Text>
                ) : (
                    invites.map((invite, index) => {
                        let statusColor = "orange"
                        let statusText = "Pendente"
                        let statusAction = null

                        if (invite.status === "DECLINED") {
                            statusColor = "red"
                            statusText = "Recusado"
                            statusAction = (
                                <TouchableOpacity
                                    style={[styles.reapplyButton, { backgroundColor: "#FF5252" }]}
                                    onPress={() => handleReapply(invite.userEmail || invite.email)}
                                >
                                    <Text style={styles.reapplyButtonText}>Reenviar Solicitação</Text>
                                </TouchableOpacity>
                            )
                        } else if (invite.status === "ACCEPTED") {
                            statusColor = "green"
                            statusText = "Aceito"
                            setTimeout(() => {
                                navigation.navigate("home")
                            }, 1000)
                        }

                        return (
                            <View key={index} style={styles.inviteCard}>
                                <View style={styles.inviteHeader}>
                                    <FontAwesome name="envelope" size={24} style={styles.icon} />
                                    <Text style={styles.inviteTitle}>Esperando a confirmação de entrada</Text>
                                </View>

                                <View style={styles.inviteDetails}>
                                    <Text style={styles.inviteText}>
                                        <Text style={styles.label}>Nome:</Text> {invite.userName || name}
                                    </Text>
                                    <Text style={styles.inviteText}>
                                        <Text style={styles.label}>Email:</Text> {invite.userEmail || invite.email}
                                    </Text>
                                </View>

                                <Text style={[styles.inviteMessage, { color: statusColor }]}>{statusText}</Text>

                                {statusAction}
                            </View>
                        )
                    })
                )}
            </ScrollView>
        </SafeArea>
    )
}

export default SolicitationScreen