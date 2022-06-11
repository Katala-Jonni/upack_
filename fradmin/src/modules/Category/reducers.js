import {
  endLoadCategory,
  endCategory
} from './actions';

const initialState = {
  items: null,
};

const categoryReducer = (state = initialState, action) => {
  const { type } = action;
  switch(type) {
    case endLoadCategory.toString():
      return {
        ...state,
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
