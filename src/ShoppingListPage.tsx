import React from "react"
import { Fab, Icon, Container, Body, Content, Title, Header } from "native-base"
import faker from "faker"
import { Consumer, ShoppingListItem, AddItemFunc } from "./ShoppingListContext"
import ShoppingList from "./ShoppingList"

const createItem: () => ShoppingListItem = () => {
  // For now, just fake product names
  // Obviously, this will be replaced with an actual form
  return {
    name: faker.commerce.product(),
    quantity: 1,
  }
}

export default class ShoppingListPage extends React.Component {
  state = { addingItem: false }

  handleFab = (addItem: AddItemFunc) => {
    return () => {
      this.setState({ addingItem: !this.state.addingItem })
      // addItem(createItem())
    }
  }

  render() {
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
              <Content>
                <ShoppingList
                  items={items}
                  showNewItemRow={this.state.addingItem}
                />
              </Content>
              <Fab onPress={this.handleFab(addItem)}>
                <Icon name="md-add-circle" />
              </Fab>
            </Container>
          )
        }}
      </Consumer>
    )
  }
}
