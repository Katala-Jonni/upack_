import {
  addFilterVisitors,
  endLoadVisitors,
  endVisitors, setCurrentCampany
} from './actions';

const initialState = {
  items: null,
  filters: {
    page: 0,
    limit: 5
  },
  currentCampany: null,
  total_items: null,
  total_limit: null,
  total_pages: null
};

const visitorsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case endLoadVisitors.toString():
      const { filters, items: data, ...props } = payload;
      return {
        ...state,
        items: data,
        filters: {
          ...state.filters,
          ...filters
        },
        ...props
      };
    case setCurrentCampany.toString():
      return {
        ...state,
        currentCampany: payload
      };
    case addFilterVisitors.toString():
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload
        }
      };
    case endVisitors.toString():
      return {
        ...initialState
      };
    default: {
      return state;
    }
  }
};

export default visitorsReducer;
