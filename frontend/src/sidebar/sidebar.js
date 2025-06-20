import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "../screens/home/home";
import User from "../screens/user/user";
import { COLORS } from "../constants/tema";
import { styles } from "./sidebar.style";
import icons from "../constants/icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image source={icons.logo} style={styles.iconHeader} />
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Icon
                name="arrow-right"
                size={25}
                color={COLORS.marrom}
                style={styles.closeButton}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.menu}>
            <View style={styles.divider} />

            <TouchableOpacity onPress={() => props.navigation.navigate("home")}>
              <View style={styles.menuItem}>
                <Icon
                  name="home"
                  size={25}
                  color={COLORS.cinzaEscuro}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>HOME</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Navegar para os Produto")}
            >
              <View style={styles.menuItem}>
                <Icon
                  name="search"
                  size={25}
                  color={COLORS.cinzaEscuro}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Pesquisa de Produtos</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              onPress={() => props.navigation.navigate("estantes")}
            >
              <View style={styles.menuItem}>
                <Image source={icons.caixas} style={styles.menuIcon} />
                <Text style={styles.menuText}>Consultar Estoque</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate("reportarIrregularidade")}
            >
              <View style={styles.menuItem}>
                <MaterialIcons
                  name="report"
                  size={25}
                  color={COLORS.marrom}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Reportar Irregularidades</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} /> */}

            <TouchableOpacity
              onPress={() => props.navigation.navigate("historicoMov")}
            >
              <View style={styles.menuItem}>
                <Icon2
                  name="clock"
                  size={25}
                  color={COLORS.marrom}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>Histórico</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("configuracao")}
          >
            <View style={styles.menuItem}>
              <Icon
                name="cog"
                size={25}
                color={COLORS.marrom}
                style={styles.menuIcon}
              />
              <Text style={styles.footerText}>Configurações</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: COLORS.marrom,
        },
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Image source={icons.logo} style={styles.logo} />
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerIconContainer}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => navigation.navigate("notifications")}
            >
              <MaterialIcons
                name="notifications"
                size={30}
                color={COLORS.branco}
                style={styles.notIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => navigation.navigate("user")}
            >
              <Ionicons
                name="person"
                size={30}
                color={COLORS.branco}
                style={styles.userIcon}
              />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.menuButton}
          >
            <Ionicons
              name="menu"
              size={30}
              color={COLORS.branco}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        ),
        drawerStyle: {
          borderRightWidth: 2,
          borderColor: COLORS.marrom,
        },
      })}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}