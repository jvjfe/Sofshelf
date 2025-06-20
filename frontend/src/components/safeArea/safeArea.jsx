import { SafeAreaView, StatusBar } from "react-native"
import React from "react"

function SafeArea(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: props.backgroundColor }}>
      <StatusBar
        barStyle={props.barStyle}
        backgroundColor={props.backgroundColor}
      />
      {props.children} 
    </SafeAreaView>
  )
}

export default SafeArea
