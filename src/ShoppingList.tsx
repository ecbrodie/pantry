import React from "react"
import { ShoppingListItem, AddItemFunc } from "./ShoppingListContext"
import { Text, List, ListItem, Item, Input, Icon, View } from "native-base"

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

type NewItemRowProps = {
  addItem: AddItemFunc
}
type NewItemRowState = {
  newItemName: string
}
const DEFAULT_STATE = { newItemName: "" }
class NewItemRow extends React.PureComponent<NewItemRowProps, NewItemRowState> {
  state = DEFAULT_STATE

  submitItem = () => {
    const { newItemName } = this.state

    if (newItemName) {
      this.props.addItem({ name: newItemName }, () =>
        this.setState(() => DEFAULT_STATE),
      )
    }
  }

  render() {
    return (
      <ListItem>
        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <View style={{ flex: 0, paddingLeft: 10 }}>
            <Icon
              name="ios-add-circle-outline"
              style={{ color: "green" }}
              onPress={this.submitItem}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Item regular>
              <Input
                autoFocus
                autoCapitalize="none"
                blurOnSubmit={false}
                placeholder="New Item"
                value={this.state.newItemName}
                onChangeText={value =>
                  this.setState(() => ({ newItemName: value }))
                }
                onSubmitEditing={this.submitItem}
              />
            </Item>
          </View>
        </View>
      </ListItem>
    )
  }
}
