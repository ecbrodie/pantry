import React from "react"
import { Text, List, ListItem } from "native-base"
import { ShoppingListItem, AddItemFunc } from "./ShoppingListContext"
import { NewItemRow } from "./NewItemRow"

type Props = {
  items: ShoppingListItem[]
  showNewItemRow: boolean
  addItem: AddItemFunc
}
export default function ShoppingList({
  addItem,
  items = [],
  showNewItemRow = false,
}: Props) {
  if (items.length === 0 && !showNewItemRow) return <Text>No Items</Text>

  return (
    <List>
      {items.map(({ name }) => (
        <ListItem key={name}>
          <Text>{name}</Text>
        </ListItem>
      ))}
      {showNewItemRow && <NewItemRow addItem={addItem} />}
    </List>
  )
}
