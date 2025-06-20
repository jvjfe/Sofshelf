import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import SafeArea from "../../components/safeArea/safeArea.jsx";
import { COLORS } from "../../constants/tema.js";
import UserButtonBack from "../../components/userButtonBack/userButtonBack.jsx";
import { useNavigation } from "@react-navigation/native";
import { getUserData } from "../../services/storageService.js";
import styles from "./historicoMov.style.js";
import { FontAwesome5 } from "@expo/vector-icons";

function HistoricoMov() {
    const navigation = useNavigation();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = await getUserData();
            if (user) setRole(user.role);
        };
        fetchUserRole();
    }, []);

    const categorias = useMemo(() => [
        { key: "Rack", label: "Estantes", icon: "cubes" },
        { key: "Shelf", label: "Prateleiras", icon: "layer-group" },
        { key: "Product", label: "Produtos", icon: "box-open" },
        { key: "Embalagem", label: "Embalagem", icon: "clipboard-list" },
        { key: "Color", label: "Cores", icon: "palette" },
        { key: "Brand", label: "Marcas", icon: "trademark" }
    ], []);

    const goBack = useCallback(() => navigation.goBack(), [navigation]);

    const handleCategoriaPress = (categoria) => {
        navigation.navigate("historico", { categoria });
    };

    return (
        <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
            <View style={styles.navBar}>
                <UserButtonBack onPress={goBack} style={styles.buttonNav} />
                <Text style={styles.navText}>Histórico de Movimentação</Text>
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.line}>
                    <Text style={styles.lineT}>Escolha uma Categoria</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {categorias.map((item, index) => {
                        const isLastOdd = categorias.length === 1 || (categorias.length % 2 !== 0 && index === categorias.length - 1);
                        return (
                            <TouchableOpacity
                                key={item.key}
                                onPress={() => handleCategoriaPress(item.key)}
                                style={[styles.button, isLastOdd ? styles.buttonFull : styles.buttonHalf]}
                            >
                                <FontAwesome5 name={item.icon} size={18} color={COLORS.branco} />
                                <Text style={styles.buttonText}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {role === "admin" && (
                    <View style={styles.admContainer}>
                        <View style={styles.line}>
                            <Text style={styles.lineT}>Administrativo</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("historico", { categoria: "User" })}
                                style={[styles.button, styles.buttonFull]} 
                            >
                                <FontAwesome5 name="users-cog" size={18} color={COLORS.branco} />
                                <Text style={styles.buttonText}>Histórico de Funcionários</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeArea>
    );
}

export default HistoricoMov;
