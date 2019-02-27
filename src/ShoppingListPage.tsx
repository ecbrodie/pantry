import React from "react"
import { Fab, Icon, Container, Body, Content, Title, Header } from "native-base"
import faker from "faker"
import { Consumer, ShoppingListItem, AddItemFunc } from "./ShoppingListContext"
import ShoppingList from "./ShoppingList"

const handleFab = (addItem: AddItemFunc) => () => {
  // For now, just fake product names
  // Obviously, this will be replaced with an actual form
  const item: ShoppingListItem = { name: faker.commerce.product(), quantity: 1 }
  addItem(item)
}

export default function ShoppingListPage() {
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
              <ShoppingList items={items} />
            </Content>
            <Fab onPress={handleFab(addItem)}>
              <Icon name="md-add-circle" />
            </Fab>
          </Container>
        )
      }}
    </Consumer>
  )
}
