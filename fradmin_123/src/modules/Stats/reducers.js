import {
  endLoadStats,
  endStats
} from './actions';

const initialState = {
  current: null
};

const statsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadStats.toString():
      return {
        ...state,
        current: payload
      };
    case endStats.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default statsReducer;
