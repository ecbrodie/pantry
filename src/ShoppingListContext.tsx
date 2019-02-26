import React from "react"

export type ShoppingListItem = {
  name: string
  quantity: number
}

type ShoppingListContextStore = {
  items: ShoppingListItem[]
  addItem: (item: ShoppingListItem) => void
}

const ShoppingListContext = React.createContext({} as ShoppingListContextStore)
export const Consumer = ShoppingListContext.Consumer

export class Provider extends React.Component {
  state = {
    items: [] as ShoppingListItem[],
  }

  addItem = (item: ShoppingListItem) => {
    this.setState({ items: [...this.state.items, item] })
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
