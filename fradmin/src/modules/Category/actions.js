import { createAction } from 'redux-actions';

export const loadCategory = createAction('@@Category/LOAD_CATEGORY');
export const endLoadCategory = createAction('@@Category/END_LOAD_CATEGORY');
export const endCategory = createAction('@@Category/END_CATEGORY');
export const startCreateCategory = createAction('@@Category/START_CREATE_CATEGORY');
export const endCreateCategory = createAction('@@Category/END_CREATE_CATEGORY');
export const startEditCategory = createAction('@@Category/START_EDIT_CATEGORY');
export const endEditCategory = createAction('@@Category/END_EDIT_CATEGORY');
export const startDeleteCategory = createAction('@@Category/START_DELETE_CATEGORY');
export const endDeleteCategory = createAction('@@Category/END_DELETE_CATEGORY');
export const addFilterCategory = createAction('@@Category/ADD_FILTER_CATEGORY');
