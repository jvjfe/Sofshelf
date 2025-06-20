import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import SafeArea from "../../../components/safeArea/safeArea.jsx";
import { COLORS } from "../../../constants/tema.js";
import UserButtonBack from "../../../components/userButtonBack/userButtonBack.jsx";
import styles from "./historico.style.js";
import { useNavigation } from "@react-navigation/native";
import { filterHistoryService } from "../../../filters/filterHistoryService.js";
import { filterReativarService } from "../../../filters/filterReativarService.js";
import HistoryService from "../../../services/servicesBackend/HistoryService.js";

function Historico({ route }) {
    const { categoria } = route.params;
    const [historico, setHistorico] = useState([]);
    const [acaoAtiva, setAcaoAtiva] = useState("create");
    const [loading, setLoading] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigation = useNavigation();

    const toggleItem = useCallback((id) => {
        setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const acoesMap = useMemo(() => ({
        create: "Ativo",
        update: "Atualizado",
        delete: "Desativado",
    }), []);

    const tabelasMap = useMemo(() => ({
        User: "Usuário",
        Product: "Produto",
        Shelf: "Prateleira",
        Rack: "Estante",
        Invite: "Convite",
        Company: "Empresa",
        History: "Histórico",
        Embalagem: "Embalagem",
        Color: "Cor",
        Brand: "Marca",
    }), []);

    const getStatusText = useCallback((status) => {
        return status === true || status === "true" ? "Ativo" : "Desativado";
    }, []);

    const getItemDetails = useCallback((item, table) => {
        const baseDetails = {
            name: item.name || "Sem nome",
            description: item.description || "Sem descrição",
            user: {
                name: item.user?.name || "Desconhecido",
                email: item.user?.email || "Sem email"
            },
            status: getStatusText(item.status),
            createdAt: item.createdAt || item.updatedAt || "Sem data"
        };

        switch (table) {
            case "Rack":
                return {
                    ...baseDetails,
                    location: item.location || "Sem localização"
                };
            case "Color":
                return {
                    ...baseDetails,
                    hexCode: item.hexCode || "Sem código de cor"
                };
            default:
                return baseDetails;
        }
    }, [getStatusText]);

    const carregarHistorico = useCallback(async (acao, resetar = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const { service, status } = filterHistoryService(categoria, acao);

            const data = (service === HistoryService && acao === "update")
                ? await service.getHistory(categoria, acao)
                : await service.getHistory(status);

            const historicoFormatado = (() => {
                if (acao === "delete" || acao === "create") {
                    const historicoData = Array.isArray(data) ? data : [data];
                    return historicoData.map((item) => ({
                        id: item.id,
                        action: item.action || acao,
                        table: categoria,
                        user: item.user || null,
                        createdAt: item.updatedAt || item.createdAt,
                        item: getItemDetails(item, categoria),
                        status: getStatusText(item.status)
                    }));
                } else if (acao === "update") {
                    const historicoData = Array.isArray(data.data) ? data.data : [data.data];

                    return historicoData.map((item) => {

                        const statusText = acoesMap[item.action] || "Atualizado";

                        return {
                            id: item.id,
                            action: item.action,
                            table: item.table,
                            user: item.user || null,
                            createdAt: item.createdAt,
                            item: {
                                ...(item.item || {}),
                                name: item.item?.name || "Sem nome",
                                description: item.item?.description || "Sem descrição",
                                location: item.item?.location || "Sem localização",
                                user: item.user || null,
                                status: statusText,
                            },
                            status: statusText
                        };
                    });
                } else {
                    return [];
                }
            })();

            setHistorico((prevHistorico) => {
                if (resetar) {
                    return historicoFormatado;
                }

                const novosDados = [...prevHistorico, ...historicoFormatado];
                const resultado = Array.from(new Set(novosDados.map((h) => h.id))).map((id) =>
                    novosDados.find((h) => h.id === id)
                );
                return resultado;
            });
        } catch (error) {
            console.error("Erro ao carregar histórico:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }, [loading, categoria, getItemDetails, getStatusText])

    const formatarFuncionarios = useCallback((data) => {
        return Array.isArray(data) ? data.map(funcionario => ({
            id: funcionario.id,
            name: funcionario.name || "Sem nome",
            email: funcionario.email || "Sem email",
            createdAt: funcionario.createdAt || "Sem data",
        })) : [];
    }, []);

    const carregarFuncionarios = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        try {
            const data = await HistoryService.getEmployees();
            setHistorico(formatarFuncionarios(data));
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }, [loading, formatarFuncionarios]);

    const renderFuncionarioItem = useCallback((item) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemText}>Funcionário</Text>
                <Text style={styles.itemDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Nome: </Text>
                <Text style={styles.value}>{item.name}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.value}>{item.email}</Text>
            </View>
        </View>
    ), []);

    const renderDetailRow = (label, value, isStatus = false) => (
        <View style={styles.detailRow}>
            <Text style={styles.label}>{label}: </Text>
            <Text style={[
                styles.value,
                isStatus && value === "Ativo" && styles.statusAtivo,
                isStatus && value === "Desativado" && styles.statusDesativado
            ]}>
                {value || "Sem informação"}
            </Text>
        </View>
    );

    const renderHistoricoItem = useCallback((item) => {
        const isExpanded = expandedItems[item.id] || false;
        const itemDetails = item.item || {};

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemText}>
                        {tabelasMap[item.table]}
                    </Text>
                    <TouchableOpacity
                        style={styles.expandButton}
                        onPress={() => toggleItem(item.id)}
                    >
                        <Text style={styles.expandButtonText}>
                            {isExpanded ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {renderDetailRow("Nome", itemDetails.name)}
                {renderDetailRow("Data", new Date(item.createdAt).toLocaleDateString())}

                {isExpanded && (
                    <>
                        {renderDetailRow("Feito por", itemDetails.user?.name)}
                        {renderDetailRow("Email", itemDetails.user?.email)}
                        {renderDetailRow("Descrição", itemDetails.description)}

                        {item.table === "Rack" && renderDetailRow("Localização", itemDetails.location)}
                        {item.table === "Color" && renderDetailRow("Código da Cor", itemDetails.hexCode)}
                        {renderDetailRow("Status", itemDetails.status, true)}

                        {itemDetails.status === "Desativado" && (
                            <TouchableOpacity
                                style={styles.reactivateButton}
                                onPress={() => handleReativar(item.id)}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color={COLORS.branco} />
                                ) : (
                                    <Text style={styles.reactivateButtonText}>Deseja reativar?</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        );
    }, [expandedItems, toggleItem, loading]);

    const handleReativar = useCallback(async (id) => {
        try {
            setLoading(true);
            const { service, method } = filterReativarService(categoria);
            await service[method](id, true);
            setSuccessMessage("Item reativado com sucesso!");
            carregarHistorico(acaoAtiva, true);
            setTimeout(() => setSuccessMessage(""), 2000);
        } catch (error) {
            console.error("Erro ao reativar item:", error);
            setSuccessMessage("Erro ao reativar item: " + (error.message || "Tente novamente."));
            setTimeout(() => setSuccessMessage(""), 2500);
        } finally {
            setLoading(false);
        }
    }, [categoria, acaoAtiva, carregarHistorico]);

    useEffect(() => {
        if (categoria === "User") {
            carregarFuncionarios();
        } else {
            carregarHistorico(acaoAtiva, true);
        }
    }, [acaoAtiva, categoria]);

    const handleAcaoPress = useCallback((acao) => {
        if (acaoAtiva === acao) return;
        setAcaoAtiva(acao);
        setHistorico([]);
    }, [acaoAtiva]);

    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const acoesBackend = useMemo(() => ["create", "update", "delete"], []);

    return (
        <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
            <View style={styles.navBar}>
                <UserButtonBack onPress={goBack} style={styles.buttonNav} />
                <Text style={styles.navText}>Histórico de Movimentação</Text>
            </View>

            <View style={styles.container}>
                {successMessage ? (
                    <View style={styles.successMessageBox}>
                        <Text style={styles.successMessageText}>{successMessage}</Text>
                    </View>
                ) : null}

                {categoria !== "User" && (
                    <View style={styles.buttonContainer}>
                        {acoesBackend.map((acao) => (
                            <TouchableOpacity
                                key={acao}
                                onPress={() => handleAcaoPress(acao)}
                                style={[styles.button, acaoAtiva === acao && styles.buttonActive]}
                            >
                                <Text style={styles.buttonText}>{acoesMap[acao]}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={styles.line}>
                    <Text style={styles.lineT}>{categoria === "User" ? "Funcionários" : "Histórico"}</Text>
                </View>

                <FlatList
                    data={historico}
                    keyExtractor={(item) => `historico-${item.id}`}
                    renderItem={({ item }) => (
                        categoria === "User" ? renderFuncionarioItem(item) : renderHistoricoItem(item)
                    )}
                    contentContainerStyle={styles.scroll}
                    ListEmptyComponent={
                        loading ? (
                            <ActivityIndicator size="large" color={COLORS.marrom} />
                        ) : (
                            <Text style={styles.itemLoading}>Nenhum dado disponível</Text>
                        )
                    }
                />
            </View>
        </SafeArea>
    );
}

export default Historico;