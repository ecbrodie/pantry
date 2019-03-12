import React from "react"

export interface ShoppingListItem {
  name: string
  quantity?: number
}

// TODO: Explore using a promise instead of a callback?
export type AddItemFunc = (
  item: ShoppingListItem,
  onSuccess: () => void,
) => void

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

  addItem: AddItemFunc = (item, onSuccess) => {
    let alreadyHasItem: boolean

    this.setState(
      state => {
        const { items } = state
        alreadyHasItem = items.some(({ name }) => name === item.name)
        return alreadyHasItem ? state : { items: [...items, item] }
      },
      () => {
        if (!alreadyHasItem) onSuccess()
      },
    )
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
