import { createAction } from 'redux-actions';

export const loadVisitors = createAction('@@Visitors/LOAD_VISITORS');
export const endLoadVisitors = createAction('@@Visitors/END_LOAD_VISITORS');
export const endVisitors = createAction('@@Visitors/END_VISITORS');
export const setCurrentCampany = createAction('@@Visitors/SET_CURRENT_CAMPANY_VISITORS');
export const addFilterVisitors = createAction('@@Visitors/ADD_FILTER_VISITORS');
