import React from "react"
import { Toast } from "native-base"
import { Alert, AlertButton } from "react-native"
import { DB } from "./firebase"

const docRef = DB.collection("shoppingLists").doc("MAIN")

export interface ShoppingListItem {
  name: string
  quantity?: number
}

// TODO: Explore using a promise instead of a callback?
export type AddItemFunc = (
  item: ShoppingListItem,
  onSuccess: () => void,
) => void

export type RemoveItemFunc = (name: string) => void

interface ShoppingListContextStore {
  items: ShoppingListItem[]
  addItem: AddItemFunc
  removeItem: RemoveItemFunc
  removeAllItems: () => void
}

const ShoppingListContext = React.createContext({} as ShoppingListContextStore)
export const Consumer = ShoppingListContext.Consumer

interface State {
  items: ShoppingListItem[]
  ready: boolean
}

export class Provider extends React.Component<{}, State> {
  state = {
    items: [],
    ready: false,
  }

  addItem: AddItemFunc = (item, onSuccess) => {
    let alreadyHasItem: boolean

    this.setState(
      ({ items }) => {
        alreadyHasItem = items.some(({ name }) => name === item.name)
        return alreadyHasItem ? null : { items: [...items, item] }
      },
      () => {
        if (!alreadyHasItem) {
          onSuccess()
        } else {
          Toast.show({
            buttonStyle: { backgroundColor: "slategray" },
            buttonText: "Dismiss",
            duration: 2000,
            text: "Cannot add duplicate item",
            type: "warning",
          })
        }
      },
    )
  }

  removeItem: RemoveItemFunc = itemNameToRemove => {
    this.setState(({ items }) => {
      const filteredItems = items.filter(
        ({ name }) => name !== itemNameToRemove,
      )
      return { items: filteredItems }
    })
  }

  removeAllItems = () => {
    const cancelButton: AlertButton = {
      text: "Cancel",
    }
    const okayButton: AlertButton = {
      text: "OK",
      onPress: () => this.setState(() => ({ items: [] })),
    }
    Alert.alert(
      "Clear all items?",
      "This can't be undone.",
      [cancelButton, okayButton],
      { cancelable: false },
    )
  }

  getCacheData = async () => {
    const document = await docRef.get()
    return document.exists ? document.data()!.items : []
  }

  setCacheDate = async (items: ShoppingListItem[]) => {
    await docRef.set({ items })
  }

  componentDidMount() {
    this.getCacheData().then(items =>
      this.setState(() => ({
        items,
        ready: true,
      })),
    )
  }

  componentDidUpdate() {
    const { items } = this.state
    this.setCacheDate(items)
  }

  render() {
    const { items, ready } = this.state
    if (!ready) return null
    return (
      <ShoppingListContext.Provider
        value={{
          items,
          addItem: this.addItem,
          removeItem: this.removeItem,
          removeAllItems: this.removeAllItems,
        }}
      >
        {this.props.children}
      </ShoppingListContext.Provider>
    )
  }
}
