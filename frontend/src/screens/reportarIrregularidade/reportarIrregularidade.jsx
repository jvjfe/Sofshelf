import { View, Text, ScrollView, TextInput, Alert, TouchableOpacity, } from "react-native";
import React, { useState } from "react";
import SafeArea from "../../components/safeArea/safeArea";
import style from "./reportarIrregularidade.style";
import Topic from "../../components/avaliar/topicos/topic";
import BoxLine from "../../components/boxLine-feedback/boxLine";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, COLORS_TINTA } from "../../constants/tema";
import BtnIntro from "../../components/btnIntroduction/btn";
import UserButtonBack from "../../components/userButtonBack/userButtonBack";
import Calendario from "../../components/calendario/calendario";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Camera from "../../components/camera/camera";

function ReportarIrregularidade() {
  const [text, setText] = useState("");
const [selectedDate, setSelectedDate] = useState("");

  const onDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString("pt-BR"));
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const openCan = () => {
    setIsCameraOpen(true); 
  };
  const closeCan = () => {
    setIsCameraOpen(false); 
  };

  return (
    <SafeArea barStyle="light-content" backgroundColor={COLORS.marrom}>
      {isCameraOpen ? (
        <Camera onClose={closeCan} />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={true} style={style.scroll}>
          <UserButtonBack Page="home" text="Reportar Irregularidades" />
          <View style={style.container}>
            <View style={style.top}>
              <MaterialIcons
                name="report-problem"
                size={64}
                color={COLORS_TINTA.vermelho}
              />
              <Text style={style.title}>Reporte Irregularidades</Text>
              <Text style={style.subTitle}>
                Relate qualquer problema que você identificar
              </Text>
            </View>

            <BoxLine text="Selecione a Categoria do Problema" />
            <Topic
              Topicos={[
                "Produto Danificado",
                "Produto Fora do Lugar",
                "Discrepância no Inventário",
                "Outros",
              ]}
            />

            <BoxLine text="Descrição do Problema" />
            <View style={style.menssage}>
              <TextInput
                style={style.input}
                placeholder="Descreva sua mensagem"
                value={text}
                onChangeText={setText}
                placeholderTextColor="#60492C"
                multiline={true}
              />
            </View>

            <BoxLine text="SELECIONE A DATA DO REPORTE" />
            <Calendario onDateChange={onDateChange} />
            <BoxLine text="INDIQUE QUAL A ESTANTE E CORREDOR" />
            <Text style={[style.subTitle, { width: "95%" }]}>
              Escaneie o QR Code do produto/local ou preencha manualmente
            </Text>

            <BoxLine text="ANEXAR EVIDÊNCIAS" />
            <Text style={style.subTitle}>
              Tire uma foto ou anexe até 3 imagens para documentar a
              irregularidade
            </Text>
            <View style={{ flexDirection: "row", gap: 50 }}>
              <TouchableOpacity style={style.buttonCam} onPress={openCan}>
                <FontAwesome name="camera" style={style.camGa} />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.buttonCam}
                onPress={() => alert("Aqui vem a função openGalery")}
              >
                <FontAwesome name="photo" style={style.camGa} />
              </TouchableOpacity>
            </View>
          </View>

          <BtnIntro
            TextBtn="ENVIAR"
            TextColor={COLORS.branco}
            btnColor={COLORS.marrom}
          />
        </ScrollView>
      )}
    </SafeArea>
  );
}

export default ReportarIrregularidade;
