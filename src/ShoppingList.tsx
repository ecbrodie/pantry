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
  View,
} from "native-base"
import ShoppingListContext from "./ShoppingListContext"

const fabHandler = addItem => () => {
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
          <Content>
            {items.length === 0 ? (
              <Text>No Items</Text>
            ) : (
              <Text>Has Items</Text>
            )}
          </Content>
          <View style={{ flex: 1 }}>
            <Fab onPress={fabHandler(addItem)}>
              <Icon name="md-add-circle" />
            </Fab>
          </View>
        </Container>
      )}
    </ShoppingListContext.Consumer>
  )
}
