import React from "react"
import { ListItem, Text, View, Icon } from "native-base"

interface Props {
  name: string
}

export default function ItemRow({ name }: Props) {
  return (
    <ListItem>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text>{name}</Text>
        </View>
        <View style={{ flex: 0 }}>
          <Icon
            name="md-close-circle-outline"
            onPress={() => console.log("PRESSED")}
            style={{ color: "dimgrey" }}
          />
        </View>
      </View>
    </ListItem>
  )
}
