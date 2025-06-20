import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./userButtonBack.style";

function UserButtonBack(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.btnBack}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name="arrow-back-circle"
          style={props.style === true ? styles.iconLight : styles.icon}
          size={50}
        />
      </TouchableOpacity>

      <Text style={props.style === true ? styles.textLight : styles.text}>
        {props.text}
      </Text>
    </View>
  );
}

export default UserButtonBack;
