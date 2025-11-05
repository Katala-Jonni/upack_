import {
  clearCurrentOrder,
  endCurrentOrder,
  endLoadOrder,
  endOrder
} from './actions';

const initialState = {
  items: [],
  currentOrder: null
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadOrder.toString():
      return {
        ...state,
        items: payload.orders
      };
    case endCurrentOrder.toString():
      return {
        ...state,
        currentOrder: payload.order
      };
    case clearCurrentOrder.toString():
      return {
        ...state,
        currentOrder: null
      };
    case endOrder.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default productReducer;
