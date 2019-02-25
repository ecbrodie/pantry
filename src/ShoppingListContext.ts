import React from "react"

interface ShoppingListItem {
  name: string
  quantity: number
}

const currentItems: ShoppingListItem[] = []
const ShoppingListContext = React.createContext({
  items: currentItems,
  addItem: (item: ShoppingListItem) => {
    console.log("Adding an item")
    currentItems.push(item)
  },
})

export default ShoppingListContext
