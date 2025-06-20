import React, { useState, useEffect } from "react"
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { getUserData } from "../../services/storageService"
import { styles } from "./notify.style"
import SafeArea from "../../components/safeArea/safeArea"
import UserButtonBack from "../../components/userButtonBack/userButtonBack"
import InviteService from "../../services/servicesBackend/InviteServices"

const InvitesScreen = () => {
    const [invites, setInvites] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userCompanyId, setUserCompanyId] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData()
            if (userData) {
                setUserEmail(userData.email)
                setUserCompanyId(userData.companyId)
                setIsAdmin(userData.role === "admin")
            }
        }
        fetchUserData()
    }, [])

    const fetchInvites = async () => {
        if (!userCompanyId || !isAdmin) {
            setLoading(false)
            setRefreshing(false)
            return
        }
        try {
            const companyId = userCompanyId
            const data = await InviteService.index(companyId)
            if (Array.isArray(data)) {
                setInvites(data)
            } else {
                setError("Erro ao carregar convites.")
            }
        } catch (error) {
            console.error("Erro ao buscar convites:", error)
            setError("Erro ao buscar convites.")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        if (userCompanyId && isAdmin) {
            fetchInvites()
        } else {
            setLoading(false)
        }
    }, [userCompanyId, isAdmin])

    const onRefresh = () => {
        setRefreshing(true)
        fetchInvites()
    }

    const handleAccept = async (inviteId) => {
        try {
            await InviteService.accept(inviteId)
            await fetchInvites()
            setInvites((prevInvites) =>
                prevInvites.map((invite) =>
                    invite.id === inviteId ? { ...invite, status: "ACCEPTED" } : invite
                )
            )
        } catch (error) {
            console.error("Erro ao aceitar o convite:", error)
            setError("Erro ao aceitar o convite.")
        }
    }

    const handleDecline = async (inviteId) => {
        try {
            await InviteService.decline(inviteId)
            await fetchInvites()
            setInvites((prevInvites) =>
                prevInvites.map((invite) =>
                    invite.id === inviteId ? { ...invite, status: "DECLINED" } : invite
                )
            )
        } catch (error) {
            console.error("Erro ao recusar o convite:", error)
            setError("Erro ao recusar o convite.")
        }
    }

    const renderStatus = (status, acceptedAt, inviteId) => {
        let statusText = ""
        let statusStyle = styles.statusText
        let actionButtons = null
        switch (status) {
            case "PENDING":
                statusText = "Pendente"
                statusStyle = [styles.statusText, styles.pendingStatus]
                actionButtons = (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => handleAccept(inviteId)}
                        >
                            <Text style={styles.buttonText}>Aceitar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.declineButton]}
                            onPress={() => handleDecline(inviteId)}
                        >
                            <Text style={styles.buttonText}>Recusar</Text>
                        </TouchableOpacity>
                    </View>
                )
                break
            case "DECLINED":
                statusText = "Recusado"
                statusStyle = [styles.statusText, styles.recusedStatus]
                break
            case "ACCEPTED":
                statusText = "Aceito"
                statusStyle = [styles.statusText, styles.acceptedStatus]
                break
            default:
                statusText = status
                statusStyle = styles.statusText
                break
        }
        return (
            <View>
                <Text style={statusStyle}>
                    {statusText}
                    {status === "ACCEPTED" && acceptedAt ? ` em: ${new Date(acceptedAt).toLocaleString()}` : ""}
                </Text>
                {actionButtons}
            </View>
        )
    }

    return (
        <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
            <View style={styles.navBar}>
                <UserButtonBack Page="Home" style={styles.buttonNav} />
                <Text style={styles.navText}>Notificações</Text>
            </View>

            <ScrollView
                style={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : invites.length === 0 ? (
                    <Text style={styles.noInvitesText}>Não há convites pendentes.</Text>
                ) : (
                    invites.map((invite, index) => {
                        const userName =
                            invite.user && invite.user.name
                                ? invite.user.name
                                : invite.userEmail || "Desconhecido"

                        const companyName =
                            invite.company && invite.company.name
                                ? invite.company.name
                                : "Empresa " + invite.companyId

                        return (
                            <View key={index} style={styles.inviteCard}>
                                <View style={styles.inviteHeader}>
                                    <FontAwesome name="envelope" size={24} style={styles.icon} />
                                    <Text style={styles.inviteTitle}>Solicitação de Entrada</Text>
                                </View>

                                <View style={styles.inviteDetails}>
                                    <Text style={styles.inviteText}>
                                        <Text style={styles.label}>Nome:</Text> {userName}
                                    </Text>
                                    <Text style={styles.inviteText}>
                                        <Text style={styles.label}>Email:</Text> {invite.userEmail}
                                    </Text>
                                </View>

                                <Text style={styles.inviteMessage}>
                                    Deseja aceitá-lo em sua empresa?
                                </Text>

                                <View style={styles.statusContainer}>
                                    {renderStatus(invite.status, invite.acceptedAt, invite.id)}
                                </View>
                            </View>
                        )
                    })
                )}
            </ScrollView>
        </SafeArea>
    )
}

export default InvitesScreen