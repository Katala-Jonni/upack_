import {
  endLoadStage,
  endStage
} from './actions';

const initialState = {
  items: null,
  tabs: []
  // currentStage: null
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadStage.toString():
      return {
        ...state,
        items: payload.stages,
        tabs: payload.tabs
      };
    case endStage.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default productReducer;
