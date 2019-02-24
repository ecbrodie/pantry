import React from "react"
import { Fab, Icon, Container, Body, Content, Title, Header } from "native-base"

export default function ShoppingList() {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Shopping List</Title>
        </Body>
      </Header>
      <Fab>
        <Icon name="md-add-circle" />
      </Fab>
      <Content />
    </Container>
  )
}
