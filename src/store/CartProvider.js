import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // This is immutable, it creates a new array instead of adding
    // to a previous array, as what .push() does
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemInCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItemInCart = state.items[existingItemInCartIndex];

    let updatedItems;

    if (existingItemInCart) {
      const updatedItem = {
        ...existingItemInCart,
        amount: existingItemInCart.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // Gets the index and over writes it with the new infp
      updatedItems[existingItemInCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemInCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItemInCart = state.items[existingItemInCartIndex];
    const updatedTotalAmount = state.totalAmount - existingItemInCart.price;

    let updatedItems;

    if (existingItemInCart.amount === 1) {
      updatedItems = state.items.filter((item) => !item.id === action.id);
    } else {
      const updatedItem = {
        ...existingItemInCart,
        amount: existingItemInCart.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemInCartIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
