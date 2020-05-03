import React, { useState } from "react"
import {
  Fab,
  Icon,
  Container,
  Body,
  Title,
  Header,
  Right,
  Text,
  Button,
} from "native-base"
import { Consumer } from "./ShoppingListContext"
import ShoppingList from "./ShoppingList"

const defaultIconBlue = "#5065F6"

export default function ShoppingListPage() {
  const [addingItem, setAddingItem] = useState(false)
  const fabIconName = addingItem ? "md-checkmark-circle" : "md-add-circle"
  const fabIconColor = addingItem ? "green" : defaultIconBlue

  return (
    <Consumer>
      {({ items, addItem, removeItem, removeAllItems }) => {
        return (
          <Container>
            <Header>
              <Body>
                <Title>Shopping List</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  disabled={items.length === 0}
                  onPress={removeAllItems}
                >
                  <Text>Clear All</Text>
                </Button>
              </Right>
            </Header>
            <ShoppingList
              addItem={addItem}
              items={items}
              removeItem={removeItem}
              showNewItemRow={addingItem}
            />
            <Fab
              onPress={() => setAddingItem(!addingItem)}
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
