import React, { useState } from "react"
import { AddItemFunc } from "./ShoppingListContext"
import { ListItem, Item, Input, Icon, View } from "native-base"

interface Props {
  addItem: AddItemFunc
}
export default function NewItemRow({ addItem }: Props) {
  const [newItemName, setNewItemName] = useState("")
  const submitItem = () => {
    if (newItemName) {
      addItem({ name: newItemName }, () => setNewItemName(""))
    }
  }

  return (
    <ListItem>
      <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
        <View style={{ flex: 0, paddingLeft: 10 }}>
          <Icon
            name="ios-add-circle-outline"
            style={{ color: "green" }}
            onPress={submitItem}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Item regular>
            <Input
              autoFocus
              autoCapitalize="none"
              blurOnSubmit={false}
              placeholder="New Item"
              value={newItemName}
              onChangeText={setNewItemName}
              onSubmitEditing={submitItem}
            />
          </Item>
        </View>
      </View>
    </ListItem>
  )
}
