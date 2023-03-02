import { fork } from "redux-saga/effects";
import { watchGetCountryAsync } from "../features/country/country-saga";

export default function* rootSaga() {
  yield fork(watchGetCountryAsync);
}
