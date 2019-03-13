import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Font } from "expo"
import ShoppingListPage from "./src/ShoppingListPage"
import { Provider } from "./src/ShoppingListContext"
import { Root } from "native-base"

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    // Workaround for case-sensitivity issues
    // Expo sets as lowercase, but native-base expects PascalCase
    await Font.loadAsync({
      Ionicons: Ionicons.font.ionicons,
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    if (!this.state.fontLoaded) {
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
}
