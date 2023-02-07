import {AnyAction} from "redux";
import moment from 'moment';

import {ESortBy, ESortDirection, TEmployee} from "../types/defaultsTypes";
import * as Actions from "../actions/mainActions";
import {IFilter, ISortFilter} from "../types/mainTypes";

const initialState: InitialStateType = {
  loadingList: false,
  list: [],
  updatedList: [],
  selectedEmployee: null,
  sortBy: ESortBy.NAME,
  filter: undefined,
  sortDirection: ESortDirection.ASC,
}

type InitialStateType = {
  loadingList: boolean,
  list: Array<TEmployee>,
  updatedList: Array<TEmployee>,
  selectedEmployee: TEmployee | null,
  sortBy: ESortBy,
  filter?: IFilter,
  sortDirection: ESortDirection,
}

export const mainReducer = (state: InitialStateType = initialState, action: AnyAction) => {
  const updateEmployeeList = (list: Array<TEmployee>, sortDirection: ESortDirection, sortBy: ESortBy, filter?: IFilter) =>
    list.filter(value => {
      if (filter) {
        const getYears = (val: string): number => moment().diff(val, 'years');
        if (filter.age && filter.height) {
          const years = getYears(value.birthday);
          return years === filter.age && value.height === filter.height;
        }
        if (filter.age) {
          const years = getYears(value.birthday);
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
    case Actions.selectEmployee.type:
      return {...state, selectedEmployee: action.payload };
    case Actions.clearSelectEmployee.type:
      return {...state, selectedEmployee: null };
    case Actions.deleteEmployee.type: {
      const newUpdateList = state.updatedList.filter(val => val.employeeId !== action.payload);
      return {...state, updatedList: newUpdateList};
    }
    case Actions.createEmployee.type: {
      const newEmployee = action.payload as TEmployee;
      const newEmployeeList = updateEmployeeList(
        [...state.updatedList, { ...newEmployee, employeeId: 999999 }],
        state.sortDirection,
        state.sortBy,
        state.filter
      );
      return {...state, updatedList: newEmployeeList};
    }
    case Actions.changeEmployee.type: {
      const updatedEmployee = action.payload as TEmployee;
      const newUpdateList = state.updatedList.map(val => {
        if (val.employeeId === updatedEmployee.employeeId) {
          return updatedEmployee;
        }
        return val;
      });
      return {...state, updatedList: newUpdateList};
    }
    case Actions.updateSortFilter.type: {
      const {sort, filter} = action.payload as ISortFilter;
      const newSort = sort ? sort as ESortBy : state.sortBy;
      const newFilter = filter ? {...state.filter, ...filter} : state.filter;
      const newSortDirection = sort && sort === state.sortBy && state.sortDirection === ESortDirection.ASC ? ESortDirection.DESC : ESortDirection.ASC;
      const newList = updateEmployeeList(state.list, newSortDirection, newSort, newFilter);
      return {...state, sortBy: newSort, filter: newFilter, sortDirection: newSortDirection, updatedList: newList};
    }
    case Actions.successGetList.type: {
      const newEmployeeList = updateEmployeeList(action.payload as Array<TEmployee>, state.sortDirection, state.sortBy, state.filter);
      return {
        ...state,
        list: action.payload as Array<TEmployee>,
        updatedList: newEmployeeList,
        loadingList: false,
      };
    }

    default: return  state
  }
}