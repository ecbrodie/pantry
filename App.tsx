import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Font } from "expo"
import ShoppingList from "./src/ShoppingList"

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    // Workaround for case-sensitivity issues
    // Expo sets as lowercase, but native-base expects PascalCase
    await Font.loadAsync({
      Ionicons: Ionicons.font.ionicons,
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    if (!this.state.fontLoaded) {
      return null
    }
    return <ShoppingList />
  }
}
