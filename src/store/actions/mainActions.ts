import { createAction } from '@reduxjs/toolkit';

import { TEmployee } from "../types/defaultsTypes";
import { ISortFilter } from "../types/mainTypes";

export const getList = createAction("API/GET_LIST");
export const getListUpdated = createAction("API/GET_LIST_UPDATED");
export const successGetList = createAction<Array<TEmployee>>("API/SUCCESS_GET_LIST");
export const updateSortFilter = createAction<ISortFilter>("UPDATE_SORT_FILTER");
export const createEmployee = createAction<TEmployee>("API/CREATE_EMPLOYEE");
export const changeEmployee = createAction<TEmployee>("API/CHANGE_EMPLOYEE");
export const selectEmployee = createAction<TEmployee>("SELECT_EMPLOYEE");
export const clearSelectEmployee = createAction("CLEAR_SELECT_EMPLOYEE");
export const deleteEmployee = createAction<number>("DELETE_EMPLOYEE");

