import React from "react"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
import { Text } from "native-base"
import uuidv4 from "uuid/v4"
import {
  ShoppingListItem,
  AddItemFunc,
  RemoveItemFunc,
} from "./ShoppingListContext"
import NewItemRow from "./NewItemRow"
import ItemRow from "./ItemRow"

interface Props {
  addItem: AddItemFunc
  items: ShoppingListItem[]
  removeItem: RemoveItemFunc
  showNewItemRow: boolean
}

const EXTRA_ROW_KEY = uuidv4()

export default function ShoppingList({
  addItem,
  items = [],
  removeItem,
  showNewItemRow = false,
}: Props) {
  if (items.length === 0 && !showNewItemRow) return <Text>No Items</Text>

  const keyedItems = items.map(item => ({
    ...item,
    key: item.name,
  }))
  const itemsToRender = showNewItemRow
    ? [...keyedItems, { key: EXTRA_ROW_KEY }]
    : keyedItems

  // TODO: Need to set windowSoftInputMode = "adjustPan" in the android manifest XML
  // This cannot be done until this app ejects from Expo
  // Until then, a number row on a keyboard may hide the NewItemRow
  // SEE: https://github.com/APSL/react-native-keyboard-aware-scroll-view#android-support

  return (
    <KeyboardAwareFlatList
      data={itemsToRender}
      enableOnAndroid
      keyboardShouldPersistTaps="always"
      renderItem={({ item: { key } }) =>
        key === EXTRA_ROW_KEY ? (
          <NewItemRow addItem={addItem} />
        ) : (
          <ItemRow name={key} removeItem={removeItem} />
        )
      }
    />
  )
}
