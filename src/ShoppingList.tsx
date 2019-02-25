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
import ShoppingListContext from "./ShoppingListContext"

const fabHandler = addItem => () => {
  console.log("Clicked the FAB")
  addItem({})
}

export default function ShoppingList() {
  return (
    <ShoppingListContext.Consumer>
      {({ items, addItem }) => (
        <Container>
          <Header>
            <Body>
              <Title>Shopping List</Title>
            </Body>
          </Header>
          <Fab onPress={fabHandler(addItem)}>
            <Icon name="md-add-circle" />
          </Fab>
          <Content>
            {items.length === 0 ? (
              <Text>No Items</Text>
            ) : (
              <Text>Has Items</Text>
            )}
          </Content>
        </Container>
      )}
    </ShoppingListContext.Consumer>
  )
}
