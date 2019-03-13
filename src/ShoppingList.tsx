import React from "react"
import { FlatList } from "react-native"
import { Text, List, ListItem } from "native-base"
import uuidv4 from "uuid/v4"
import { ShoppingListItem, AddItemFunc } from "./ShoppingListContext"
import { NewItemRow } from "./NewItemRow"

type Props = {
  items: ShoppingListItem[]
  showNewItemRow: boolean
  addItem: AddItemFunc
}

const EXTRA_ROW_KEY = uuidv4()

export default function ShoppingList({
  addItem,
  items = [],
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
      renderItem={({ item: { key } }) =>
        key === EXTRA_ROW_KEY ? (
          <NewItemRow addItem={addItem} />
        ) : (
          <ListItem>
            <Text>{key}</Text>
          </ListItem>
        )
      }
    />
  )
}
