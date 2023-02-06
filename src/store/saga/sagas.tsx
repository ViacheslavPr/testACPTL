import { call, put, takeEvery } from "redux-saga/effects";

import * as ActionTypes from "../actions/mainActions";
import { mainAPI } from "../../services/mainAPI";
import { TEmployee } from "../types/defaultsTypes";
import { ISagaResponse } from "../types/mainTypes";

export function* getListEmployees() {
  try {
    const { status, data }: ISagaResponse<Array<TEmployee>> = yield call(
        mainAPI.getPhotos,
    );
    if (status === 200) {
      yield put(ActionTypes.successGetList(data))
    }
  } catch (e) {
    console.error(e)
  }
}


export function* sagaWatcher() {
  yield takeEvery([
    ActionTypes.getList.type,
    ActionTypes.getListUpdated.type
  ], getListEmployees)
}