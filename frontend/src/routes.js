import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DrawerNavigator from "./sidebar/sidebar.js"

import Introduction from "./screens/introduction/introduction.jsx"
import Information from "./screens/information/information.jsx"
import Welcome from "./screens/welcome/welcome.jsx"
import Login from "./screens/login/login.jsx"
import EsqueciSenha from "./screens/login/esqueciSenha/esqueciSenha.jsx"
import Registro from "./screens/login/registro/registro.jsx"
import Solicitation from "./screens/login/solicitation/solicitation.jsx"
import ReportarIrregularidade from "./screens/reportarIrregularidade/reportarIrregularidade.jsx"

import User from "./screens/user/user.jsx"
import Notify from "./screens/invite/notify.jsx"
import InformacaoDaConta from "./screens/user/informacaoDaConta/informacaoDaConta.jsx"
import FeedbackSugestao from "./screens/user/feedbackSugestao/feedbackSugestao.jsx"
import Configuracao from "./screens/user/configuracao/configuracao.jsx"
import PoliticasPrivacidadeTermos from "./screens/user/politicasPrivacidadeTermos/politicasPrivacidadeTermos.jsx"

import Estantes from "./screens/consultaItem/estantes.jsx"
import Prateleira from "./screens/consultaItem/prateleira/prateleiras.jsx"
import Produto from "./screens/consultaItem/produtos/produtos.jsx"
import HistoricoMov from "./screens/historicoMov/historicoMov.jsx"
import Historico from "./screens/historicoMov/historico/historico.jsx"
import Item from "./screens/consultaItem/item/item.jsx"

const Stack = createNativeStackNavigator()

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="intro1">
        <Stack.Screen
          name="intro1"
          component={Introduction}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="intro2"
          component={Information}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="intro3"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="esqueciSenha"
          component={EsqueciSenha}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="solicitation"
          component={Solicitation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notifications"
          component={Notify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="reportarIrregularidade"
          component={ReportarIrregularidade}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="user"
          component={User}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="informacaoDaConta"
          component={InformacaoDaConta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="feeedbackSugestao"
          component={FeedbackSugestao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="configuracao"
          component={Configuracao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="termos"
          component={PoliticasPrivacidadeTermos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="estantes"
          component={Estantes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="prateleiras"
          component={Prateleira}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="produtos"
          component={Produto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="item"
          component={Item}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="historicoMov"
          component={HistoricoMov}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="historico"
          component={Historico}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
