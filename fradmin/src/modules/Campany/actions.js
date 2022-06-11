import { createAction } from 'redux-actions';

export const loadCampany = createAction('@@Campany/LOAD_CAMPANY');
export const endLoadCampany = createAction('@@Campany/END_LOAD_CAMPANY');
export const endCampany = createAction('@@Campany/END_CAMPANY');
export const startCreateCampany = createAction('@@Campany/START_CREATE_CAMPANY');
export const endCreateCampany = createAction('@@Campany/END_CREATE_CAMPANY');
export const startEditCampany = createAction('@@Campany/START_EDIT_CAMPANY');
export const endEditCampany = createAction('@@Campany/END_EDIT_CAMPANY');
export const startDeleteCampany = createAction('@@Campany/START_DELETE_CAMPANY');
export const endDeleteCampany = createAction('@@Campany/END_DELETE_CAMPANY');
export const addFilterCampany = createAction('@@Campany/ADD_FILTER_CAMPANY');
