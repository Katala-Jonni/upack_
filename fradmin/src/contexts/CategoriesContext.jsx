"use client";

import { createContext, useMemo, useReducer } from "react";
// =================================================================================

// =================================================================================
const INITIAL_CATEGORIES = [];
const INITIAL_STATE = {
  categories: INITIAL_CATEGORIES,
  allCategories: []
}; // ==============================================================


// ==============================================================
export const CategoriesContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CATEGORIES_AMOUNT":
      let categories = action.payload.categories.filter(item => item.parent === '00000000-0000-0000-0000-000000000000');

      return { ...state,
        categories: [...categories],
        allCategories: [...action.payload.categories]
      };

    case "REMOVE_CATEGORIES_AMOUNT":
      return {
        ...state,
        categories: [],
        allCategories: []
      };

    default:
    {
      return state;
    }
  }
};

export default function CategoriesProvider({
                                       children
                                     }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);
  return <CategoriesContext.Provider value={contextValue}>{children}</CategoriesContext.Provider>;
}
