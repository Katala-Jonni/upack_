import {
  endLoadProduct,
  endProduct, endCreateProduct, endEditProduct, endCurrentProduct
} from './actions';
import { status } from '../../utils/category';

const initialState = {
  items: null,
  count: 0,
  currentProduct: null
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

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadProduct.toString():
      return {
        ...state,
        items: getStatus([...payload.products]),
        count: payload.productsCount
      };
    case endCreateProduct.toString():
      return {
        ...state,
        items: getStatus([...payload.products]),
        count: payload.productsCount
      };
    case endEditProduct.toString():
      const currentProduct = state.items.findIndex(c => c._id === payload.product._id);
      const items = [...state.items];
      items[currentProduct] = payload.product;
      return {
        ...state,
        items,
        currentProduct: payload.product
      };
    case endCurrentProduct.toString():
      return {
        ...state,
        currentProduct: payload.product
      };
    case endProduct.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default productReducer;
