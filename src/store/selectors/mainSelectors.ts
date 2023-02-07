import { AppStateType } from "../reducers/rootReducer";
import { ESortBy, ESortDirection, TEmployee } from "../types/defaultsTypes";

export const getLoadingSelector = (state: AppStateType) => state.main["loadingList"];
export const getUpdatedListSelector = (state: AppStateType): Array<TEmployee> => state.main["updatedList"];
export const getSortBySelector = (state: AppStateType): ESortBy => state.main["sortBy"];
export const getSortDirectionSelector = (state: AppStateType): ESortDirection => state.main["sortDirection"];
export const getSelectedEmployeeSelector = (state: AppStateType): TEmployee | null => state.main["selectedEmployee"];