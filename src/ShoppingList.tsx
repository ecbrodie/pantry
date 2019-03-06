import React from "react"
import { ShoppingListItem, AddItemFunc } from "./ShoppingListContext"
import { Text, List, ListItem, Item, Input, Icon, View } from "native-base"

type Props = {
  items: ShoppingListItem[]
  showNewItemRow: boolean
  addItem: AddItemFunc
}
type State = {
  newItemName?: string
}

export default class ShoppingList extends React.Component<Props, State> {
  state = {
    newItemName: "",
  }

  submitItem = () => {
    const newItemName = this.state.newItemName
    this.setState({ newItemName: "" })

    if (newItemName) {
      this.props.addItem({ name: newItemName })
    }
  }

  render() {
    const { items = [], showNewItemRow = false } = this.props
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
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
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
                    value={this.state.newItemName}
                    placeholder="New Item"
                    onChangeText={value =>
                      this.setState({ newItemName: value })
                    }
                    onSubmitEditing={this.submitItem}
                  />
                </Item>
              </View>
            </View>
          </ListItem>
        )}
      </List>
    )
  }
}
