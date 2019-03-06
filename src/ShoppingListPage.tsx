import React from "react"
import { Fab, Icon, Container, Body, Content, Title, Header } from "native-base"
import { Consumer } from "./ShoppingListContext"
import ShoppingList from "./ShoppingList"

const defaultIconBlue = "#5065F6"

type State = { addingItem: boolean }

export default class ShoppingListPage extends React.Component<{}, State> {
  state = { addingItem: false }

  render() {
    const fabIconName = this.state.addingItem
      ? "md-checkmark-circle"
      : "md-add-circle"
    const fabIconColor = this.state.addingItem ? "lawngreen" : defaultIconBlue

    return (
      <Consumer>
        {({ items, addItem }) => {
          return (
            <Container>
              <Header>
                <Body>
                  <Title>Shopping List</Title>
                </Body>
              </Header>
              <Content padder>
                <ShoppingList
                  items={items}
                  showNewItemRow={this.state.addingItem}
                  addItem={addItem}
                />
              </Content>
              <Fab
                onPress={() =>
                  this.setState(({ addingItem }) => ({
                    addingItem: !addingItem,
                  }))
                }
                style={{ backgroundColor: fabIconColor }}
              >
                <Icon name={fabIconName} />
              </Fab>
            </Container>
          )
        }}
      </Consumer>
    )
  }
}
