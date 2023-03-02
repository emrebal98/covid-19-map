import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICountry, IGetCountryAction, ILoadingState } from "./country-type";

export interface CounterState {
  data?: ICountry;
  state: ILoadingState;
  error?: string;
}

const initialState: CounterState = {
  data: undefined,
  state: "LOADING",
  error: undefined,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    getCountry: (state, action: IGetCountryAction) => {},
    setCountry: (state, action: PayloadAction<CounterState["data"]>) => {
      state.data = action.payload;
      state.state = "READY";
    },
    setState: (state, action: PayloadAction<CounterState["state"]>) => {
      state.state = action.payload;
    },
    setError: (state, action: PayloadAction<CounterState["error"]>) => {
      state.error = action.payload;
    },
  },
});

export const { getCountry, setCountry, setError, setState } = countrySlice.actions;

export default countrySlice.reducer;
