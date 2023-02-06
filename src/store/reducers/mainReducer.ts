import {AnyAction} from "redux";
import moment from 'moment';

import {ESortBy, ESortDirection, TEmployee} from "../types/defaultsTypes";
import * as Actions from "../actions/mainActions";
import {IFilter, ISortFilter} from "../types/mainTypes";

const initialState: InitialStateType = {
  loadingList: false,
  list: [],
  updatedList: [],
  sortBy: ESortBy.NAME,
  filter: undefined,
  sortDirection: ESortDirection.ASC,
}

type InitialStateType = {
  loadingList: boolean,
  list: Array<TEmployee>,
  updatedList: Array<TEmployee>,
  sortBy: ESortBy,
  filter?: IFilter,
  sortDirection: ESortDirection,
}

export const mainReducer = (state: InitialStateType = initialState, action: AnyAction) => {
  const updateEmployeeList = (list: Array<TEmployee>, sortDirection: ESortDirection, sortBy: ESortBy, filter?: IFilter) =>
    list.filter(value => {
      if (filter) {
        if (filter.age) {
          const years =  moment().diff(value.birthday, 'years');
          return years === filter.age
        }
        if (filter.height) {
          return value.height === filter.height
        }
      }
      return true
    }).sort(function(a,b) {
      if (sortBy === ESortBy.BIRTHDAY) {

      }
      switch (sortBy) {
        case ESortBy.BIRTHDAY: {
          return sortDirection === ESortDirection.ASC ?
            moment().diff(a.birthday, 'years') - moment().diff(b.birthday, 'years') :
            moment().diff(b.birthday, 'years') - moment().diff(a.birthday, 'years')
        }
        case ESortBy.HEIGHT:
          return sortDirection === ESortDirection.ASC ? a.height - b.height : b.height - a.height;
        default:
          return sortDirection === ESortDirection.ASC ?
            `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`) :
            `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)
      }
    }
  )

  switch (action.type) {
    case Actions.getList.type:
      return {...state, loadingList: true};
    case Actions.updateSortFilter.type:
      const { sort, filter } = action.payload as ISortFilter;
      const newSort = sort ? sort as ESortBy : state.sortBy;
      const newFilter = filter ? filter : state.filter;
      const newSortDirection = sort && sort === state.sortBy && state.sortDirection === ESortDirection.ASC ? ESortDirection.DESC : ESortDirection.ASC;
      const newList = updateEmployeeList(state.list, newSortDirection, newSort, newFilter);
      return {...state, sortBy: newSort, filter: newFilter, sortDirection: newSortDirection, updatedList: newList };
    case Actions.successGetList.type:
      const newEmployeeList = updateEmployeeList(action.payload as Array<TEmployee>, state.sortDirection, state.sortBy, state.filter);
      return {
        ...state,
        list: action.payload as Array<TEmployee>,
        updatedList: newEmployeeList,
        loadingList: false,
      };

    default: return  state
  }
}