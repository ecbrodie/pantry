import React, { useEffect, useState } from "react"
import { Toast } from "native-base"
import { Alert, AlertButton } from "react-native"
import { ShoppingListItem } from "./types"
import { setCacheData, getCacheData } from "./firebase"

export type AddItemFunc = (item: ShoppingListItem) => Promise<void>
export type RemoveItemFunc = (name: string) => void

interface ShoppingListContextStore {
  items: ShoppingListItem[]
  addItem: AddItemFunc
  removeItem: RemoveItemFunc
  removeAllItems: () => void
}

const ShoppingListContext = React.createContext({} as ShoppingListContextStore)
export const Consumer = ShoppingListContext.Consumer

export function Provider({ children }: { children: React.ReactElement }) {
  const [ready, setReady] = useState(false)
  const [items, setItems] = useState<ShoppingListItem[]>([])

  useEffect(() => {
    getCacheData().then(items => {
      setReady(true)
      setItems(items)
    })
  }, [])
  useEffect(() => {
    if (ready) {
      setCacheData(items)
    }
  }, [items])

  const addItem: AddItemFunc = item => {
    const alreadyHasItem = items.some(({ name }) => name === item.name)
    if (alreadyHasItem) {
      Toast.show({
        buttonStyle: { backgroundColor: "slategray" },
        buttonText: "Dismiss",
        duration: 2000,
        text: "Cannot add duplicate item",
        type: "warning",
      })
    } else {
      setItems([...items, item])
    }

    return new Promise((resolve, reject) =>
      alreadyHasItem ? reject() : resolve(),
    )
  }

  const removeItem: RemoveItemFunc = itemNameToRemove => {
    setItems(items.filter(({ name }) => name !== itemNameToRemove))
  }

  const removeAllItems = () => {
    const cancelButton: AlertButton = {
      text: "Cancel",
    }
    const okayButton: AlertButton = {
      text: "OK",
      onPress: () => setItems([]),
    }
    Alert.alert(
      "Clear all items?",
      "This can't be undone.",
      [cancelButton, okayButton],
      { cancelable: false },
    )
  }

  if (!ready) return null
  return (
    <ShoppingListContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        removeAllItems,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  )
}
