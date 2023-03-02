import type { PayloadAction } from "@reduxjs/toolkit";

type ICountry = {
  recovered: number;
  deaths: number;
  confirmed: number;
  lastChecked: string;
  lastReported: string;
  location: string;
};

type ICountryResponse = {
  error: boolean;
  statusCode: number;
  message: string;
  data: ICountry;
};

type IGetCountryAction = PayloadAction<{ country: string }>;

type ILoadingState = "READY" | "LOADING" | "ERROR";

export type { ICountry, ICountryResponse, IGetCountryAction, ILoadingState };
