import React from "react"
import { ShoppingListItem } from "./ShoppingListContext"
import { Text, List, ListItem, Item, Input, Icon, View } from "native-base"

type Props = {
  items: ShoppingListItem[]
  showNewItemRow: boolean
}

export default function ShoppingList({
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
      {showNewItemRow && (
        <ListItem>
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <View style={{ flex: 0, paddingLeft: 10 }}>
              <Icon name="ios-add-circle-outline" style={{ color: "green" }} />
            </View>
            <View style={{ flex: 1 }}>
              <Item regular>
                <Input placeholder="New Item" />
              </Item>
            </View>
          </View>
        </ListItem>
      )}
    </List>
  )
}
