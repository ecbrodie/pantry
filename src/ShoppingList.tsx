import React from "react"
import {
  Fab,
  Icon,
  Container,
  Body,
  Content,
  Title,
  Header,
  Text,
} from "native-base"
import { Consumer } from "./ShoppingListContext"

const fabHandler = addItem => () => {
  addItem({})
}

export default function ShoppingList() {
  return (
    <Consumer>
      {({ items, addItem }) => {
        console.log("TCL: ShoppingList -> items", items)
        return (
          <Container>
            <Header>
              <Body>
                <Title>Shopping List</Title>
              </Body>
            </Header>
            <Content>
              {items.length === 0 ? (
                <Text>No Items</Text>
              ) : (
                <Text>Has Items</Text>
              )}
            </Content>
            <Fab onPress={fabHandler(addItem)}>
              <Icon name="md-add-circle" />
            </Fab>
          </Container>
        )
      }}
    </Consumer>
  )
}
