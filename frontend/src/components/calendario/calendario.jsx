import React, { useState } from "react"
import { View, Pressable, TextInput } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Feather } from "@expo/vector-icons"
import style from "./calendario.style"

const Calendario = ({
  onDateChange,
  placeholder = "DD/MM/YYYY",
  textColor = "#60492C",
  iconColor = "#60492C",
}) => {
  const [showPicker, setShowPicker] = useState(false)
  const [date, setDate] = useState(new Date())

  const toggleDatepicker = () => {
    setShowPicker((prevState) => !prevState)
  }

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false)
    if (selectedDate) {
      setDate(selectedDate)
      onDateChange(selectedDate)
    }
  }

  return (
    <View style={style.container}>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={handleDateChange}
          style={style.calendario}
        />
      )}
      <Pressable style={style.btnCalender} onPress={toggleDatepicker}>
        <TextInput
          style={{ fontSize: 14, color: textColor }}
          placeholder={placeholder}
          value={date.toLocaleDateString("pt-BR")}
          editable={false}
        />
        <Feather name="calendar" size={28} color={iconColor} />
      </Pressable>
    </View>
  )
}

export default Calendario
