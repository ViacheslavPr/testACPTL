import { createAction } from '@reduxjs/toolkit';

import { TEmployee } from "../types/defaultsTypes";
import { ISortFilter } from "../types/mainTypes";

export const getList = createAction("API/GET_LIST");
export const getListUpdated = createAction("API/GET_LIST_UPDATED");
export const successGetList = createAction<Array<TEmployee>>("API/SUCCESS_GET_LIST");
export const updateSortFilter = createAction<ISortFilter>("UPDATE_SORT_FILTER");

