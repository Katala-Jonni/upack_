import {
  endEditProfile,
  endLoadProfile,
  endProfile
} from './actions';

const initialState = {
  account: null
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadProfile.toString():
      return {
        ...state,
        account: payload
      };
    case endEditProfile.toString():
      const account = {
        ...state.account,
        ...payload
      };
      return {
        ...state,
        account
      };
    case endProfile.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default profileReducer;
