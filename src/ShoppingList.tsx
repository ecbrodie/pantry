import React from "react"
import { FlatList } from "react-native"
import { Text } from "native-base"
import uuidv4 from "uuid/v4"
import {
  AddItemFunc,
  RemoveItemFunc,
} from "./ShoppingListContext"
import { ShoppingListItem } from "./types"
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

  const keyedItems = items.map(item => ({ ...item, key: item.name }))
  const itemsToRender = showNewItemRow
    ? [...keyedItems, { key: EXTRA_ROW_KEY }]
    : keyedItems

  return (
    <FlatList
      data={itemsToRender}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled
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
