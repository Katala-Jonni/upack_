import { createAction } from 'redux-actions';

export const loadProduct = createAction('@@Product/LOAD_CATEGORY');
export const endLoadProduct = createAction('@@Product/END_LOAD_CATEGORY');
export const endProduct = createAction('@@Product/END_CATEGORY');
export const startCreateProduct = createAction('@@Product/START_CREATE_CATEGORY');
export const endCreateProduct = createAction('@@Product/END_CREATE_CATEGORY');
export const startEditProduct = createAction('@@Product/START_EDIT_CATEGORY');
export const endEditProduct = createAction('@@Product/END_EDIT_CATEGORY');
export const startCurrentProduct = createAction('@@Product/START_CURRENT_CATEGORY');
export const endCurrentProduct = createAction('@@Product/END_CURRENT_CATEGORY');
export const startDeleteProduct = createAction('@@Product/START_DELETE_CATEGORY');
export const endDeleteProduct = createAction('@@Product/END_DELETE_CATEGORY');
export const addFilterProduct = createAction('@@Product/ADD_FILTER_CATEGORY');
