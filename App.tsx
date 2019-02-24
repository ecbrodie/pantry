import React from "react"
import { Container, Content, Header, Body, Title } from "native-base"
import ShoppingList from "./src/ShoppingList"

export default function App() {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Pantry</Title>
        </Body>
      </Header>
      <Content>
        <ShoppingList />
      </Content>
    </Container>
  )
}
