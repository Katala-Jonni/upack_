import {
  endLoadCampany,
  endCampany
} from './actions';

const initialState = {
  items: null,
};

const companyReducer = (state = initialState, action) => {
  const { type } = action;
  switch(type) {
    case endLoadCampany.toString():
      return {
        ...state,
      };
    case endCampany.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default companyReducer;
