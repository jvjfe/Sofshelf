import React, { useState, useRef } from "react"
import { TextInput, View, TouchableOpacity, Text, ScrollView, Pressable, Keyboard } from "react-native"
import styles, { pickerStyles } from "./search.style.js"
import { COLORS } from "../../../constants/tema.js"
import AntDesign from "@expo/vector-icons/AntDesign"

function Search(props) {
  const [boxVisible, setBoxVisible] = useState(false)
  const [filtroSelected, setFiltroSelected] = useState([])
  const [focused, setFocused] = useState(false)
  const filters = ["Corredor", "Estantes", "Produtos", "Item"]

  const handlePressOutside = () => {
    setFocused(false)
    Keyboard.dismiss()
  }

  const onClickFilter = () => setBoxVisible(!boxVisible)

  const onSelectedItem = filtroSelecionado => {
    if (filtroSelected.includes(filtroSelecionado))
      setFiltroSelected(filtroSelected.filter(i => i !== filtroSelecionado))
    else setFiltroSelected([...filtroSelected, filtroSelecionado])
  }

  const handleFocus = () => setFocused(true)

  const handleBlur = () => {
    setTimeout(() => {
      if (!focused) setFocused(false)
    }, 100)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filtro} onPress={onClickFilter}>
        <AntDesign name="filter" size={24} color={COLORS.marrom} style={styles.filter} />
        <AntDesign name="down" size={24} color={COLORS.marrom} style={styles.seta} />
      </TouchableOpacity>
      <View style={{ flex: 1, position: "relative" }}>
        <View style={styles.pesquisa}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            placeholderTextColor={COLORS.marrom}
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={props.inputRef}
          />
          <AntDesign name="search1" style={styles.lupa} />
        </View>
        {focused && props.produtos && props.produtos.length > 0 && (
          <>
            <Pressable
              style={pickerStyles.overlay}
              onPress={handlePressOutside}
            />
            <View style={pickerStyles.dropdown}>
              <ScrollView
                style={{ maxHeight: 180 }}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {props.produtos.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={pickerStyles.item}
                    onPress={() => {
                      props.onSelectProduct(item)
                      setFocused(false)
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={pickerStyles.itemText}>{item.name}</Text>
                    <Text style={pickerStyles.descText} numberOfLines={1}>{item.description}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
      {boxVisible && (
        <View style={styles.boxFilter}>
          {filters.map((filter, index) => (
            <TouchableOpacity key={index} style={styles.btnCheck} onPress={() => onSelectedItem(filter)}>
              <AntDesign
                name={filtroSelected.includes(filter) ? "checkcircle" : "checkcircleo"}
                size={24}
                color={COLORS.marrom}
              />
              <Text style={styles.boxText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

export default Search