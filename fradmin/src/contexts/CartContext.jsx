"use client";

import { createContext, useMemo, useReducer } from "react";
import { deleteStorage, loadStorage, saveStorage, storageKey } from '../storage'; // =================================================================================

// =================================================================================
// const INITIAL_CART = [{
//   qty: 1,
//   price: 210,
//   slug: "silver-high-neck-sweater",
//   name: "Silver High Neck Sweater",
//   id: "6e8f151b-277b-4465-97b6-547f6a72e5c9",
//   imgUrl: "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
// }, {
//   qty: 1,
//   price: 110,
//   slug: "yellow-casual-sweater",
//   name: "Yellow Casual Sweater",
//   id: "76d14d65-21d0-4b41-8ee1-eef4c2232793",
//   imgUrl: "/assets/images/products/Fashion/Clothes/21.YellowCasualSweater.png"
// }, {
//   qty: 1,
//   price: 140,
//   slug: "denim-blue-jeans",
//   name: "Denim Blue Jeans",
//   id: "0fffb188-98d8-47f7-8189-254f06cad488",
//   imgUrl: "/assets/images/products/Fashion/Clothes/4.DenimBlueJeans.png"
// }];
// const INITIAL_STATE = {
//   cart: INITIAL_CART
// }; // ==============================================================
const INITIAL_CART = [];
const INITIAL_STATE = {
  cart: loadStorage(storageKey) && loadStorage(storageKey).length ? JSON.parse(loadStorage(storageKey)) : INITIAL_CART
}; // ==============================================================


// ==============================================================
export const CartContext = createContext({});

const reducer = (state, action) => {
  console.log('CartContextCreateContextState', state);
  console.log('CartContextCreateContextAction', action);
  console.log('loadStorage(storageKey)', JSON.parse(loadStorage(storageKey)));
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find(item => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter(item => item.id !== cartItem.id);
        saveStorage(storageKey, filteredCart);
        return { ...state,
          cart: filteredCart
        };
      } // IF PRODUCT ALREADY EXITS IN CART


      if (exist) {
        const newCart = cartList.map(item => item.id === cartItem.id ? { ...item,
          qty: cartItem.qty
        } : item);
        saveStorage(storageKey, newCart);
        return { ...state,
          cart: newCart
        };
      }
      saveStorage(storageKey, [...cartList, cartItem]);
      return { ...state,
        cart: [...cartList, cartItem]
      };

    case "REMOVE_CART_AMOUNT":
      saveStorage(storageKey, []);
      return {
        ...state,
        cart: []
      };

    default:
      {
        return state;
      }
  }
};

export default function CartProvider({
  children
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
