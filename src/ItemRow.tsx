import React from "react"
import { ListItem, Text, View, Icon } from "native-base"
import { RemoveItemFunc } from "./ShoppingListContext"

interface Props {
  name: string
  removeItem: RemoveItemFunc
}

export default function ItemRow({ name, removeItem }: Props) {
  return (
    <ListItem>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text>{name}</Text>
        </View>
        <View style={{ flex: 0 }}>
          <Icon
            name="md-close-circle-outline"
            onPress={() => removeItem(name)}
            style={{ color: "dimgrey" }}
          />
        </View>
      </View>
    </ListItem>
  )
}
