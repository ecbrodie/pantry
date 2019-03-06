import React from "react"

export interface ShoppingListItem {
  name: string
  quantity?: number
}

export type AddItemFunc = (item: ShoppingListItem) => void

type ShoppingListContextStore = {
  items: ShoppingListItem[]
  addItem: AddItemFunc
}

const ShoppingListContext = React.createContext({} as ShoppingListContextStore)
export const Consumer = ShoppingListContext.Consumer

type State = {
  items: ShoppingListItem[]
}

export class Provider extends React.Component<{}, State> {
  state = {
    items: [],
  }

  addItem = (item: ShoppingListItem) => {
    this.setState(({ items }) => ({ items: [...items, item] }))
  }

  render() {
    return (
      <ShoppingListContext.Provider
        value={{
          items: this.state.items,
          addItem: this.addItem,
        }}
      >
        {this.props.children}
      </ShoppingListContext.Provider>
    )
  }
}
