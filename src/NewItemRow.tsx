import React from "react"
import { AddItemFunc } from "./ShoppingListContext"
import { ListItem, Item, Input, Icon, View } from "native-base"

interface Props {
  addItem: AddItemFunc
}
interface State {
  newItemName: string
}
const DEFAULT_STATE = { newItemName: "" }

export default class NewItemRow extends React.PureComponent<Props, State> {
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
