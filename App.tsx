import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import * as Font from "expo-font"
import ShoppingListPage from "./src/ShoppingListPage"
import { Provider } from "./src/ShoppingListContext"
import { Root } from "native-base"
import "./src/firebase"
import "./src/monkeyConsole"

export default function() {
  const [fontLoaded, setFontLoaded] = useState(false)
  useEffect(() => {
    const loadFonts = async () => {
      // Workaround for case-sensitivity issues
      // Expo sets as lowercase, but native-base expects PascalCase
      await Font.loadAsync({
        Ionicons: Ionicons.font.ionicons,
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      })
    }
    loadFonts()
    setFontLoaded(true)
  }, [])

  if (!fontLoaded) {
    return null
  }
  return (
    <Root>
      <Provider>
        <ShoppingListPage />
      </Provider>
    </Root>
  )
}
