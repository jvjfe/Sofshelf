import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./informacaoDaConta.style";
import SafeArea from "../../../components/safeArea/safeArea";
import UserButtonBack from "../../../components/userButtonBack/userButtonBack";
import { getUserData, setUserData } from "../../../services/storageService";
import Icon from "@expo/vector-icons/MaterialIcons";
import UserService from "../../../services/servicesBackend/UserServices";
import ConfirmSenhaModal from "../../../components/confirmSenhaModal/confirmSenhaModal";

function InformacaoDaConta() {
  const [user, setUser] = useState({ name: "", email: "", role: "", id: "", companyId: "" });
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [editError, setEditError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getUserData().then((userData) => {
      if (userData) setUser(userData);
    });
  }, []);

  useEffect(() => {
    setEditName(user.name);
    setEditEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (user.role === "admin" || user.role === "adm") {
      setLoadingEmployees(true);
      setError("");
      UserService.getUsersByCompany(user.companyId, "employee")
        .then((res) => setEmployees(res))
        .catch((err) => {
          setEmployees([]);
          let message = "Erro ao carregar funcionários.";
          if (err?.response?.data?.message || err?.response?.data?.error) {
            message = err.response.data.message || err.response.data.error;
          }
          setError(message);
        })
        .finally(() => setLoadingEmployees(false));
    }
  }, [user]);

  const handleFunction = (role) => {
    if (role === "emploee" || role === "employee") return "FUNCIONÁRIO";
    if (role === "admin" || role === "adm") return "ADMINISTRADOR";
    return "DESCONHECIDO";
  };

  const handleChangePassword = () => {
    Alert.alert("Alterar senha", "Funcionalidade em breve! 😉");
  };

  const badgeColor =
    user.role === "admin" || user.role === "adm"
      ? "#9c7950"
      : user.role === "emploee" || user.role === "employee"
        ? "#3d7a4f"
        : "#888";

  // --- Edição ---
  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMsg("");
    setEditError("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditError("");
    setSuccessMsg("");
  };

  const handleSaveEdit = () => {
    setShowPwdModal(true);
    setEditError("");
  };

  // Função chamada pelo ConfirmSenhaModal
  async function handleConfirmSenhaEdicao(senhaDigitada) {
    try {
      const resp = await UserService.updateUser(user.id, {
        name: editName,
        email: editEmail,
        senhaAtual: senhaDigitada,
      });
      setUser(resp); // Atualiza tela
      await setUserData(resp); // Atualiza storage
      setSuccessMsg("Dados atualizados com sucesso!");
      setIsEditing(false);
      setShowPwdModal(false);
    } catch (error) {
      let msg = "Erro ao atualizar dados.";
      if (error?.response?.data?.error) msg = error.response.data.error;
      setEditError(msg);
      setShowPwdModal(false);
    }
  }

  return (
    <SafeArea barStyle="dark-content" backgroundColor="#FFFFFF">
      <ScrollView>
        <View style={styles.container}>
          <UserButtonBack Page="User" />

          <Text style={styles.topTitle}>Informações da conta/empresa</Text>

          <View style={styles.headerCard}>
            <Text style={styles.emoji}>👋</Text>
            <Text style={styles.greeting}>Bem-vindo, {user.name || "Usuário"}!</Text>
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text style={styles.badgeText}>{handleFunction(user.role)}</Text>
            </View>
          </View>

          <View style={styles.boxInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nome:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputEdit}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Nome"
                />
              ) : (
                <Text style={styles.value}>{user.name}</Text>
              )}
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputEdit}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.value}>{user.email}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.changePwdBtn} onPress={handleChangePassword}>
              <Icon name="lock" size={18} color="#fff" />
              <Text style={styles.changePwdBtnText}>Alterar senha</Text>
            </TouchableOpacity>
            {isEditing ? (
              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit}>
                  <Text style={styles.saveBtnText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelEdit}>
                  <Text style={styles.cancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                <Icon name="edit" size={18} color="#60492C" />
                <Text style={styles.editBtnText}>Editar</Text>
              </TouchableOpacity>
            )}
            {editError ? (
              <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>{editError}</Text>
            ) : null}
            {successMsg ? (
              <Text style={{ color: "green", textAlign: "center", marginTop: 8 }}>{successMsg}</Text>
            ) : null}
          </View>



          {(user.role === "admin" || user.role === "adm") && (
            <View style={styles.employeesBlock}>
              <Text style={styles.employeesTitle}>Funcionários da empresa:</Text>
              {loadingEmployees ? (
                <ActivityIndicator size="small" color="#60492C" style={{ marginTop: 16 }} />
              ) : error ? (
                <Text style={{ color: "red", textAlign: "center", marginVertical: 8 }}>{error}</Text>
              ) : employees.length === 0 ? (
                <Text style={styles.employeesEmpty}>Nenhum funcionário cadastrado.</Text>
              ) : (
                employees.map((emp) => (
                  <View key={emp.id} style={styles.employeeCard}>
                    <Icon name="person" size={24} color="#60492C" style={{ marginRight: 10 }} />
                    <View>
                      <Text style={styles.employeeName}>{emp.name}</Text>
                      <Text style={styles.employeeEmail}>{emp.email}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          <View style={styles.tipsCard}>
            <Icon name="info" size={22} color="#4771b3" style={{ marginRight: 6 }} />
            <Text style={styles.tipsText}>
              Dica de segurança: nunca compartilhe sua senha com ninguém e altere-a periodicamente!
            </Text>
          </View>
        </View>
      </ScrollView>

      <ConfirmSenhaModal
        visible={showPwdModal}
        onConfirm={handleConfirmSenhaEdicao}
        onCancel={() => setShowPwdModal(false)}
        error={editError}
      />

    </SafeArea>

  );
}

export default InformacaoDaConta;