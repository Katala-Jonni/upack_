import {
  endLoadCategory,
  endCategory, endCreateCategory, endEditCategory
} from './actions';
import { status } from '../../utils/category';

const initialState = {
  items: null,
  count: 0,
  options: null
};

const getStatus = arr => {
  return arr.map(c => {
    if (c.active) {
      c.active = status.active;
    } else {
      c.active = status.locked;
    }
    return c;
  });
};

const getCategoriesOption = arr => {
  return arr.map(c => {
    return {
      label: c.title,
      value: c._id
    };
  });
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadCategory.toString():
      return {
        ...state,
        items: getStatus([...payload.categories]),
        count: payload.categoriesCount,
        options: getCategoriesOption([...payload.categories])
      };
    case endCreateCategory.toString():
      return {
        ...state,
        items: getStatus([...payload.categories]),
        count: payload.categoriesCount,
        options: getCategoriesOption([...payload.categories])
      };
    case endEditCategory.toString():
      const currentCategory = state.items.findIndex(c => c._id === payload.category._id);
      const items = [...state.items];
      items[currentCategory] = payload.category;
      return {
        ...state,
        items,
        options: getCategoriesOption(items)
      };
    case endCategory.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default categoryReducer;
