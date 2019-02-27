import React from "react"
import { ShoppingListItem } from "./ShoppingListContext"
import { Text, List, ListItem } from "native-base"

type Props = {
  items: ShoppingListItem[]
}

export default function ShoppingList({ items = [] }: Props) {
  if (items.length === 0) return <Text>No Items</Text>

  return (
    <List>
      {items.map(({ name }) => (
        <ListItem key={name}>
          <Text>{name}</Text>
        </ListItem>
      ))}
    </List>
  )
}
