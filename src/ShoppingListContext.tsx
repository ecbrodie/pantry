import React from "react"
import { Toast } from "native-base"
import { AsyncStorage } from "react-native"

const CACHE_KEY = "SHOPPING_LIST_CACHE"

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

  getCacheData = async () => {
    const itemsJson = (await AsyncStorage.getItem(CACHE_KEY)) || "[]"
    return JSON.parse(itemsJson) as ShoppingListItem[]
  }

  setCacheDate = async (items: ShoppingListItem[]) => {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(items))
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
        }}
      >
        {this.props.children}
      </ShoppingListContext.Provider>
    )
  }
}
