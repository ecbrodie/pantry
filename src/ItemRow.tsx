import React from "react"
import { ListItem, Text } from "native-base"

interface Props {
  name: string
}
export default function ItemRow({ name }: Props) {
  return (
    <ListItem>
      <Text>{name}</Text>
    </ListItem>
  )
}
