import { AxiosError } from "axios";
import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { requestCountry } from "./country-request";
import { getCountry, setCountry, setError, setState } from "./country-slice";
import { IGetCountryAction } from "./country-type";

export function* getCountryAsync(action: IGetCountryAction) {
  try {
    yield put(setState("LOADING"));
    const response: SagaReturnType<typeof requestCountry> = yield call(
      requestCountry,
      action.payload.country
    );
    const { data } = response;
    yield put(setCountry(data.data));
  } catch (e) {
    yield put(setState("ERROR"));
    if (e instanceof AxiosError) yield put(setError(e.message));
  }
}

export function* watchGetCountryAsync() {
  yield takeLatest(getCountry.type, getCountryAsync);
}
