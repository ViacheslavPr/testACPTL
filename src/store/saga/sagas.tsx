import { call, put, takeEvery } from "redux-saga/effects";

import * as ActionTypes from "../actions/mainActions";
import { mainAPI } from "../../services/mainAPI";
import { TEmployee } from "../types/defaultsTypes";
import { ActionTypePayload, ISagaResponse } from "../types/mainTypes";

export function* getListEmployees() {
  try {
    const { status, data }: ISagaResponse<Array<TEmployee>> = yield call(
        mainAPI.getEmployees,
    );
    if (status === 200) {
      yield put(ActionTypes.successGetList(data))
    }
  } catch (e) {
    console.error(e)
  }
}

export function* deleteEmployee({ payload }: ActionTypePayload<number>) {
  try {
    const { status } = yield call(
      mainAPI.deleteEmployee,
      payload
    );
    if (status === 200) {
      yield put(ActionTypes.getListUpdated())
    }
  } catch (e) {
    console.error(e)
  }
}

export function* changeEmployee({ payload }: ActionTypePayload<TEmployee>) {
  try {
    const { status } = yield call(
      mainAPI.changeEmployee,
      payload
    );
    if (status === 200) {
      yield put(ActionTypes.getListUpdated())
    }
  } catch (e) {
    console.error(e)
  }
}

export function* createEmployee({ payload }: ActionTypePayload<TEmployee>) {
  try {
    const { status } = yield call(
      mainAPI.createEmployee,
      payload
    );
    if (status === 200) {
      yield put(ActionTypes.getListUpdated())
    }
  } catch (e) {
    console.error(e)
  }
}


export function* sagaWatcher() {
  yield takeEvery([
    ActionTypes.getList.type,
    ActionTypes.getListUpdated.type
  ], getListEmployees);
  yield takeEvery(ActionTypes.changeEmployee.type, changeEmployee);
  yield takeEvery(ActionTypes.deleteEmployee.type, deleteEmployee);
  yield takeEvery(ActionTypes.createEmployee.type, createEmployee);
}